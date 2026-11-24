// Shared by every admin page: helpers, sidebar, login check, modal, toast
const $=id=>document.getElementById(id),
  tk=(typeof window!=='undefined'&&window.tk)||(n=>((typeof window!=='undefined'&&window.R?.currency)||'৳')+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2})),
  sh=n=>n>=1000?+(n/1000).toFixed(1)+'k':n,
  esc=(typeof window!=='undefined'&&window.esc)||(s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))),
  tm=d=>new Date(d).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),
  dt=d=>new Date(d).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}),
  merge=a=>Object.values(a.reduce((m,i)=>{const k=i.name+'|'+i.price;(m[k]=m[k]||{name:i.name,price:i.price,qty:0}).qty+=i.qty;return m},{})),
  pr=i=>i.offer_price!=null&&+i.offer_price<+i.price?+i.offer_price:+i.price,
  sw=(on,fn)=>`<button onclick="${fn}" class="shrink-0 w-9 h-5 rounded-full relative transition duration-140 ${on?'bg-brand':'bg-stone-300'}"><span class="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-140 ${on?'left-[18px]':'left-0.5'}"></span></button>`,
  st=(l,v,s)=>`<div class="box p-4 min-w-0 flex flex-col justify-between"><p class="text-xs font-medium text-stone-500 truncate">${l}</p><p class="text-2xl font-bold font-mono tabular-nums mt-1 leading-tight text-ink tracking-tight truncate">${v}</p><p class="text-xs mt-1.5 min-h-[16px] leading-snug text-stone-500">${s||''}</p></div>`,
  SUB={},
  head=(t,r='',sub,d)=>`<div class="${r&&!d?'flex':'hidden lg:flex'} flex-wrap items-center justify-between gap-3 mb-5"><div><h1 class="hidden lg:block text-xl font-bold text-ink tracking-tight">${t}</h1>${(sub??SUB[t])?`<p class="text-xs text-stone-500 mt-0.5">${sub??SUB[t]}</p>`:''}</div>${r?`<div class="flex gap-2 items-center w-full lg:w-auto justify-end">${r}</div>`:''}</div>`,
  empty=(a,b)=>`<div class="text-center text-stone-500 py-16 px-4"><p class="font-bold text-stone-800 text-sm">${a}</p><p class="text-xs text-stone-500 mt-1">${b}</p></div>`;

const IC={
  dash:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  orders:'<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6"/>',
  menu:'<path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11M17 21V3c-2 1-3 4-3 7h3"/>',
  tables:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v7h-4"/>',
  coupons:'<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".75" fill="currentColor"/>',
  report:'<path d="M3 3v18h18"/><path d="M8 16v-5M13 16V7M18 16v-8"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  soundOn:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  soundOff:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>',
  bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'
};

const sd=d=>{const x=new Date(d);x.setHours(0,0,0,0);return x},ad=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x},
  iso=d=>d.toISOString(),inR=(x,a,b)=>{const t=new Date(x).getTime();return t>=new Date(a).getTime()&&t<new Date(b).getTime()},
  ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'),
  pd=s=>{const [a,b,c]=s.split('-');return new Date(+a,b-1,+c)},
  fd=d=>d.toLocaleDateString('en-US',{month:'short',day:'numeric'}),
  fh=h=>(h%12||12)+(h<12?'a':'p'),
  dl=(c,p,w='previous')=>!p&&!c?'':!p?'<span class="text-emerald-700 font-medium">▲ new</span>':`<span class="${c>=p?'text-emerald-700':'text-red-600'} font-medium">${c>=p?'▲':'▼'} ${Math.abs(Math.round((c-p)/p*100))}%</span> <span class="text-stone-400">vs ${w}</span>`,
  ct=(t,s,r)=>`<div class="flex items-baseline gap-2 mb-3"><b class="text-ink font-semibold">${t}</b>${s?`<span class="text-xs text-stone-400">${s}</span>`:''}${r?`<span class="ml-auto">${r}</span>`:''}</div>`,
  BADGE={
    new:'bg-amber-50 text-amber-800 border border-amber-200/80',
    preparing:'bg-sky-50 text-sky-800 border border-sky-200/80',
    served:'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    paid:'bg-stone-100 text-stone-700 border border-stone-200/80',
    cancelled:'bg-red-50 text-red-700 border border-red-200/80'
  },
  LBL={new:'New',preparing:'Preparing',served:'Served',paid:'Paid',cancelled:'Cancelled'},
  DOT={new:'bg-amber-500',preparing:'bg-sky-500',served:'bg-emerald-500',paid:'bg-stone-500',cancelled:'bg-red-500'},
  BAR={new:'border-l-amber-500',preparing:'border-l-sky-500',served:'border-l-emerald-600',paid:'border-l-stone-500',cancelled:'border-l-red-500'},
  pill=s=>`<span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md ${BADGE[s]||'bg-stone-100 text-stone-700 border border-stone-200'}"><span class="w-1.5 h-1.5 rounded-full ${DOT[s]||'bg-stone-400'} shrink-0"></span><span>${LBL[s]||s}</span></span>`;

