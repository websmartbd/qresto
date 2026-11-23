// Chart.js helpers shared by Dashboard and Reports
let CH=[];
var PAL=['#15803d','#22c55e','#86efac','#0ea5e9','#f59e0b','#a78bfa','#f87171','#a3a3a3'];
if(typeof window !== 'undefined') window.PAL = PAL;
const short=x=>x>=1000?'৳'+(x/1000)+'k':'৳'+x;
const axes=h=>{
  const v={
    beginAtZero:true,
    grid:{color:'#ede9e2',drawTicks:false},
    border:{display:false},
    ticks:{callback:short,maxTicksLimit:5,color:'#8a847a',font:{family:'"JetBrains Mono", monospace',size:11},padding:6}
  };
  const c={
    grid:{display:false},
    border:{display:false},
    ticks:{maxRotation:0,autoSkip:true,color:'#8a847a',font:{family:'"DM Sans", "Hind Siliguri", sans-serif',size:11},padding:6}
  };
  return h?{x:v,y:c}:{x:c,y:v};
};
const tipM={
  callbacks:{label:c=>' '+tk(c.parsed.y)},
  backgroundColor:'#1c1a18',
  titleColor:'#ffffff',
  bodyColor:'#ded8ce',
  titleFont:{family:'"DM Sans", "Hind Siliguri", sans-serif',size:12,weight:'500'},
  bodyFont:{family:'"JetBrains Mono", monospace',size:12},
  padding:8,
  cornerRadius:6,
  displayColors:false
};
const IDX={mode:'index',intersect:false};

function brandColor(){
  return (window.R && window.R.color) 
    || (typeof R !== 'undefined' && R && R.color) 
    || (typeof getComputedStyle !== 'undefined' && typeof document !== 'undefined' && getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()) 
    || '#15803d';
}
function brandHoverColor(){
  const bc = brandColor();
  return (typeof darken === 'function') ? darken(bc, 14) : bc;
}
function brandLightColor(alpha = '40'){
  const bc = brandColor();
  if(bc.startsWith('#') && bc.length === 7) return bc + alpha;
  return bc;
}

const cfgLine=(l,v)=>{
  const bc=brandColor();
  return {
    type:'line',
    data:{
      labels:l,
      datasets:[{
        data:v,
        borderColor:bc,
        backgroundColor:bc+'14',
        borderWidth:2,
        fill:true,
        tension:.28,
        pointRadius:2,
        pointHoverRadius:5,
        pointBackgroundColor:bc
      }]
    },
    options:{responsive:true,maintainAspectRatio:false,interaction:IDX,plugins:{legend:{display:false},tooltip:tipM},scales:axes()}
  };
};

const cfgBar=(l,v,c,hc)=>{
  const bc = brandColor(), bhc = brandHoverColor();
  return {
    type:'bar',
    data:{
      labels:l,
      datasets:[{
        data:v,
        backgroundColor:c||bc,
        hoverBackgroundColor:hc||bhc,
        borderRadius:4,
        maxBarThickness:32
      }]
    },
    options:{responsive:true,maintainAspectRatio:false,interaction:IDX,plugins:{legend:{display:false},tooltip:tipM},scales:axes()}
  };
};

let CI=[];
function killCharts(){CI.forEach(c=>c.destroy());CI=[]}
function drawCharts(){
  killCharts();
  if(!window.Chart){
    document.querySelectorAll('#main canvas').forEach(c=>c.parentElement.innerHTML='<p class="text-xs text-stone-500 py-10 text-center">Charts could not load. Check internet connection and refresh.</p>');
    return;
  }
  Chart.defaults.font.family='"DM Sans", "Hind Siliguri", sans-serif';
  Chart.defaults.font.size=11;
  Chart.defaults.color='#8a847a';
  CH.forEach(([id,cfg])=>{const el=$(id);if(el)CI.push(new Chart(el,cfg))});
}
function dayVals(inv,f,e){const l=[],v=[];for(let d=new Date(f);d<e;d=ad(d,1)){const n=ad(d,1);l.push(fd(d));v.push(inv.filter(i=>inR(i.created_at,d,n)).reduce((s,i)=>s+Number(i.total),0))}return [l,v]}
const topOf=(its,k)=>Object.values(its.reduce((m,i)=>{(m[i.name]=m[i.name]||{n:i.name,q:0}).q+=i.qty;return m},{})).sort((x,y)=>y.q-x.q).slice(0,k);
