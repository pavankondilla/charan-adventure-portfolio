(() => {
 const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d'),status=document.querySelector('#status');
 const mode=document.querySelector('#animation'),outfit=document.querySelector('#outfit'),milestone=document.querySelector('#milestone'),play=document.querySelector('#play');
 const meta=window.SPRITE_META,images={},files={walk:'traveler-walk-v6',run:'traveler-run-v5',hero:'traveler-greet-v5',idle:'milestones-idle-v5',greet:'milestones-greet-v5'};
 let paused=matchMedia('(prefers-reduced-motion: reduce)').matches,time=0,last=0,phase=0,motion=window.createJourneyMotion(250,850,10,()=>340);
 play.textContent=paused?'Play':'Pause';
 function reset(){time=0;phase=0;motion=window.createJourneyMotion(250,850,10,()=>340);motion.jump(milestone.selectedIndex);}
 function draw(key,index,x,y,scale,flip=false,pulse=0){const f=meta[key].frames[index];ctx.save();ctx.translate(x,y);ctx.scale(flip?-1:1,1+pulse/(f.handY*scale||1));ctx.drawImage(images[key],f.x,f.y,f.w,f.h,-f.pivot*scale,-f.h*scale,f.w*scale,f.h*scale);ctx.restore();}
 mode.addEventListener('change',reset);outfit.addEventListener('change',reset);milestone.addEventListener('change',reset);
 play.addEventListener('click',()=>{paused=!paused;play.textContent=paused?'Play':'Pause';});
 document.querySelector('#replay').addEventListener('click',()=>{mode.value='greeting';paused=false;play.textContent='Pause';reset();});
 function render(now){const dt=Math.min(50,now-last||16);last=now;if(!paused){time+=dt;phase+=dt*(mode.value==='run'?14:8)/1000;}
  ctx.clearRect(0,0,1000,420);ctx.fillStyle='#bdd0ad';ctx.fillRect(0,340,1000,80);ctx.strokeStyle='#78946d';ctx.beginPath();ctx.moveTo(0,340);ctx.lineTo(1000,340);ctx.stroke();
  if(mode.value==='walk'||mode.value==='run'){const stage=Number(outfit.value),frame=Math.floor(phase)%6;draw(mode.value,stage*6+frame,500,340-((mode.value==='run'&&(frame===2||frame===5))?5:0),255/meta[mode.value].rowHeights[stage]);status.textContent=`${mode.value==='walk'?'Walking':'Running'} · frame ${frame+1} / 6 · ${outfit.selectedOptions[0].text}`;}
  else if(mode.value==='idle'){const i=milestone.selectedIndex;draw('idle',i,500,340,255/meta.idle.frames[i].h,true);status.textContent=`Idle · ${milestone.selectedOptions[0].text}`;}
  else{const i=milestone.selectedIndex,s=paused?motion.state:motion.update(time,250+i*850),g=motion.geometry(i),center=(g.meet+g.nx)/2;draw('hero',s.stage*4+s.frame,500+(g.meet-center)*1.2,340,g.heroScale*1.2,false,s.contactPulse);const key=s.hostPose==='greet'?'greet':'idle';draw(key,i,500+(g.nx-center)*1.2,340,g.hostScale*meta.greet.frames[i].h/meta[key].frames[i].h*1.2,true,s.contactPulse);status.textContent=`Greeting · ${s.encounter} · ${milestone.selectedOptions[0].text}`;}
  requestAnimationFrame(render);
 }
 Promise.all(Object.entries(files).map(([key,file])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{images[key]=im;resolve();};im.onerror=reject;im.src='assets/'+file+'.png';}))).then(()=>requestAnimationFrame(render)).catch(()=>status.textContent='A sheet could not load. Keep this page beside the assets folder and reload.');
})();