let soundEnabled = typeof localStorage !== 'undefined' ? localStorage.getItem('qrmenu_admin_sound') !== '0' : true;

// Gentle sine notification chime (calmed gain from 0.25 to 0.07)
function beep(type = 'order'){
  if(!soundEnabled) return;
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if(ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const notes = type === 'call' ? [880, 1174.66] : [987.77, 1318.51, 1567.98];
    notes.forEach((freq, idx)=>{
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.001, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.07, now + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.3);
    });
  }catch(e){}
}

function toggleSound(){
  soundEnabled = !soundEnabled;
  localStorage.setItem('qrmenu_admin_sound', soundEnabled ? '1' : '0');
  toast(soundEnabled ? 'Notification sound enabled' : 'Notification sound muted');
  if(window.renderSoundBtn) window.renderSoundBtn();
}

function toast(m, type = 'info'){
  let t=$('toast');
  if(!t) return;
  t.innerHTML = `<span class="inline-flex items-center gap-2"><svg class="w-4 h-4 ${type==='error'?'text-red-500':'text-stone-400'}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">${type==='error'?'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>':'<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'}</svg><span class="leading-snug">${esc(m)}</span></span>`;
  t.className = `fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] px-4 py-2.5 rounded-xl shadow-md border border-stone-200/90 bg-white text-ink text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-150`;
  t.classList.remove('hidden');
  if(t._timer) clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.add('hidden'), 2200);
}

function confirmDialog({
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  itemHtml = '',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = true
} = {}){
  return new Promise(resolve => {
    let el = $('confirm_modal');
    if(!el){
      el = document.createElement('div');
      el.id = 'confirm_modal';
      document.body.appendChild(el);
    }
    el.className = 'fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-[70] flex items-center justify-center p-4 transition-opacity duration-150 opacity-0 pointer-events-none';
    el.innerHTML = `<div id="cfm_card" class="bg-white rounded-2xl shadow-xl border border-stone-200 max-w-sm w-full p-5 sm:p-6 text-center transform transition-all duration-150 scale-98 opacity-0 will-change-transform">
      <div class="w-10 h-10 rounded-xl ${danger ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'} flex items-center justify-center mx-auto mb-3 shadow-2xs">
        ${danger
          ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>'
          : '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'
        }
      </div>
      <h3 class="text-base font-semibold text-ink mb-1 leading-snug">${title}</h3>
      <p class="text-xs sm:text-sm text-stone-500 mb-2 leading-relaxed">${message}</p>
      ${itemHtml ? `<div class="my-3 text-left">${itemHtml}</div>` : ''}
      <div class="flex gap-2.5 mt-4">
        <button id="cfm_no" class="flex-1 py-2 px-3 rounded-lg border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-50 transition active:scale-98 cursor-pointer">${esc(cancelText)}</button>
        <button id="cfm_yes" class="flex-1 py-2 px-3 rounded-lg ${danger ? 'bg-red-600 hover:bg-red-700 text-white' : 'btn'} text-xs sm:text-sm font-medium transition active:scale-98 cursor-pointer">${esc(confirmText)}</button>
      </div>
    </div>`;

    el.classList.remove('pointer-events-none');
    requestAnimationFrame(()=>{
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
      const c = $('cfm_card');
      if(c){
        c.classList.remove('scale-98','opacity-0');
        c.classList.add('scale-100','opacity-100');
      }
    });

    const close = val => {
      el.classList.remove('opacity-100');
      el.classList.add('opacity-0','pointer-events-none');
      const c = $('cfm_card');
      if(c){
        c.classList.remove('scale-100','opacity-100');
        c.classList.add('scale-98','opacity-0');
      }
      document.removeEventListener('keydown', onKey);
      setTimeout(()=>{ el.remove(); resolve(val); }, 150);
    };
    const onKey = e => { if(e.key === 'Escape') close(false); };
    el.onclick = e => { if(e.target === el) close(false); };
    $('cfm_no').onclick = () => close(false);
    $('cfm_yes').onclick = () => close(true);
    document.addEventListener('keydown', onKey);
  });
}

