// ============================================================
//  DEMO = true  -> sample data from demo-data.js (saved in this browser). No Supabase needed.
//  DEMO = false -> real Supabase. Fill the two values below and run schema.sql first.
// ============================================================
const DEMO = true;
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR-ANON-PUBLIC-KEY";

const db = DEMO ? demoDB() : supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ---- Demo database: same calls as Supabase, data kept in localStorage ---- */
function demoDB() {
  const K = 'qrmenu_demo_v2', A = 'qrmenu_demo_auth', subs = [];
  let bc = null;
  try {
    bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(K) : null;
    if (bc && typeof bc.unref === 'function') bc.unref();
  } catch (e) {}
  const REL = {
    orders: { tables: { one: 'table_id', t: 'tables' }, order_items: { many: 'order_id', t: 'order_items' } },
    order_items: { orders: { one: 'order_id', t: 'orders' } }
  };
  const save = d => localStorage.setItem(K, JSON.stringify(d));
  const clone = x => x == null ? null : JSON.parse(JSON.stringify(x));
  const TABLES = ['restaurant', 'tables', 'menu_items', 'invoices', 'orders', 'order_items', 'coupons', 'waiter_calls'];
  const seed = () => {
    if (typeof DEMO_DATA === 'undefined') throw new Error('demo-data.js not found. Keep it in the same folder as admin.html and menu.html.');
    const d = clone(DEMO_DATA), now = new Date();
    d.waiter_calls = d.waiter_calls || [];
    ['orders', 'invoices'].forEach(t => d[t].forEach(r => {
      const x = new Date(now); x.setDate(x.getDate() - r._ago); x.setHours(r._h, Math.floor(Math.random() * 60), 0, 0);
      r.created_at = x.toISOString(); delete r._ago; delete r._h;
    }));
    save(d); return d;
  };
  // Use saved data if it is complete, otherwise start again from demo-data.js
  const load = () => {
    try {
      const d = JSON.parse(localStorage.getItem(K));
      if (d) {
        if (!Array.isArray(d.waiter_calls)) { d.waiter_calls = []; save(d); }
        if (TABLES.every(k => Array.isArray(d[k]))) {
        if (typeof DEMO_DATA !== 'undefined' && DEMO_DATA.menu_items) {
          let updated = false;
          d.menu_items.forEach(item => {
            const seed = DEMO_DATA.menu_items.find(x => x.id === item.id);
            if (seed) {
              if (seed.image_url && !item.image_url) { item.image_url = seed.image_url; updated = true; }
              if (seed.variants) {
                if (!item.variants || JSON.stringify(item.variants).includes('/')) {
                  item.variants = seed.variants; updated = true;
                }
              }
              if (seed.addons) {
                if (!item.addons || JSON.stringify(item.addons).includes('/')) {
                  item.addons = seed.addons; updated = true;
                }
              }
            }
          });
          if (updated) save(d);
        }
        return d;
        }
      }
    } catch (e) {}
    return seed();
  };
  const maxId = (rows, k = 'id') => rows.reduce((m, r) => Math.max(m, +r[k] || 0), 0) + 1;
  const get = (r, p) => p.split('.').reduce((o, k) => o?.[k], r);
  const mk = (D, t, v) => {
    const r = { ...v };
    if (t === 'orders') { r.id ??= crypto.randomUUID(); r.no = maxId(D.orders, 'no'); r.status ??= 'new'; r.invoice_id ??= null; r.note ??= null; }
    else if (t === 'waiter_calls') { r.id ??= crypto.randomUUID(); r.status ??= 'pending'; r.created_at ??= new Date().toISOString(); }
    else r.id = maxId(D[t]);
    if (t === 'menu_items') { r.available ??= true; r.category ??= 'Others'; }
    if (t === 'coupons') { r.active ??= true; r.min_order ??= 0; }
    if (t === 'invoices') { r.discount ??= 0; r.tax ??= 0; r.service_charge ??= 0; }
    if (t === 'orders' || t === 'invoices' || t === 'waiter_calls') r.created_at ??= new Date().toISOString();
    return r;
  };

  class Q {
    constructor(t) { this.t = t; this.op = 'select'; this.sel = '*'; this.F = []; this.O = []; }
    select(c = '*') { this.sel = c; if (this.op !== 'select') this.ret = true; return this; }
    insert(v) { this.op = 'insert'; this.v = v; return this; }
    upsert(v, o = {}) { this.op = 'upsert'; this.v = v; this.o = o; return this; }
    update(v) { this.op = 'update'; this.v = v; return this; }
    delete() { this.op = 'delete'; return this; }
    eq(c, v) { this.F.push(r => get(r, c) == v); return this; }
    neq(c, v) { this.F.push(r => get(r, c) != v); return this; }
    in(c, a) { this.F.push(r => a.includes(get(r, c))); return this; }
    gte(c, v) { this.F.push(r => get(r, c) >= v); return this; }
    order(c, o = {}) { this.O.push([c, o.ascending === false ? -1 : 1]); return this; }
    limit(n) { this.lim = n; return this; }
    single() { this.one = true; return this; }
    then(a, b) { return this.run().then(a, b); }

    async run() {
      const D = load(), t = this.t, ok = r => this.F.every(f => f(r));
      let out = null, err = null, ev = null;
      if (this.op === 'insert' || this.op === 'upsert') {
        const res = [];
        for (const v of [].concat(this.v)) {
          if (t === 'tables' && D.tables.some(x => x.number === v.number)) {
            if (this.op === 'upsert' && this.o.ignoreDuplicates) continue;
            err = { message: 'duplicate' }; break;
          }
          const r = mk(D, t, v); D[t].push(r); res.push(r);
        }
        if (!err) { save(D); ev = 'INSERT'; }
        out = this.ret ? res : null;
      } else if (this.op === 'update') {
        const res = D[t].filter(ok); res.forEach(r => Object.assign(r, this.v));
        save(D); ev = 'UPDATE'; out = this.ret ? res : null;
      } else if (this.op === 'delete') {
        const gone = D[t].filter(ok); D[t] = D[t].filter(r => !ok(r));
        if (t === 'tables') D.orders.forEach(o => { if (gone.some(g => g.id == o.table_id)) o.table_id = null; });
        if (t === 'orders') D.order_items = D.order_items.filter(i => !gone.some(g => g.id === i.order_id));
        save(D); ev = 'DELETE';
      } else {
        let rows = clone(D[t]);
        for (const [name, rel] of Object.entries(REL[t] || {})) {
          if (!new RegExp('\\b' + name + '\\b(!inner)?\\(').test(this.sel)) continue;
          rows.forEach(r => { r[name] = rel.one ? clone(D[rel.t].find(x => x.id == r[rel.one])) : clone(D[rel.t].filter(x => x[rel.many] === r.id)); });
        }
        rows = rows.filter(ok);
        rows.sort((a, b) => { for (const [c, d] of this.O) { const x = get(a, c), y = get(b, c); if (x !== y) return (x > y ? 1 : -1) * d; } return 0; });
        if (this.lim) rows = rows.slice(0, this.lim);
        out = rows;
      }
      if (err) return { data: null, error: err };
      if (ev && bc) { try { bc.postMessage({ t, ev }); } catch (e) {} }
      if (out && this.one) { out = clone(out[0]); if (!out) return { data: null, error: { message: 'Not found' } }; }
      return { data: out, error: null };
    }
  }

  if (bc) {
    bc.onmessage = e => subs.filter(s => s[0] === e.data.t).forEach(s => s[1]({ eventType: e.data.ev }));
  }
  return {
    from: t => new Q(t),
    channel: () => { const ch = { on(_, o, cb) { subs.push([o.table, cb]); return ch; }, subscribe() { return ch; } }; return ch; },
    auth: {
      getSession: async () => ({ data: { session: localStorage.getItem(A) ? {} : null } }),
      signInWithPassword: async ({ email, password }) =>
        email === 'admin@demo.com' && password === 'admin123' ? (localStorage.setItem(A, '1'), { error: null }) : { error: { message: 'bad' } },
      signOut: async () => { localStorage.removeItem(A); }
    },
    reset: () => { localStorage.removeItem(K); location.reload(); }
  };
}

// ============================================================
// Shared Utilities (Used across index.html, menu.html, admin pages)
// ============================================================
(function () {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const darken = (hex, pct) => {
    try {
      let c = String(hex || '').replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      const num = parseInt(c, 16);
      let r = Math.max(0, (num >> 16) - Math.round(255 * (pct / 100)));
      let g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * (pct / 100)));
      let b = Math.max(0, (num & 0x0000FF) - Math.round(255 * (pct / 100)));
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    } catch (e) { return hex; }
  };

  const tk = n => {
    const cur = (typeof window !== 'undefined' && window.R?.currency) || '৳';
    return cur + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const calcDisc = (c, sub) => {
    if (!c || sub < (c.min_order || 0)) return 0;
    return c.type === 'percent' ? Math.round(sub * c.value / 100) : Math.min(c.value, sub);
  };

  if (typeof window !== 'undefined') {
    window.esc = esc;
    window.darken = darken;
    window.tk = tk;
    window.calcDisc = calcDisc;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { esc, darken, tk, calcDisc };
  }
})();

