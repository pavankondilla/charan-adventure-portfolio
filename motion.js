/* Distance-driven sprite playback and a one-shot greeting at each arrival. */
window.createJourneyMotion = function(start,spacing,count,ground) {
 const state={x:start,speed:0,phase:0,stage:0,mode:'idle',frame:0,encounter:'idle',hostPose:'idle',contactPulse:0,stop:0,handError:0};
 let arrivedAt=null,arrivedStop=-1,complete=false,lastTime=0;
 const meta=window.SPRITE_META;
 const height=stage=>[190,198,207][stage];
 const stageAt=index=>index===0?0:index<4?1:2;
 function geometry(index){
  const stage=stageAt(index),hero=meta.hero.frames[stage*4+2],host=meta.greet.frames[index];
  const hs=height(stage)/meta.hero.rowHeights[stage],nx=start+index*spacing+116;
  let hostScale=height(stage)/host.h,meet=nx-hero.handX*hs-host.handX*hostScale+3;
  // Place both hands at the same height while both pairs of shoes stay grounded.
  for(let i=0;i<3;i++){hostScale=(ground(nx)-ground(meet)+hero.handY*hs)/host.handY;meet=nx-hero.handX*hs-host.handX*hostScale+3;}
  return {stage,heroHeight:height(stage),hostScale,nx,meet,heroScale:hs};
 }
 function jump(index){state.x=geometry(index).meet;state.speed=0;state.phase=0;arrivedAt=null;arrivedStop=-1;complete=false;state.stop=index;state.stage=stageAt(index);}
 function update(time,desiredX,reduced=false,paused=false){
  const dt=Math.min(.05,Math.max(.001,(time-lastTime)/1000||.016));lastTime=time;
  if(paused){if(arrivedAt!==null)arrivedAt+=dt*1000;return state;}
  const destination=Math.max(0,Math.min(count-1,Math.round((desiredX-start)/spacing)));
  const stopped=Math.abs(desiredX-(start+destination*spacing))<2,g=geometry(destination);
  const goal=stopped?g.meet:desiredX,gap=goal-state.x;
  if(reduced){state.x=goal;state.speed=0;state.mode='idle';state.encounter='idle';state.hostPose='idle';state.frame=0;state.stop=destination;state.stage=stageAt(destination);return state;}
  const previous=state.x,desiredSpeed=Math.abs(gap)<.35?0:Math.sign(gap)*Math.min(Math.abs(gap)>100?400:145,Math.sqrt(2*700*Math.abs(gap)));
  const acceleration=900*dt;state.speed+=Math.max(-acceleration,Math.min(acceleration,desiredSpeed-state.speed));
  const step=state.speed*dt;if(Math.abs(step)>=Math.abs(gap)&&Math.sign(step)===Math.sign(gap)){state.x=goal;state.speed=0;}else state.x+=step;
  state.stop=Math.max(0,Math.min(count-1,Math.round((state.x-start)/spacing)));state.stage=stageAt(state.stop);
  const moved=Math.abs(state.x-previous);
  if(Math.abs(gap)>.8||Math.abs(state.speed)>3){
   state.mode=Math.abs(state.speed)>190?'run':'walk';state.phase+=moved/(state.mode==='run'?145:100)*6;state.frame=Math.floor(state.phase)%6;
   state.encounter='approach';state.hostPose='idle';state.contactPulse=0;
   if(!stopped||arrivedStop!==destination){arrivedAt=null;complete=false;}
  }else{
   state.mode='idle';state.frame=0;state.hostPose='idle';state.contactPulse=0;
   if(!stopped){state.encounter='idle';return state;}
   if(arrivedStop!==destination){arrivedStop=destination;arrivedAt=null;complete=false;}
   if(arrivedAt===null)arrivedAt=time;
   const elapsed=time-arrivedAt;
   if(complete||elapsed<200)state.encounter='idle';
   else if(elapsed<440){state.encounter='reach';state.frame=1;state.hostPose=elapsed>320?'greet':'idle';}
   else if(elapsed<1500){state.encounter='contact';state.frame=2;state.hostPose='greet';state.contactPulse=Math.sin((elapsed-440)/1060*Math.PI*4)*1.1;
    const hf=meta.hero.frames[state.stage*4+2],nf=meta.greet.frames[destination];
    state.handError=Math.hypot(state.x+hf.handX*g.heroScale-(g.nx-nf.handX*g.hostScale),ground(state.x)-hf.handY*g.heroScale-(ground(g.nx)-nf.handY*g.hostScale));
   }
   else if(elapsed<1780){state.encounter='release';state.frame=3;state.hostPose=elapsed<1610?'greet':'idle';}
   else{state.encounter='idle';complete=true;}
  }
  return state;
 }
 return {state,geometry,jump,update};
};