function alertDialog({ title = 'Notice', message = '', type = 'info' } = {}){
  return new Promise(resolve => {
    let el = $('alert_modal');
    if(!el){
      el = document.createElement('div');
      el.id = 'alert_modal';
      document.body.appendChild(el);
    }
    el.className = 'fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-[75] flex items-center justify-center p-4 transition-opacity duration-150 opacity-0 pointer-events-none';
    el.innerHTML = `<div id="alert_card" class="bg-white rounded-2xl shadow-xl border border-stone-200 max-w-sm w-full p-5 sm:p-6 text-center transform transition-all duration-150 scale-98 opacity-0 will-change-transform">
      <div class="w-10 h-10 rounded-xl ${type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-stone-100 text-stone-700'} flex items-center justify-center mx-auto mb-3 shadow-2xs">
        ${type === 'error'
          ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
          : '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
        }
      </div>
      <h3 class="text-base font-semibold text-ink mb-1 leading-snug">${esc(title)}</h3>
      <p class="text-xs sm:text-sm text-stone-500 mb-5 leading-relaxed">${esc(message)}</p>
      <button id="alert_btn" class="w-full py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium transition active:scale-98 cursor-pointer">OK</button>
    </div>`;

    el.classList.remove('pointer-events-none');
    requestAnimationFrame(()=>{
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
      const c = $('alert_card');
      if(c){
        c.classList.remove('scale-98','opacity-0');
        c.classList.add('scale-100','opacity-100');
      }
    });

    const close = () => {
      el.classList.remove('opacity-100');
      el.classList.add('opacity-0','pointer-events-none');
      const c = $('alert_card');
      if(c){
        c.classList.remove('scale-100','opacity-100');
        c.classList.add('scale-98','opacity-0');
      }
      document.removeEventListener('keydown', onKey);
      setTimeout(()=>{ el.remove(); resolve(); }, 150);
    };
    const onKey = e => { if(e.key === 'Escape') close(); };
    el.onclick = e => { if(e.target === el) close(); };
    $('alert_btn').onclick = close;
    document.addEventListener('keydown', onKey);
  });
}
if(typeof window !== 'undefined') window.alert = (msg) => alertDialog({ title: 'Notice', message: String(msg||'') });

function drawer(o){
  const sb=$('sb'), ov=$('ov');
  if(!sb || !ov) return;
  if(o){
    ov.classList.remove('hidden','pointer-events-none');
    requestAnimationFrame(()=>{
      ov.classList.remove('opacity-0');
      ov.classList.add('opacity-100');
      sb.classList.remove('-translate-x-full');
    });
  } else {
    ov.classList.remove('opacity-100');
    ov.classList.add('opacity-0','pointer-events-none');
    sb.classList.add('-translate-x-full');
    setTimeout(()=>{
      if(ov.classList.contains('opacity-0')) ov.classList.add('hidden');
    }, 150);
  }
}

