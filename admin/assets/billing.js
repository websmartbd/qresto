// Order actions (serve, cancel) and billing: bill, payment, invoice print. Used by Dashboard, Orders, Reports
const NEXT={new:['preparing','Start preparing'],preparing:['served','Mark served'],served:[null,'Served']};
async function setSt(id,s){await db.from('orders').update({status:s}).eq('id',id);REFRESH();badge()}
async function cancelO(id){
  const ok = await confirmDialog({
    title: 'Cancel Order',
    message: 'Are you sure you want to cancel this order? It will be marked as cancelled.',
    confirmText: 'Cancel Order',
    danger: true
  });
  if(ok) setSt(id,'cancelled');
}

let B={};
async function bill(k){
  const os=G[k],L=merge(os.flatMap(o=>o.order_items)),sub=L.reduce((s,i)=>s+i.price*i.qty,0);
  const usedCoupon=os.find(o=>o.coupon)?.coupon||null;
  const autoDisc=os.reduce((s,o)=>s+Number(o.discount||0),0);
  B={os,L,sub,tid:os[0].table_id,no:os[0].tables?.number||'?',coupon:usedCoupon,d:autoDisc};
  modal(`<div class="p-5 space-y-4"><h3>Settlement · Table ${esc(B.no)}</h3>
  
  <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 max-h-48 overflow-y-auto divide-y divide-slate-100">
    <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-1.5 flex justify-between">
      <span>Item & Quantity</span>
      <span>Amount</span>
    </div>
    ${L.map(i=>`<div class="flex justify-between items-center py-2 text-xs">
      <div class="min-w-0 pr-2">
        <span class="font-bold text-slate-800">${i.qty}×</span>
        <span class="text-slate-700">${esc(i.name)}</span>
        <span class="text-slate-400 text-[10px] block">@ ${tk(i.price)}</span>
      </div>
      <span class="font-semibold text-slate-900 shrink-0 tabular-nums">${tk(i.price*i.qty)}</span>
    </div>`).join('')}
  </div>

  <div class="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs shadow-2xs">
    <div class="flex justify-between items-center text-slate-600">
      <span>Subtotal</span>
      <span class="font-semibold tabular-nums text-slate-800">${tk(sub)}</span>
    </div>
    ${usedCoupon?`<div class="flex justify-between items-center text-emerald-700 font-medium bg-emerald-50/70 px-2 py-1 rounded-md">
      <span class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
        <span>Coupon (${esc(usedCoupon)})</span>
      </span>
      <span class="font-bold tabular-nums">-${tk(autoDisc)}</span>
    </div>`:''}
    <div class="flex justify-between items-center text-slate-600">
      <span>Special Discount (৳)</span>
      <input id="dis" type="number" min="0" value="${autoDisc}" oninput="calc()" class="inp !w-24 text-right !py-1 font-bold">
    </div>
    ${(R.service_charge||0)>0?`<div class="flex justify-between items-center text-slate-600">
      <span>Service Charge (${R.service_charge}%)</span>
      <span id="sc" class="font-semibold tabular-nums text-slate-800"></span>
    </div>`:''}
    <div class="flex justify-between items-center text-slate-600">
      <span>Tax (${R.tax_percent||0}%)</span>
      <span id="tx" class="font-semibold tabular-nums text-slate-800"></span>
    </div>
    <div class="border-t border-slate-100 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
      <span>Total Payable</span>
      <span id="gt" class="text-base text-brand font-extrabold tabular-nums"></span>
    </div>
    <div class="border-t border-slate-100 pt-2 flex items-center justify-between text-xs text-slate-500">
      <span>POS Receipt Format</span>
      <div class="flex items-center gap-1.5 font-bold">
        <button type="button" onclick="setPrinterWidth('80')" id="pw_80" class="px-2 py-0.5 rounded text-[11px] ${printerWidth==='80'?'bg-slate-900 text-white':'bg-slate-100 text-slate-700'}">80mm</button>
        <button type="button" onclick="setPrinterWidth('58')" id="pw_58" class="px-2 py-0.5 rounded text-[11px] ${printerWidth==='58'?'bg-slate-900 text-white':'bg-slate-100 text-slate-700'}">58mm</button>
      </div>
    </div>
  </div>

  <div class="flex gap-2.5 pt-1">
    <button onclick="closeM()" class="btn2 flex-1">Cancel</button>
    <button id="pay" onclick="pay()" class="btn flex-1 flex items-center justify-center gap-1.5">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
      <span>Paid & Print Invoice</span>
    </button>
  </div></div>`);
  calc();
}
function calcTotals(sub, discountInput, serviceChargePct, taxPct) {
  const d = Math.min(Math.max(+discountInput || 0, 0), sub);
  const sc = Math.round((sub - d) * (serviceChargePct || 0) / 100);
  const tax = Math.round((sub - d) * (taxPct || 0) / 100);
  return { d, sc, tax, t: sub - d + sc + tax };
}

