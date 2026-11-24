import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import config from '../config.js';
import app from '../admin/assets/app.js';
import billing from '../admin/assets/billing.js';

const { esc, darken, tk, calcDisc } = config;
const { merge, inR, pr } = app;
const { calcTotals } = billing;

describe('Coupon and Cart Discount Calculation (calcDisc)', () => {
  it('should return 0 when coupon is null or undefined', () => {
    assert.equal(calcDisc(null, 500), 0);
    assert.equal(calcDisc(undefined, 500), 0);
  });

  it('should calculate percentage discount correctly', () => {
    const coupon10 = { type: 'percent', value: 10, min_order: 0 };
    assert.equal(calcDisc(coupon10, 500), 50);

    const coupon15 = { type: 'percent', value: 15, min_order: 100 };
    assert.equal(calcDisc(coupon15, 1000), 150);
  });

  it('should round percentage discount properly', () => {
    const coupon10 = { type: 'percent', value: 10, min_order: 0 };
    // 255 * 0.10 = 25.5 -> rounds to 26
    assert.equal(calcDisc(coupon10, 255), 26);
  });

  it('should calculate flat discount correctly', () => {
    const flat50 = { type: 'flat', value: 50, min_order: 0 };
    assert.equal(calcDisc(flat50, 300), 50);
  });

  it('should cap flat discount at subtotal to prevent negative totals', () => {
    const flat100 = { type: 'flat', value: 100, min_order: 0 };
    assert.equal(calcDisc(flat100, 60), 60);
  });

  it('should enforce min_order requirement', () => {
    const couponWithMin = { type: 'percent', value: 20, min_order: 500 };
    assert.equal(calcDisc(couponWithMin, 499), 0);
    assert.equal(calcDisc(couponWithMin, 500), 100);
    assert.equal(calcDisc(couponWithMin, 1000), 200);
  });
});

describe('Billing Settlement & Tax Calculation (calcTotals)', () => {
  it('should calculate bill with zero discount, zero tax, and zero service charge', () => {
    const res = calcTotals(800, 0, 0, 0);
    assert.deepEqual(res, { d: 0, sc: 0, tax: 0, t: 800 });
  });

  it('should apply discount and compute service charge and tax on taxable base', () => {
    // subtotal = 1000, discount = 200 -> taxable base = 800
    // service charge 5% of 800 = 40
    // tax 10% of 800 = 80
    // total = 800 + 40 + 80 = 920
    const res = calcTotals(1000, 200, 5, 10);
    assert.deepEqual(res, { d: 200, sc: 40, tax: 80, t: 920 });
  });

  it('should clamp discount to subtotal if input discount is greater than subtotal', () => {
    const res = calcTotals(500, 700, 10, 5);
    // discount clamped to 500, base = 0, sc = 0, tax = 0, total = 0
    assert.deepEqual(res, { d: 500, sc: 0, tax: 0, t: 0 });
  });

  it('should clamp negative discount to 0', () => {
    const res = calcTotals(500, -50, 0, 0);
    assert.deepEqual(res, { d: 0, sc: 0, tax: 0, t: 500 });
  });

  it('should handle rounding of service charge and tax correctly', () => {
    // subtotal = 125, discount = 0, sc = 3% (3.75 -> 4), tax = 7.5% (9.375 -> 9)
    const res = calcTotals(125, 0, 3, 7.5);
    assert.equal(res.sc, 4);
    assert.equal(res.tax, 9);
    assert.equal(res.t, 125 + 4 + 9);
  });
});

describe('Order Items Merging (merge)', () => {
  it('should consolidate duplicate items with same name and price', () => {
    const items = [
      { name: 'Kacchi Biryani', price: 280, qty: 1 },
      { name: 'Kacchi Biryani', price: 280, qty: 2 },
      { name: 'Borhani', price: 60, qty: 1 }
    ];
    const merged = merge(items);
    assert.equal(merged.length, 2);

    const kacchi = merged.find(i => i.name === 'Kacchi Biryani');
    assert.ok(kacchi);
    assert.equal(kacchi.qty, 3);
    assert.equal(kacchi.price, 280);

    const borhani = merged.find(i => i.name === 'Borhani');
    assert.ok(borhani);
    assert.equal(borhani.qty, 1);
  });

  it('should keep items with same name but different prices separate', () => {
    const items = [
      { name: 'Roast Chicken', price: 120, qty: 1 },
      { name: 'Roast Chicken', price: 150, qty: 1 } // e.g. different portion or special addon
    ];
    const merged = merge(items);
    assert.equal(merged.length, 2);
  });

  it('should return empty array for empty items list', () => {
    assert.deepEqual(merge([]), []);
  });
});

describe('Report Date Range Filtering (inR)', () => {
  const start = '2026-11-24T00:00:00.000Z';
  const end = '2026-11-25T00:00:00.000Z';

  it('should include timestamps within the range', () => {
    assert.equal(inR('2026-11-24T12:00:00.000Z', start, end), true);
    assert.equal(inR(start, start, end), true); // inclusive of start
  });

  it('should exclude timestamps outside the range', () => {
    assert.equal(inR('2026-11-23T23:59:59.999Z', start, end), false);
    assert.equal(inR(end, start, end), false); // exclusive of end
    assert.equal(inR('2026-11-25T00:00:01.000Z', start, end), false);
  });

  it('should correctly compare PostgREST format timezone strings (Fix #5)', () => {
    // PostgREST returns timestamps with timezone offset like +06:00 or +00:00
    // In old code, string comparison "2026-11-24T06:00:00+06:00" < "2026-11-24T00:00:00.000Z" was true because '+' < '.' in ASCII.
    // Fixed inR converts to timestamps:
    const postgrestTimestamp = '2026-11-24T12:00:00+06:00'; // 06:00:00 UTC
    assert.equal(inR(postgrestTimestamp, start, end), true);

    const postgrestMidnight = '2026-11-24T06:00:00+06:00'; // 00:00:00 UTC
    assert.equal(inR(postgrestMidnight, start, end), true);
  });
});

describe('Shared Utilities (esc & tk)', () => {
  it('should escape HTML characters properly', () => {
    assert.equal(esc('<b>"Hello" & \'World\'</b>'), '&lt;b&gt;&quot;Hello&quot; &amp; &#39;World&#39;&lt;/b&gt;');
    assert.equal(esc(null), '');
    assert.equal(esc(undefined), '');
    assert.equal(esc('123'), '123');
  });

  it('should format amounts using currency and Indian numbering format', () => {
    const formatted = tk(1250);
    assert.match(formatted, /1,250/);

    const lakh = tk(100000);
    assert.match(lakh, /1,00,000/);
  });
});