function modal(h){
  const m=h.match(/<h3[^>]*>(.*?)<\/h3>/s);
  $('mb').innerHTML=`<div class="flex justify-between items-center px-5 py-3.5 border-b border-stone-200/80 bg-stone-50/70 shrink-0"><h3 class="font-semibold text-sm sm:text-base text-ink leading-tight">${m?m[1]:''}</h3><button onclick="closeM()" aria-label="Close" class="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-ink flex items-center justify-center text-xs font-medium transition cursor-pointer">✕</button></div><div class="overflow-y-auto flex-1">`+(m?h.replace(m[0],''):h)+`</div>`;
  const mod=$('modal'), mb=$('mb');
  mod.classList.remove('hidden','pointer-events-none');
  mod.classList.add('flex');
  requestAnimationFrame(()=>{
    mod.classList.remove('opacity-0');
    mod.classList.add('opacity-100');
    if(mb){
      mb.classList.remove('translate-y-4','sm:scale-98','opacity-0');
      mb.classList.add('translate-y-0','sm:scale-100','opacity-100');
    }
  });
}

function closeM(){
  const mod=$('modal'), mb=$('mb');
  if(!mod || mod.classList.contains('hidden')) return;
  mod.classList.remove('opacity-100');
  mod.classList.add('opacity-0','pointer-events-none');
  if(mb){
    mb.classList.remove('translate-y-0','sm:scale-100','opacity-100');
    mb.classList.add('translate-y-4','sm:scale-98','opacity-0');
  }
  setTimeout(()=>{
    if(mod.classList.contains('opacity-0')){
      mod.classList.add('hidden');
      mod.classList.remove('flex');
    }
  },160);
}

let R={},tab='',G={},ACT=0,REFRESH=()=>{},PLUS=null;
const P=[['dash','Dashboard','dashboard.html'],['orders','Orders','orders.html'],['menu','Menu','menu-items.html'],['tables','Tables & QR','tables.html'],['coupons','Coupons','coupons.html'],['report','Reports','reports.html'],['settings','Settings','settings.html']],
  ICN={dash:'dash',orders:'orders',menu:'menu',tables:'tables',coupons:'coupons',report:'report',settings:'gear'};
const go=k=>{location.href=P.find(x=>x[0]===k)[2]};
const logout=()=>db.auth.signOut().then(()=>location.href='login.html');

const darken = (typeof window !== 'undefined' && window.darken) || function(hex, pct){
  try {
    let c = String(hex||'').replace('#','');
    if(c.length === 3) c = c.split('').map(x=>x+x).join('');
    const num = parseInt(c, 16);
    let r = Math.max(0, (num >> 16) - Math.round(255 * (pct/100)));
    let g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * (pct/100)));
    let b = Math.max(0, (num & 0x0000FF) - Math.round(255 * (pct/100)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  } catch(e){ return hex; }
};
function applyTheme(hex){
  if(!hex) hex = '#15803d';
  document.documentElement.style.setProperty('--brand', hex);
  document.documentElement.style.setProperty('--brand-hover', darken(hex, 12));
  document.documentElement.style.setProperty('--brand-light', hex + '14');
  if(window.R) window.R.color = hex;
  if(typeof R !== 'undefined' && R) R.color = hex;
}