function calc(){
  const res = calcTotals(B.sub, $('dis')?.value, R?.service_charge, R?.tax_percent);
  Object.assign(B, res);
  if($('sc')) $('sc').textContent=tk(res.sc);
  $('tx').textContent=tk(res.tax);
  $('gt').textContent=tk(B.t);
}
async function pay(){
  $('pay').disabled=true;
  const {data,error}=await db.from('invoices').insert({table_id:B.tid,table_no:B.no,subtotal:B.sub,discount:B.d,service_charge:B.sc||0,tax:B.tax,total:B.t,coupon:B.coupon}).select().single();
  if(error){$('pay').disabled=false;return alert('Could not save: '+error.message)}
  const {error:ordErr}=await db.from('orders').update({status:'paid',invoice_id:data.id}).in('id',B.os.map(o=>o.id));
  if(ordErr){
    $('pay').disabled=false;
    return alert('Invoice created (# ' + data.id + ') but failed to update orders: ' + ordErr.message + '. Please do not re-bill.');
  }
  closeM();printInv({...data,lines:B.L});REFRESH();badge();
}
let printerWidth = typeof localStorage !== 'undefined' ? localStorage.getItem('qrmenu_printer_width') || '80' : '80';
function setPrinterWidth(w){
  printerWidth = w;
  if(typeof localStorage !== 'undefined') localStorage.setItem('qrmenu_printer_width', w);
  const b80 = $('pw_80'), b58 = $('pw_58');
  if(b80 && b58){
    b80.className = `px-2 py-0.5 rounded text-[11px] ${w==='80'?'bg-slate-900 text-white':'bg-slate-100 text-slate-700'}`;
    b58.className = `px-2 py-0.5 rounded text-[11px] ${w==='58'?'bg-slate-900 text-white':'bg-slate-100 text-slate-700'}`;
  }
}

function printInv(v){
  const is58 = typeof localStorage !== 'undefined' ? (localStorage.getItem('qrmenu_printer_width') || '80') === '58' : false;
  $('inv').innerHTML=`<div class="rc ${is58 ? 'rc-58' : ''}">
    <div style="text-align:center">
      <b style="font-size:${is58 ? '14px' : '16px'};display:block;line-height:1.2;">${esc(R.name)}</b>
      <div style="font-size:${is58 ? '10px' : '11px'};margin-top:2px;color:#333;">${esc(R.address||'')}${R.phone?`<br>Tel: ${esc(R.phone)}`:''}</div>
    </div>
    <hr>
    <div style="display:flex;justify-content:space-between;font-size:${is58 ? '10px' : '11px'};">
      <span>Invoice #${v.id}</span>
      <span>Table: <b>${esc(v.table_no||'')}</b></span>
    </div>
    <div style="font-size:${is58 ? '10px' : '11px'};color:#444;">${dt(v.created_at)}</div>
    <hr>
    <table style="width:100%;border-collapse:collapse;font-size:${is58 ? '11px' : '12px'};">
      ${v.lines.map(i=>`<tr>
        <td style="width:26px;font-weight:bold;vertical-align:top;">${i.qty}×</td>
        <td style="padding-right:4px;vertical-align:top;">${esc(i.name)}</td>
        <td style="text-align:right;white-space:nowrap;vertical-align:top;">${tk(i.price*i.qty)}</td>
      </tr>`).join('')}
    </table>
    <hr>
    <table style="width:100%;border-collapse:collapse;font-size:${is58 ? '11px' : '12px'};">
      <tr><td>Subtotal</td><td style="text-align:right">${tk(v.subtotal)}</td></tr>
      ${+v.discount?`<tr><td>Discount${v.coupon?' ('+esc(v.coupon)+')':''}</td><td style="text-align:right">-${tk(v.discount)}</td></tr>`:''}
      ${+v.service_charge?`<tr><td>Service Charge (${R.service_charge||0}%)</td><td style="text-align:right">${tk(v.service_charge)}</td></tr>`:''}
      ${+v.tax?`<tr><td>Tax (${R.tax_percent||0}%)</td><td style="text-align:right">${tk(v.tax)}</td></tr>`:''}
      <tr style="font-size:${is58 ? '13px' : '14px'};"><td><b>TOTAL</b></td><td style="text-align:right"><b>${tk(v.total)}</b></td></tr>
    </table>
    <hr>
    <div style="text-align:center;font-size:${is58 ? '10px' : '11px'};">${esc(R.invoice_footer||'Thank you. Please visit again.')}</div>
  </div>`;
  setTimeout(()=>print(),150);
}
async function reprint(id){
  const [a,b]=await Promise.all([db.from('invoices').select().eq('id',id).single(),db.from('orders').select('order_items(*)').eq('invoice_id',id)]);
  if(!a?.data) return alert('Invoice not found.');
  printInv({...a.data,lines:merge((b?.data||[]).flatMap(o=>o.order_items||[]))});
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcTotals };
}
