const {chromium}=require('C:/Users/DELL/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');const {pathToFileURL}=require('node:url');const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('index.html')).href);await page.waitForFunction(()=>window.__journeyDebug.state.assetsReady);
 await page.evaluate(()=>scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*.125,behavior:'instant'}));
 const running=new Set(),walking=new Set(),encounters=new Set();let runShot=false;
 for(let i=0;i<95;i++){
  await page.waitForTimeout(70);const s=await page.evaluate(()=>window.__journeyDebug.state.motion);encounters.add(s.encounter);
  if(s.mode==='run'){running.add(s.frame);if(!runShot){await page.screenshot({path:'running-preview.png'});runShot=true;}}
  if(s.mode==='walk')walking.add(s.frame);
 }
 assert.ok(running.size>=5,'Running cycle should visibly advance');assert.ok(walking.size>=2,'Arrival should decelerate into walking');
 assert.ok(encounters.has('contact'));assert.equal(await page.evaluate(()=>window.__journeyDebug.state.motion.hostPose),'idle');
 await page.goto(pathToFileURL(path.resolve('sprite-sheets.html')).href);await page.waitForFunction(()=>!document.querySelector('#status').textContent.includes('Loading'));
 await page.selectOption('#animation','run');await page.selectOption('#outfit','2');await page.waitForTimeout(500);
 assert.match(await page.locator('#status').textContent(),/Running/);await page.screenshot({path:'sprite-sheets-preview.png'});
 await page.locator('#replay').click();await page.waitForTimeout(800);assert.match(await page.locator('#status').textContent(),/contact/);
 await page.selectOption('#animation','idle');await page.selectOption('#milestone',{index:9});await page.waitForTimeout(100);assert.match(await page.locator('#status').textContent(),/Health AI/);
 assert.equal(await page.locator('a[download]').count(),5);
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: actual browser walking/running playback, braking, greeting and idle return; standalone preview controls and five sheet downloads; no browser exceptions.');
})().catch(e=>{console.error(e);process.exit(1)});