function renderNav(){
  $('nav').innerHTML=P.map(([k,l,h])=>`<a href="${h}" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm transition duration-140 ${k===tab?'font-semibold text-brand bg-stone-100/90':'text-stone-600 hover:text-ink hover:bg-stone-100/60'}"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${IC[ICN[k]]}</svg><span class="whitespace-nowrap">${l}</span>${k==='orders'&&ACT?`<span class="ml-auto font-mono bg-amber-500 text-white text-[11px] font-semibold rounded-md px-1.5 py-0.2">${ACT}</span>`:''}</a>`).join('');
  $('ab').textContent=ACT+' active';$('ab').classList.toggle('hidden',!ACT);
}
async function badge(){const {data=[]}=await db.from('orders').select('id').in('status',['new','preparing','served']);ACT=data.length;renderNav()}
async function loadR(){
  R=(await db.from('restaurant').select().eq('id',1).single()).data||{};
  window.R = R;
  applyTheme(R.color||'#15803d');
  $('hn').textContent=R.name||'Restaurant';
  $('lg').textContent=(R.name||'R')[0];
  if(R.color) $('lg').style.backgroundColor = R.color;
}

// Builds the sidebar + top bar around <main id="main"> that every page contains
function buildShell(o){
  const main=$('main'),app=document.createElement('div');
  app.id='app';app.className='min-h-screen lg:flex bg-stone-50 text-ink';
  app.innerHTML=`<div id="ov" onclick="drawer(0)" class="hidden fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-150 opacity-0 pointer-events-none"></div>
  <aside id="sb" class="fixed inset-y-0 left-0 z-50 w-64 lg:w-56 shrink-0 bg-white border-r border-stone-200/90 flex flex-col -translate-x-full transition-transform duration-200 ease-out will-change-transform lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen">
    <div class="flex items-center gap-2.5 px-4 h-14 border-b border-stone-200/90 shrink-0"><div id="lg" class="w-7 h-7 rounded-lg bg-brand text-white grid place-items-center font-bold text-xs shrink-0"></div><b id="hn" class="truncate flex-1 text-sm font-semibold text-ink"></b><button onclick="drawer(0)" aria-label="Close menu" class="lg:hidden text-stone-500 hover:text-ink text-lg leading-none p-1">×</button></div>
    <nav id="nav" class="flex flex-col gap-0.5 p-2 overflow-y-auto flex-1"></nav>
    <div class="p-3 border-t border-stone-200/90 text-xs space-y-2 shrink-0"><a id="cm" target="_blank" class="block text-stone-600 hover:text-ink font-medium">Customer menu ↗</a><button onclick="logout()" class="text-stone-500 hover:text-red-700 font-medium">Log out</button></div>
  </aside>
  <div class="flex-1 min-w-0"><header class="lg:hidden sticky top-0 z-30 bg-white border-b border-stone-200/90 flex items-center gap-3 px-3.5 h-14">
    <button onclick="drawer(1)" aria-label="Open menu" class="p-1.5 -ml-1.5 text-stone-600 hover:text-ink"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    <b id="pt" class="truncate flex-1 text-sm font-semibold text-ink"></b>
    <a href="orders.html" id="ab" class="hidden text-xs bg-amber-500 text-white rounded-md px-2 py-0.5 font-medium font-mono"></a>
    <button id="plus" onclick="PLUS&&PLUS()" aria-label="Add" class="hidden w-8 h-8 shrink-0 place-items-center rounded-lg bg-brand text-white"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
  </header></div>`;
  app.lastElementChild.appendChild(main);
  document.body.prepend(app);
  document.body.insertAdjacentHTML('beforeend','<div id="modal" class="hidden fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 items-end sm:items-center justify-center p-3 sm:p-4 transition-opacity duration-150 opacity-0 pointer-events-none"><div id="mb" class="bg-white w-full sm:max-w-lg rounded-2xl shadow-xl border border-stone-200 max-h-[92vh] overflow-hidden flex flex-col transform transition-all duration-150 translate-y-4 sm:translate-y-0 sm:scale-98 opacity-0 will-change-transform"></div></div><div id="toast" class="hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[80]"></div><div id="inv"></div>');
  $('pt').textContent=o.title;document.title=o.title+' · Admin';
  $('cm').href=new URL('../menu.html',location.href).href;
  if(o.plus){PLUS=o.plus;$('plus').classList.remove('hidden');$('plus').classList.add('grid')}
  $('modal').onclick=e=>{if(e.target.id==='modal')closeM()};
  addEventListener('keydown',e=>{if(e.key==='Escape'){drawer(0);closeM()}});
}

