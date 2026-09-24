(() => {
 'use strict';
 const data=window.PORTFOLIO, chapters=window.buildSections(data), count=chapters.length;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const main=document.querySelector('main');
 main.innerHTML=chapters.map(c=>`<section class="stop" id="${c.id}" aria-label="${c.name}"><div class="panel">${c.body}</div></section>`).join('');
 document.querySelector('#journey-links').innerHTML=chapters.map((c,i)=>`<a href="#${c.id}" aria-label="Go to ${c.name}"><span>${String(i+1).padStart(2,'0')}</span><b>${c.name}</b></a>`).join('');
 const checkpointLayer=document.createElement('div');checkpointLayer.id='checkpoints';
 checkpointLayer.innerHTML=chapters.map((c,i)=>`<button hidden class="checkpoint" data-checkpoint="${i}" aria-label="Explore ${esc(c.role)} at ${esc(c.company)}"><span class="interaction-dot" aria-hidden="true">+</span><span class="checkpoint-tip">${esc(c.name)} <span>Explore</span></span></button>`).join('');document.body.append(checkpointLayer);
 const checkpoints=[...checkpointLayer.children];
 const sections=[...document.querySelectorAll('.stop')], panels=sections.map(s=>s.querySelector('.panel'));
 const canvas=document.querySelector('canvas');let ctx;try{ctx=canvas.getContext('2d');}catch{}const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const fill=document.querySelector('#progress-fill'),percent=document.querySelector('#percent'),locationLabel=document.querySelector('#location'),sign=document.querySelector('#world-sign'),toggle=document.querySelector('#view-toggle');
 let simple=false,width=innerWidth,height=innerHeight,maxScroll=1,offsets=[],target=0,progress=0,lastTime=0,active=-1,phase=0,direction=1,arrival=0,assetsReady=false,staticDrawn=false,raf=0;
 const distance=850*(count-1),startX=250;
 const ground=x=>680-x*.065+14*Math.sin(x/245);
 const motion=window.createJourneyMotion(startX,850,count,ground);
 function travel(p){const segment=Math.min(count-1,Math.floor(p*count)),local=p*count-segment;return Math.min(1,(segment+Math.max(0,Math.min(1,(local-.60)/.40)))/(count-1));}
 function wake(){if(!raf)raf=requestAnimationFrame(render);}
 function resize(preserve=false){const saved=target;width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);maxScroll=Math.max(1,document.documentElement.scrollHeight-height);offsets=sections.map(s=>s.offsetTop);if(preserve&&!simple)scrollTo({top:saved*maxScroll,behavior:'instant'});target=Math.max(0,Math.min(1,scrollY/maxScroll));staticDrawn=false;wake();}
 function setSimple(value){simple=value;checkpoints.forEach(b=>b.hidden=true);active=-1;document.body.classList.toggle('simple',simple);toggle.setAttribute('aria-pressed',String(!simple));toggle.firstChild.textContent=simple?'Adventure mode ':'Reading mode ';toggle.setAttribute('aria-label',simple?'Switch to Adventure mode':'Adventure mode is active. Switch to Reading mode');resize();}
 function go(i,instant=false){if(simple){sections[i].scrollIntoView({behavior:reduce.matches||instant?'instant':'smooth'});}else{const destination=i/count+.025;progress=destination;target=destination;motion.jump(i);scrollTo({top:maxScroll*destination,behavior:'instant'});active=-1;}wake();}
 toggle.addEventListener('click',async()=>{const i=Math.max(0,active);if(simple&&!assetsReady){toggle.disabled=true;const ready=await loadArtwork();toggle.disabled=false;if(!ready)return;}setSimple(!simple);go(i,true);});
 reduce.addEventListener('change',()=>{staticDrawn=false;wake();});
 addEventListener('resize',()=>resize(true));addEventListener('scroll',()=>{target=Math.max(0,Math.min(1,scrollY/maxScroll));wake();},{passive:true});
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const id=a.getAttribute('href').slice(1),i=chapters.findIndex(c=>c.id===id);if(i<0)return;e.preventDefault();history.replaceState(null,'','#'+id);go(i);});
 const dialog=document.querySelector('#build-dialog'),dialogContent=document.querySelector('#dialog-content');let lastFocus;
 function openDialog(body){lastFocus=document.activeElement;dialogContent.innerHTML=body;if(!dialog.open)dialog.showModal();document.querySelector('#dialog-close').focus();}
 checkpointLayer.addEventListener('click',e=>{const b=e.target.closest('[data-checkpoint]');if(!b)return;const i=Number(b.dataset.checkpoint);openDialog(`<div class="dialog-avatar npc-portrait" style="--npc-column:${i%5};--npc-row:${Math.floor(i/5)}" aria-hidden="true"></div>`+chapters[i].body.replace(`id="title-${chapters[i].id}"`,'id="dialog-title"'));});
 document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>lastFocus?.focus());
 function load(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error(src));im.src=src;});}
 let landscape,atlas,city,cityAtlas;const sprites={};
 let greeting=false,travelerStage=0,artworkLoad=null;
 function loadArtwork(){
  if(artworkLoad)return artworkLoad;
  artworkLoad=Promise.all([load('assets/landscape.png'),load('assets/scenery.png'),load('assets/city.png'),load('assets/city-landmarks.png'),load('assets/traveler-walk-v6.png'),load('assets/traveler-run-v5.png'),load('assets/traveler-greet-v5.png'),load('assets/milestones-idle-v5.png'),load('assets/milestones-greet-v5.png')]).then(images=>{
   [landscape,atlas,city,cityAtlas,sprites.walk,sprites.run,sprites.hero,sprites.idle,sprites.greet]=images;assetsReady=true;staticDrawn=false;document.querySelector('.asset-status').hidden=true;wake();return true;
  }).catch(()=>{setSimple(true);document.querySelector('.asset-status').hidden=false;document.querySelector('.asset-status').textContent='Artwork could not load. Your journey is available in Reading mode. Select Adventure mode to retry.';return false;}).finally(()=>{artworkLoad=null;});
  return artworkLoad;
 }
 loadArtwork();
 function paintSprite(key,index,x,y,scale,flip=false,pulse=0){
  const im=sprites[key],frame=window.SPRITE_META[key].frames[index];
  ctx.save();ctx.translate(x,y);ctx.scale(flip?-1:1,1+(pulse/(frame.handY*scale||1)));
  ctx.drawImage(im,frame.x,frame.y,frame.w,frame.h,-frame.pivot*scale,-frame.h*scale,frame.w*scale,frame.h*scale);ctx.restore();
 }
 function cover(im,x,y,w,h){const s=Math.max(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*s)/2,y+(h-im.height*s)/2,im.width*s,im.height*s);}

 function draw(time,journey,delta){
 if(!ctx||!assetsReady)return;if(simple&&staticDrawn)return;staticDrawn=true;
 ctx.clearRect(0,0,width,height);
 const mobile=width<761,scale=mobile?Math.min(.82,width/470):Math.min(1.1,width/1350),p=simple?0:Math.max(0,Math.min(1,(motion.state.x-startX)/distance));
 const x=simple?startX:motion.state.x,y=ground(x),anchorX=width*(mobile?.34:.43),anchorY=height*(mobile?.81:.80),cameraX=x-anchorX/scale,cameraY=y-anchorY/scale;
 cover(landscape,-p*width*.12,-p*height*.025,width*1.18,height*1.04);
 const blend=Math.max(0,Math.min(1,(p-.03)/.47));
 ctx.globalAlpha=blend;cover(city,-p*width*.22,0,width*1.25,height);ctx.globalAlpha=1;
 ctx.save();ctx.scale(scale,scale);ctx.translate(-cameraX,-cameraY);
 const left=Math.floor(cameraX/5)*5,right=cameraX+width/scale+8;
 // All walking surfaces and foot positions derive from ground(x).
 for(let tx=left;tx<right;tx+=5){const sample=240+(((tx%1200)+1200)%1200)/1200*1250,gy=ground(tx);ctx.drawImage(atlas,sample,550,6,290,tx,gy-55,5.6,290);ctx.drawImage(atlas,sample,780,6,45,tx,gy+235,5.6,height/scale);}
 for(let i=0;i<count;i++){
 const lx=startX+i*850+300;if(lx<left-500||lx>right+500)continue;
 const type=chapters[i].landmark;
 if(type==='village'){ctx.drawImage(atlas,700,0,370,460,lx-160,ground(lx)-320+8,300,320);}
 else {const col={hospital:0,campus:1,office:2,travel:3}[type],[sx,ex]=[[0,480],[480,975],[975,1420],[1420,1774]][col],cw=ex-sx,w=type==='hospital'?360:310,h=w*465/cw;ctx.drawImage(cityAtlas,sx,210,cw,465,lx-w/2,ground(lx)-h+4,w,h);}
 }
 // Pose playback comes from actual traveled distance. Feet share the terrain baseline.
 const actor=motion.state,meta=window.SPRITE_META;
 travelerStage=actor.stage;greeting=actor.encounter==='contact';
 const heroHeight=[190,198,207][travelerStage];
 const spriteKey=actor.mode==='idle'?'hero':actor.mode;
 const spriteIndex=travelerStage*meta[spriteKey].cols+actor.frame;
 const heroScale=heroHeight/meta[spriteKey].rowHeights[travelerStage];
 const airborne=actor.mode==='run'&&(actor.frame===2||actor.frame===5)?4:0;
 paintSprite(spriteKey,spriteIndex,x,y-airborne,heroScale,actor.mode!=='idle'&&direction<0,actor.contactPulse);
 checkpoints.forEach((button,i)=>{
  const g=motion.geometry(i),nx=g.nx,ny=ground(nx);
  const screenX=(nx-cameraX)*scale,screenY=(ny-cameraY)*scale;
  const inView=screenX>-130&&screenX<width+130;
  const key=i===actor.stop&&actor.hostPose==='greet'?'greet':'idle',frame=meta[key].frames[i];
  const hostScale=g.hostScale*meta.greet.frames[i].h/frame.h;
  const pulse=i===actor.stop&&greeting?actor.contactPulse:(!reduce.matches&&!dialog.open?Math.sin(time/1100+i)*.35:0);
  if(inView&&!simple)paintSprite(key,i,nx,ny,hostScale,true,pulse);
  button.hidden=simple||!inView;button.tabIndex=i===active?0:-1;
  // Mirrored sprite bounds define the transparent click area.
  button.style.left=(screenX+(frame.pivot-frame.w/2)*hostScale*scale)+'px';button.style.top=screenY+'px';
  button.style.width=Math.max(44,frame.w*hostScale*scale)+'px';button.style.height=frame.h*hostScale*scale+'px';
  button.classList.toggle('greeted',i===active&&greeting);
 });
 for(let i=0;i<12;i++){const fx=i*800-400-p*340;if(fx<left-160||fx>right+160)continue;ctx.drawImage(atlas,0,522,210,180,fx,ground(fx)+125,180,154);}
 ctx.restore();
 }
 function render(time){raf=0;const dt=Math.min(50,time-lastTime||16);lastTime=time;const previous=progress;progress=reduce.matches?target:progress+(target-progress)*(1-Math.exp(-dt/65));if(Math.abs(target-progress)<.00001)progress=target;
 const journey=travel(progress),previousX=motion.state.x;
 if(!simple)motion.update(time,startX+journey*distance,reduce.matches,dialog.open);
 const delta=motion.state.x-previousX;if(Math.abs(delta)>.001)direction=delta>0?1:-1;
 const index=simple?Math.max(0,offsets.findLastIndex(y=>y<=scrollY+height*.4)):motion.state.stop;
 if(index!==active){active=index;arrival=time;sections.forEach((s,i)=>{s.classList.toggle('active',simple||i===active);panels[i].inert=!simple;});document.querySelectorAll('nav a,#journey-links a').forEach(a=>{a.removeAttribute('aria-current');if(a.hash==='#'+chapters[active].id)a.setAttribute('aria-current','step');});locationLabel.textContent=`${String(active+1).padStart(2,'0')} — ${chapters[active].place}`;sign.innerHTML=`<span>${chapters[active].date}</span><strong>${chapters[active].sign}</strong><div class="world-rail"><i></i><i></i><i></i></div>`;document.querySelector('.scroll-cue').hidden=active>0;}
 percent.textContent=Math.round(progress*100)+'%';fill.style.width=progress*100+'%';draw(time,journey,delta);
 if(!simple&&!reduce.matches||Math.abs(progress-target)>.00001)wake();
 }
 setSimple(simple);resize();if(!ctx)setSimple(true);wake();
 if(location.hash){const i=chapters.findIndex(c=>c.id===location.hash.slice(1));if(i>=0)setTimeout(()=>go(i,true),100);}
 window.__journeyDebug={ground,travel,get state(){return {progress,target,active,direction,simple,assetsReady,width,height,chapterCount:count,greeting,travelerStage,motion:{...motion.state},footY:ground(motion.state.x)};}};
})();
