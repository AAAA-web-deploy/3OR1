/* 3OR1 Fusion Lab — dependency-free, local-first, no wallet or API requirements. */
(() => {
  'use strict';
  const moods = ['happy','shocked','angry','sad','smug'];
  const people = [
    {id:'vitalik',name:'Vitalik',meme:'SpongeBob'},
    {id:'anatoly',name:'Anatoly',meme:'Trollface'},
    {id:'raj',name:'Raj',meme:'Doge'}
  ];
  const state = {vitalik:'happy',anatoly:'happy',raj:'happy'};
  const $ = sel => document.querySelector(sel);
  const imageFor = (who, mood) => `assets/faces/${who}-${mood}.webp`;
  const allMatch = mood => `assets/results/match-${mood}.webp`;
  const mixed = [
    {id:'surprised-amused-doubtful',combos:['shocked','smug','smug'],label:'SURPRISED + AMUSED + DOUBTFUL',desc:'Surprised eyes. Troll grin. Doge has questions.'},
    {id:'offended-sarcastic-irritated',combos:['angry','smug','angry'],label:'OFFENDED + SARCASTIC + IRRITATED',desc:'Three personalities just entered one argument.'},
    {id:'proud-amused-embarrassed',combos:['smug','happy','sad'],label:'PROUD + AMUSED + EMBARRASSED',desc:'One body. Three radically different victory speeches.'},
    {id:'confused-frustrated-skeptical',combos:['shocked','angry','smug'],label:'CONFUSED + FRUSTRATED + SKEPTICAL',desc:'The committee has officially lost control.'},
    {id:'happy-amused-accepting',combos:['happy','smug','happy'],label:'HAPPY + AMUSED + ACCEPTING',desc:'Everyone says yes. Nobody knows what they agreed to.'}
  ];
  const quips = {
    happy:'Everyone agreed. Disturbingly wholesome.',
    shocked:'Three jump scares. One body.',
    angry:'Three rage quitters. One keyboard.',
    sad:'It is raining inside the brain.',
    smug:'They all think the joke was their idea.'
  };
  const cache = new Map();
  const loadImage = src => {
    if(!cache.has(src)) cache.set(src,new Promise((resolve,reject)=>{
      const im = new Image();im.decoding='async';im.onload=()=>resolve(im);im.onerror=()=>reject(new Error(`Couldn't load ${src}`));im.src=src;
    }));
    return cache.get(src);
  };
  let currentRender=0;
  let currentImageUrl=allMatch('happy');
  let usingCanvas=false;
  let firstPaint=true;
  const titleEl=$('#result-title'),descEl=$('#result-description'),kindEl=$('#result-kind');
  const resultImg=$('#result-image'),canvas=$('#remix-canvas');
  const tagEl=$('#selected-tags'),moreEl=$('#more-chaos');
  const outputArt=$('.result-art');

  function createSelectors(){
    people.forEach(({id})=>{
      const panel=document.querySelector(`[data-person="${id}"]`);
      moods.forEach(mood=>{
        const btn=document.createElement('button');btn.type='button';btn.className='mood-choice';btn.dataset.mood=mood;btn.dataset.person=id;
        btn.setAttribute('aria-pressed',String(state[id]===mood));
        btn.setAttribute('aria-label',`${id}: ${mood}`);
        const img=document.createElement('img');img.src=imageFor(id,mood);img.alt='';img.loading='lazy';img.decoding='async';
        const span=document.createElement('span');span.textContent=mood;
        btn.append(img,span);btn.addEventListener('click',()=>{state[id]=mood;renderResult();});panel.append(btn);
      });
    });
  }
  function createPresets(){
    const area=$('#preset-buttons');
    moods.forEach(mood=>{
      const btn=document.createElement('button');btn.type='button';btn.dataset.mood=mood;btn.textContent=`${mood} ×3`;
      btn.addEventListener('click',()=>selectCombo([mood,mood,mood]));area.append(btn);
    });
  }
  function createGalleries(){
    const match=$('#match-gallery'), mixedEl=$('#mixed-gallery');
    moods.forEach((mood,index)=>{
      const item=document.createElement('article');item.className='gallery-item reveal';
      const btn=document.createElement('button');btn.type='button';
      const img=document.createElement('img');img.src=allMatch(mood);img.alt=`All three founders ${mood} fusion artwork`;img.loading='lazy';img.decoding='async';img.width=1050;img.height=1050;
      const tag=document.createElement('div');tag.className='gallery-tag';tag.textContent=`${mood.toUpperCase()} × 3 → TRY IT ↗`;
      btn.append(img,tag);btn.addEventListener('click',()=>selectCombo([mood,mood,mood]));item.append(btn);match.append(item);
    });
    mixed.forEach(p=>{
      const item=document.createElement('article');item.className='gallery-item reveal';const btn=document.createElement('button');btn.type='button';
      const img=document.createElement('img');img.src=`assets/gallery/mixed-${p.id}.webp`;img.alt=p.label+' fusion artwork';img.loading='lazy';img.decoding='async';img.width=760;img.height=704;
      const tag=document.createElement('div');tag.className='gallery-tag';tag.textContent=p.label+' ↗';
      btn.append(img,tag);btn.addEventListener('click',()=>selectCombo(p.combos));item.append(btn);mixedEl.append(item);
    });
  }
  function selectCombo(arr){people.forEach((p,i)=>{state[p.id]=arr[i];});renderResult();$('#lab').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  function drawRounded(ctx,x,y,w,h,r,fill,stroke){
    ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=5;ctx.stroke();}
  }
  function drawImageCover(ctx,img,x,y,w,h){
    const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale;
    ctx.drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,x,y,w,h);
  }
  function drawFit(ctx,img,x,y,w,h){
    const scale=Math.min(w/img.width,h/img.height),dw=img.width*scale,dh=img.height*scale;
    ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);
  }
  async function drawLiveRemix(token){
    const sources=[...people.map(p=>imageFor(p.id,state[p.id])),'assets/brand/mascot-badge-blue.webp'];
    let images;
    try{images=await Promise.all(sources.map(loadImage));}catch(e){toast('Some remix images could not load. Please reload the page.');return;}
    if(token!==currentRender)return;
    const c=canvas,ctx=c.getContext('2d',{alpha:false});const W=c.width,H=c.height;
    const grad=ctx.createLinearGradient(0,0,W,H);grad.addColorStop(0,'#101b64');grad.addColorStop(.56,'#241055');grad.addColorStop(1,'#00577e');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    ctx.save();ctx.strokeStyle='#33dffa';ctx.lineWidth=7;ctx.beginPath();ctx.roundRect(22,22,W-44,H-44,30);ctx.stroke();ctx.restore();
    for(let i=0;i<44;i++){let x=((i*117+43)%W),y=((i*239+81)%H);ctx.fillStyle=i%2?'#48d7f4':'#f9da50';ctx.beginPath();ctx.arc(x,y,3+(i%4),0,2*Math.PI);ctx.fill();}
    drawRounded(ctx,230,74,640,520,32,'#071231','#ffe353');drawFit(ctx,images[3],252,83,596,500);
    ctx.font='900 48px system-ui, sans-serif';ctx.textAlign='center';ctx.fillStyle='#ffe05c';ctx.fillText('LIVE COLLAGE',W/2,64);
    const labels=['VITALIK','ANATOLY','RAJ'];
    for(let i=0;i<3;i++){
      const x=30+i*365;
      drawRounded(ctx,x,627,310,250,22,'#08142a','#24caff');
      ctx.save();ctx.beginPath();ctx.roundRect(x+10,642,290,180,13);ctx.clip();drawImageCover(ctx,images[i],x+10,642,290,180);ctx.restore();
      ctx.font='900 21px system-ui,sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(`${labels[i]}: ${state[people[i].id].toUpperCase()}`,x+155,860);
    }
    ctx.font='900 26px system-ui,sans-serif';ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.fillText('ONE FACE • THREE MOODS • PURE CHAOS',W/2,610);
  }
  function updateControls(){
    document.querySelectorAll('.mood-choice').forEach(b=>b.setAttribute('aria-pressed',String(state[b.dataset.person]===b.dataset.mood)));
    document.querySelectorAll('#preset-buttons button').forEach(b=>b.setAttribute('aria-pressed',String(people.every(p=>state[p.id]===b.dataset.mood))));
    tagEl.replaceChildren(...people.map(p=>{const el=document.createElement('span');el.textContent=`${p.name}: ${state[p.id].toUpperCase()}`;return el;}));
  }
  function renderResult(){
    currentRender++;const myToken=currentRender;
    updateControls();
    const a=people.map(p=>state[p.id]),same=a.every(x=>x===a[0]);
    const featured=mixed.find(p=>p.combos.every((x,i)=>x===a[i]));
    usingCanvas=!same&&!featured;
    moreEl.hidden=!usingCanvas;
    resultImg.hidden=usingCanvas;canvas.hidden=!usingCanvas;
    if(same){
      currentImageUrl=allMatch(a[0]);resultImg.src=currentImageUrl;
      resultImg.alt=`All three founders express ${a[0]} in a single fused result illustration`;
      kindEl.textContent='MATCHING PRESET';titleEl.textContent=`${a[0].toUpperCase()} ×3`;
      descEl.textContent=quips[a[0]];
    }else if(featured){
      currentImageUrl=`assets/gallery/mixed-${featured.id}.webp`;
      resultImg.src=currentImageUrl;resultImg.alt=featured.label+' combined illustration';
      kindEl.textContent='FEATURED MIX';titleEl.textContent=featured.label;descEl.textContent=featured.desc;
    }else{
      currentImageUrl='';kindEl.textContent='LIVE COLLAGE';titleEl.textContent='YOUR OWN 3-WAY MOOD SWING';
      descEl.textContent=`${a.map(s=>s.toUpperCase()).join(' + ')} — the meme machine is thinking about it.`;
      drawLiveRemix(myToken);
    }
    if(!firstPaint){outputArt.classList.remove('activated');void outputArt.offsetWidth;outputArt.classList.add('activated');}
    firstPaint=false;
  }
  function toast(message){const el=$('#toast');el.textContent=message;el.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>{el.hidden=true},7000);}
  function validEthereumAddress(addr){return /^0x[0-9a-fA-F]{40}$/.test(addr||'');}
  function buy(){const cfg=window.SITE_CONFIG||{};if(validEthereumAddress(cfg.contractAddress)){
      const url=`https://app.uniswap.org/swap?chain=ethereum&outputCurrency=${encodeURIComponent(cfg.contractAddress)}`;window.open(url,'_blank','noopener,noreferrer');
    }else toast('🚧 $3OR1 trading link is not configured yet. Wait for the VERIFIED contract address. Beware of copycats!');
  }
  async function downloadCurrent(){
    const name=`3OR1-${people.map(p=>state[p.id]).join('-')}.${usingCanvas?'png':'webp'}`;
    let href='', revoke=false;
    try{
      if(usingCanvas) href=canvas.toDataURL('image/png');
      else{
        const res=await fetch(currentImageUrl);
        if(!res.ok) throw new Error('missing image');
        href=URL.createObjectURL(await res.blob());
        revoke=true;
      }
    }catch(e){toast('Unable to save this result. Please try again.');return;}
    const a=document.createElement('a');a.download=name;a.href=href;document.body.append(a);a.click();a.remove();
    if(revoke) setTimeout(()=>URL.revokeObjectURL(href),1500);
  }
  function officialLink(value, hosts){
    if(!value || typeof value!=='string') return '';
    let url;
    try{url=new URL(value.trim());}catch(e){return '';}
    if(url.protocol!=='https:') return '';
    const host=url.hostname.toLowerCase();
    if(!hosts.some(h=>host===h || host.endsWith('.'+h))) return '';
    return url.href;
  }
  function setupSocial(){
    const cfg=window.SITE_CONFIG||{};
    const links=[
      ['X', officialLink(cfg.xUrl, ['x.com','twitter.com'])],
      ['Telegram', officialLink(cfg.telegramUrl, ['t.me','telegram.me'])],
      ['Chart', officialLink(cfg.dexScreenerUrl, ['dexscreener.com'])]
    ].filter((pair)=>pair[1]);
    const slot=$('#social-links');
    if(!slot || !links.length) return;
    slot.replaceChildren(...links.map(([label, href])=>{
      const a=document.createElement('a');
      a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;
      return a;
    }));
    slot.hidden=false;
  }
  function setupReveal(){const els=[...document.querySelectorAll('.reveal')];if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('in-view'));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target);}}),{rootMargin:'0px 0px 55px 0px',threshold:.06});els.forEach(el=>observer.observe(el));
  }
  function setupMobile(){const toggle=$('.menu-toggle'),nav=$('#mobile-nav');
    const closeMenu=()=>{nav.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');toggle.textContent='☰';};
    toggle.addEventListener('click',()=>{const open=nav.hasAttribute('hidden');nav.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');toggle.textContent=open?'✕':'☰';});
    nav.addEventListener('click',e=>{if(e.target.closest('a, button')) closeMenu();});
  }
  function init(){createSelectors();createPresets();createGalleries();renderResult();setupReveal();setupMobile();setupSocial();
    $('#randomize').addEventListener('click',()=>{people.forEach(p=>state[p.id]=moods[Math.floor(Math.random()*moods.length)]);renderResult();});
    $('#download-result').addEventListener('click',downloadCurrent);
    document.addEventListener('click',e=>{if(e.target.closest('[data-buy]'))buy();});
    $('#year').textContent=new Date().getFullYear();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
