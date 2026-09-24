const assert=require('node:assert/strict');global.window={};
require('./assets/sprite-metadata.js');require('./motion.js');
const ground=x=>680-x*.065+14*Math.sin(x/245);
const motion=window.createJourneyMotion(250,850,10,ground);
let time=0;const seen=new Set(),frames={walk:new Set(),run:new Set()},states=[];
function tick(goal,n=1){for(let i=0;i<n;i++){time+=1000/60;const before=motion.state.x;const state=motion.update(time,goal);assert.ok(Math.abs(state.x-before)<=400/60+.01);seen.add(state.mode);if(frames[state.mode])frames[state.mode].add(state.frame);states.push(state.encounter);}}
// Slow changes should use a walking cycle; a large backlog should use running.
motion.jump(0);for(let i=0;i<180;i++)tick(290+i*1.3);
tick(1100,260);
assert.ok(seen.has('walk')&&seen.has('run'));
assert.equal(frames.walk.size,6);assert.equal(frames.run.size,6);
// Each arrival greets once, with aligned hands and a return to idle.
for(let stop=0;stop<10;stop++){
 motion.jump(stop);const phases=new Set();let contactFrames=0;
 for(let i=0;i<160;i++){tick(250+stop*850);phases.add(motion.state.encounter);if(motion.state.encounter==='contact'){contactFrames++;assert.ok(motion.state.handError<3.1);}}
 for(const p of ['idle','reach','contact','release'])assert.ok(phases.has(p),p);
 assert.ok(contactFrames>30);assert.equal(motion.state.encounter,'idle');assert.equal(motion.state.hostPose,'idle');
 tick(250+stop*850,100);assert.equal(motion.state.encounter,'idle');
}
motion.update(time+100,250,true);assert.equal(motion.state.mode,'idle');assert.equal(motion.state.hostPose,'idle');
console.log('PASS: all six walking and running frames; bounded movement; ten one-shot reach/contact/release greetings; hands aligned within 3.1 world pixels; reduced-motion idle.');