function renderSkeleton(p){
  const el = $('main');
  if(!el) return;
  if(p === 'dash'){
    el.innerHTML = `<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">${Array(4).fill('<div class="box p-4 animate-pulse"><div class="h-3 bg-stone-200 rounded w-16 mb-2"></div><div class="h-7 bg-stone-200 rounded w-24 mb-1.5"></div><div class="h-2.5 bg-stone-200 rounded w-20"></div></div>').join('')}</div>
    <div class="grid lg:grid-cols-3 gap-4 mb-5">
      <div class="box p-4 lg:col-span-2 animate-pulse"><div class="h-4 bg-stone-200 rounded w-28 mb-4"></div><div class="h-60 bg-stone-100 rounded-lg"></div></div>
      <div class="box p-4 animate-pulse"><div class="h-4 bg-stone-200 rounded w-20 mb-4"></div><div class="grid grid-cols-3 gap-2">${Array(6).fill('<div class="h-14 bg-stone-100 rounded-lg"></div>').join('')}</div></div>
    </div>
    <div class="grid lg:grid-cols-3 gap-4">
      <div class="box lg:col-span-2 p-4 animate-pulse"><div class="h-4 bg-stone-200 rounded w-24 mb-4"></div><div class="space-y-3">${Array(3).fill('<div class="h-12 bg-stone-100 rounded"></div>').join('')}</div></div>
      <div class="box p-4 animate-pulse"><div class="h-4 bg-stone-200 rounded w-24 mb-4"></div><div class="space-y-3">${Array(4).fill('<div class="space-y-1.5"><div class="h-3.5 bg-stone-200 rounded w-3/4"></div><div class="h-1.5 bg-stone-100 rounded w-full"></div></div>').join('')}</div></div>
    </div>`;
  } else if(p === 'orders'){
    el.innerHTML = `<div class="flex gap-2 mb-4 animate-pulse">${Array(4).fill('<div class="h-8 w-20 bg-stone-200 rounded-lg"></div>').join('')}</div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">${Array(6).fill('<div class="box p-4 space-y-3"><div class="flex justify-between items-center"><div class="h-4 bg-stone-200 rounded w-20"></div><div class="h-4 bg-stone-200 rounded w-14"></div></div><div class="space-y-2 py-1"><div class="h-3.5 bg-stone-200 rounded w-3/4"></div><div class="h-3 bg-stone-200 rounded w-1/2"></div></div><div class="flex justify-between items-center pt-2.5 border-t border-stone-100"><div class="h-8 bg-stone-200 rounded w-24"></div><div class="h-8 bg-stone-200 rounded w-16"></div></div></div>').join('')}</div>`;
  } else if(p === 'menu'){
    el.innerHTML = `<div class="flex flex-wrap items-center gap-3 mb-4 animate-pulse"><div class="h-6 bg-stone-200 rounded w-28 lg:mr-auto hidden lg:block"></div><div class="h-9 bg-stone-200 rounded-lg flex-1 lg:w-64"></div><div class="h-9 w-24 bg-stone-200 rounded-lg hidden lg:block"></div></div>
    <div class="box divide-y divide-stone-100 animate-pulse">${Array(6).fill('<div class="row"><div class="w-12 h-12 rounded-lg bg-stone-200 shrink-0"></div><div class="flex-1 min-w-0 space-y-2 py-1"><div class="h-3.5 bg-stone-200 rounded w-36"></div><div class="h-2.5 bg-stone-200 rounded w-24"></div></div><div class="w-10 h-5 bg-stone-200 rounded-full shrink-0"></div></div>').join('')}</div>`;
  } else if(p === 'tables'){
    el.innerHTML = `<div class="flex justify-between items-center mb-4 animate-pulse"><div class="h-6 bg-stone-200 rounded w-28"></div><div class="h-8 bg-stone-200 rounded w-28"></div></div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 animate-pulse">${Array(6).fill('<div class="box p-3 text-center space-y-2.5"><div class="h-5 bg-stone-200 rounded w-16 mx-auto"></div><div class="w-24 h-24 bg-stone-200 rounded-lg mx-auto"></div><div class="h-3 bg-stone-200 rounded w-20 mx-auto"></div></div>').join('')}</div>`;
  } else if(p === 'coupons'){
    el.innerHTML = `<div class="flex justify-between items-center mb-4 animate-pulse"><div class="h-6 bg-stone-200 rounded w-24"></div><div class="h-8 bg-stone-200 rounded w-28"></div></div>
    <div class="box divide-y divide-stone-100 animate-pulse">${Array(4).fill('<div class="row"><div class="flex-1 space-y-2 py-1"><div class="h-4 bg-stone-200 rounded w-28"></div><div class="h-2.5 bg-stone-200 rounded w-44"></div></div><div class="w-12 h-6 bg-stone-200 rounded"></div></div>').join('')}</div>`;
  } else if(p === 'report'){
    el.innerHTML = `<div class="box p-3 mb-3 flex gap-2 animate-pulse"><div class="h-8 bg-stone-200 rounded w-20"></div><div class="h-8 bg-stone-200 rounded w-24"></div><div class="h-8 bg-stone-200 rounded w-24"></div></div>
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4 animate-pulse">${Array(5).fill('<div class="box p-3"><div class="h-2.5 bg-stone-200 rounded w-16 mb-2"></div><div class="h-5 bg-stone-200 rounded w-20"></div></div>').join('')}</div>
    <div class="grid lg:grid-cols-3 gap-4 mb-4 animate-pulse"><div class="box p-4 lg:col-span-2 h-64 bg-stone-100 rounded-lg"></div><div class="box p-4 h-64 bg-stone-100 rounded-lg"></div></div>`;
  } else if(p === 'settings'){
    el.innerHTML = `<div class="space-y-4 max-w-3xl animate-pulse">
      <div class="box p-4 sm:p-5 space-y-3"><div class="h-4 bg-stone-200 rounded w-36 mb-2"></div><div class="h-9 bg-stone-100 rounded"></div><div class="h-9 bg-stone-100 rounded"></div></div>
      <div class="box p-4 sm:p-5 space-y-3"><div class="h-4 bg-stone-200 rounded w-40 mb-2"></div><div class="flex gap-2">${Array(8).fill('<div class="w-8 h-8 rounded-full bg-stone-200"></div>').join('')}</div></div>
      <div class="box p-4 sm:p-5 space-y-3"><div class="h-4 bg-stone-200 rounded w-36 mb-2"></div><div class="h-10 bg-stone-100 rounded"></div></div>
    </div>`;
  } else {
    el.innerHTML = `<div class="box p-5 space-y-3 animate-pulse"><div class="h-5 bg-stone-200 rounded w-36 mb-3"></div><div class="space-y-2">${Array(4).fill('<div class="h-8 bg-stone-100 rounded"></div>').join('')}</div></div>`;
  }
}

// Every page calls init({page,title,view,live,plus}) once, at its end
async function init(o){
  tab=o.page;REFRESH=o.view;
  if(!(await db.auth.getSession()).data.session){location.replace('login.html');return}
  buildShell(o);renderNav();
  renderSkeleton(o.page);
  try{
    await loadR();badge();
    db.channel('o').on('postgres_changes',{event:'*',schema:'public',table:'orders'},p=>{badge();if(o.live)REFRESH();if(p.eventType==='INSERT')beep()}).subscribe();
    await o.view();
  }catch(e){$('main').innerHTML=`<div class="box p-4 text-sm"><b class="text-red-600 font-semibold">Could not load data</b><p class="mt-1 text-stone-500">${esc(e.message||e)}</p></div>`}
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { merge, inR, tk, esc, darken, pr, sd, ad, iso, ymd, pd, fd, fh };
}
