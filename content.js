/* All career claims come from Charan's brief or his public LinkedIn profile.
   Unknown dates, adoption figures, technologies and performance metrics are not invented. */
window.PORTFOLIO = {
 name: 'Charan Sai Kondilla', experience: '4+',
 links: {email:'', linkedin:'https://www.linkedin.com/in/charansaikondilla/', github:''},
 organizations: {
  hospital:{name:'Srikara Hospitals',url:'https://srikarahospitals.com/'},
  sure:{name:'SURE Trust',url:'https://www.suretrustforruralyouth.com/'},
  isb:{name:'Indian School of Business',url:'https://www.isb.edu/'},
  piorate:{name:'Piorate Ventures',url:'https://www.piorateventures.com/'},
  globe:{name:'GlobeHoppers Tours',url:'https://www.globehopperstours.com/'},
  property:{name:'Aussie Property',url:'https://aussieproperty.au/'},
  rakhi:{name:'AI Rakhi',url:'https://www.airakhi.online/'}
 },
 roles:[
  {date:'CURRENT',role:'Founder & CTO',company:'Piorate Ventures',key:'piorate',detail:'Building an AI and business systems company, with a hands-on focus on automation and product development.'},
  {date:'LEADERSHIP',role:'COO',company:'GlobeHoppers Tours',key:'globe',detail:'An operating role in the travel business. Exact tenure and operational results are not yet published.'},
  {date:'6 MONTHS',role:'AI Consultant',company:'Bcon Ad Labs',detail:'AI consulting engagement. Calendar dates and a detailed scope will be added when confirmed.'},
  {date:'JUL 2024 — PRESENT',role:'Administration & automation',company:'SURE Trust',key:'sure',detail:'Volunteer operations, student and mentor coordination, workflow management, and automation development.'}
 ],
 builds:[
  {id:'hospital-crm',title:'Hospital CRM',company:'Srikara Hospitals',category:'Healthcare',audit:'Patient coordination and administrative handoffs.',solution:'Built a hospital CRM to organize hospital workflows.',impact:'A hospital operations system. Measured hours saved have not been published.',key:'hospital'},
  {id:'hospital-marketing',title:'Hospital AI marketing',company:'Srikara Hospitals',category:'Healthcare',audit:'Repetitive hospital marketing activity and follow-up work.',solution:'Worked on AI marketing for the hospital.',impact:'Healthcare marketing work. Campaign outcomes and time savings have not been published.',key:'hospital'},
  {id:'linlekunda',title:'Linlekunda',company:'Patient–doctor application',category:'Healthcare',audit:'Friction in connecting patients with doctors.',solution:'Developed an application to make patient–doctor connections easier.',impact:'A patient–doctor connection application. Usage and clinical outcome figures are not claimed.'},
  {id:'sure-automation',title:'Operations automation',company:'SURE Trust',category:'Education',audit:'Repeated data entry, reporting, file coordination and daily operations.',solution:'Built automation for student and volunteer operations.',impact:'Public LinkedIn self-report: about 5 hours of repetitive work reduced to minutes, supporting operations for 1,000+ students.',key:'sure',evidence:'https://www.linkedin.com/in/charansaikondilla/'},
  {id:'property-followup',title:'Automated follow-up system',company:'Aussie Property',category:'Real estate',audit:'Manual lead follow-up and repeated outreach.',solution:'Built an automated follow-up system for the real-estate business.',impact:'Follow-up automation. Response-rate changes and hours saved are not yet quantified.',key:'property'},
  {id:'ai-rakhi',title:'AI Rakhi',company:'Founder · personal product',category:'Consumer AI',audit:'Distance between siblings celebrating Raksha Bandhan.',solution:'Created an AI product that connects people online to celebrate Raksha Bandhan.',impact:'An online celebration product. A verified participant count is not yet available.',key:'rakhi'},
  {id:'health-assistant',title:'AI Health Assistant',company:'Personal project',category:'Wellbeing',audit:'Busy founders and business professionals forgetting wellbeing routines.',solution:'Built a personal AI health assistant focused on reminders for business and startup professionals.',impact:'A personal reminder project; no diagnostic or clinical effectiveness claims.'}
 ],
 sources:[
  {label:'Public LinkedIn profile',url:'https://www.linkedin.com/in/charansaikondilla/',note:'SURE Trust role since July 2024, self-reported workflow result, education 2021–2024, cybersecurity certification December 2023.'},
  {label:'SURE Trust volunteer directory',url:'https://www.suretrustforruralyouth.com/volunteers',note:'Public organization directory.'}
 ]
};

// Career timeline supplied by Charan, September 2026.
window.PORTFOLIO.milestones = [
 {id:'intro',name:'Social media',date:'2021 · THE BEGINNING',role:'Social Media Manager',company:'Kangofied & client brands',landmark:'village',stage:0,work:['Managed social media for Kangofied, Rehman Mohammed, MrAndMrsPopcorn, and Kukudukoo.','Built experience managing brand presence and social media work across multiple clients.'],skills:['Social media management','Brand communication','Client coordination'],tools:[]},
 {id:'websites',name:'Web developer',date:'2021 – JUNE 2023',role:'Freelance Website Developer',company:'Independent client work',landmark:'office',stage:1,work:['Developed websites for MrAndMrsPopcorn, Srikara Hospital, Love My Tour, Rehman Online, Go International Careers, and GlobeHoppersTours.com.','Additional website work included Rudra AI Hub and Bcon Ad Labs; dates were not specified.'],skills:['Website development','Client delivery','Requirements gathering'],tools:[]},
 {id:'trainee',name:'Python / DSA',date:'MARCH – JULY 2023',role:'Python & DSA Trainee',company:'SURE Trust',landmark:'campus',stage:1,work:['Trained in Python and data structures and algorithms at SURE Trust.','Developed the programming foundations for later operations and automation work.'],skills:['Python','Data structures','Algorithms','Problem solving'],tools:['Python']},
 {id:'sure',name:'Automation',date:'2 YEARS · OPERATIONS & AUTOMATION',role:'Operations Manager & Automation Specialist',company:'SURE Trust',landmark:'campus',stage:1,work:['Managed operations and automated repetitive work.','Converted a workflow that took 5 hours into 5 minutes.'],result:'5 hours → 5 minutes',skills:['Operations management','Workflow automation','Process improvement','Python'],tools:['ChatGPT','Cursor']},
 {id:'business',name:'My agency',date:'FEBRUARY 2025 · A NEW CHAPTER',role:'Agency Founder & AI Automation Consultant',company:'Own automation agency · Aussies Property',landmark:'office',stage:2,work:['Started my own automation agency and grew into AI automation consulting.','Delivered freelance AI automation for Aussies Property, including follow-up automation, alongside other automation projects.'],skills:['AI consulting','Automation delivery','Agency building','Client discovery'],tools:['ChatGPT','Cursor'],expanded:true},
 {id:'healthcare',name:'Piorate',date:'THE NEXT CHAPTER · PIORATE VENTURES',role:'Founder · Healthcare Automation',company:'Piorate Ventures',landmark:'hospital',stage:2,work:['Srikara Hospitals was our first client. We audited workflows, found problems, and built systems around them.','Built a CRM connecting doctor and patient workflows.','Built marketing and lead-management automation for advertising workflows.','Built Linlekunda, an app connecting doctors and patients, designed to reduce hospital waiting.'],skills:['Workflow auditing','CRM development','Lead management','Marketing automation','App development'],tools:[],expanded:true},
 {id:'consulting',name:'AI consultant',date:'FEBRUARY – JULY 2026 · 6 MONTHS',role:'AI Consultant',company:'Bcon Ad Labs · Marketing company',landmark:'office',stage:2,work:['Automated pipelines across media and social media.','Worked on video generation, AI avatars, and automated website development.'],skills:['AI consulting','Media automation','Video generation','AI avatars','Website automation'],tools:[],expanded:true},
 {id:'commerce',name:'E-commerce',date:'JULY 2026 · 20-DAY EXPERIMENT',role:'E-commerce Founder',company:'My own single-product business',landmark:'travel',stage:2,work:['Ran my own e-commerce business using AI automation for 20 days.','Generated 20K in returns with one product.'],result:'20 days · 1 product · 20K returns',skills:['E-commerce operations','AI automation','Product experimentation'],tools:[],expanded:true},
 {id:'products',name:'AI Rakhi',date:'AUGUST 2026',role:'App Builder · AI Rakhi',company:'Independent product',landmark:'office',stage:2,work:['Built and launched AI Rakhi.','Earned 30K from the app.'],result:'30K earned',skills:['App development','AI product building','Product launch'],tools:[],expanded:true},
 {id:'health',name:'Health AI',date:'SEPTEMBER 2026 · CURRENTLY BUILDING',role:'AI Health Assistant Builder',company:'Phones · Desktops · Watches',landmark:'hospital',stage:2,work:['Currently building an AI health assistant for phones, desktops, and watches.','Bringing the next chapter of my automation journey into a cross-device product.'],skills:['AI assistants','Cross-device product design','App development'],tools:[],expanded:true}
];
window.PORTFOLIO.toolkit=['Claude Code','ChatGPT','Codex','n8n','Zapier','Obsidian','Hermes','Meta','Google Cloud','Vercel','Microsoft Azure','AWS','Netlify'];

// Role-specific detail stays separate from the shared, later-career tool inventory.
window.PORTFOLIO.toolGroups = {
 coding:{title:'AI-assisted development',names:'Claude Code · ChatGPT · Codex · Cursor',detail:'Coding assistants for implementation, iteration, and development support.'},
 workflows:{title:'Workflow orchestration',names:'n8n · Zapier',detail:'Connect services and coordinate repeatable, multi-step workflows.'},
 knowledge:{title:'Knowledge & agent workspace',names:'Obsidian · Hermes',detail:'Part of my wider working toolkit; individual project configurations are not listed.'},
 marketing:{title:'Marketing ecosystem',names:'Meta',detail:'The marketing platform in my broader automation toolkit.'},
 cloud:{title:'Cloud platforms',names:'Google Cloud · Microsoft Azure · AWS',detail:'Cloud services in my broader toolkit; hosting varies by project.'},
 shipping:{title:'Website & app deployment',names:'Vercel · Netlify',detail:'Deployment platforms in my broader website and application toolkit.'}
};
const checkpointToolDetails = [
 {note:'Social media management for four client brands. The original platform and scheduling-tool names for 2021 were not supplied.',groups:[]},
 {note:'Freelance website delivery from 2021 to June 2023. The original editors, frameworks, CMS, and hosting providers were not supplied.',groups:[]},
 {note:'Python training focused on data structures, algorithms, and problem solving.',confirmed:[{title:'Python',detail:'Programming practice, data structures, and algorithm exercises.'}],groups:[]},
 {note:'The start of my AI-assisted automation toolkit at SURE Trust.',confirmed:[{title:'ChatGPT',detail:'AI assistance during automation work.'},{title:'Cursor',detail:'AI-assisted coding during automation development.'}],groups:[]},
 {note:'Confirmed early tools: ChatGPT and Cursor. The categories below show my broader automation toolkit, not a verified stack for the Aussies Property engagement.',groups:['workflows','coding','knowledge']},
 {note:'Toolkit relevant to CRM, patient–doctor applications, and marketing workflows. Specific tools have not been attributed to individual Srikara or Linlekunda systems.',groups:['coding','workflows','marketing','cloud','shipping']},
 {note:'Toolkit relevant to media pipelines, AI avatars, video generation, and website automation. Specific video and avatar providers were not supplied.',groups:['coding','workflows','marketing','shipping']},
 {note:'Toolkit relevant to automated e-commerce operations. The store platform, advertising setup, and exact integrations were not supplied.',groups:['workflows','marketing','coding']},
 {note:'Toolkit relevant to building and launching an app. AI Rakhi’s exact framework, model provider, and deployment platform were not supplied.',groups:['coding','shipping','cloud']},
 {note:'Toolkit relevant to the health assistant now in development. The final phone, desktop, and watch implementation is still being built.',groups:['coding','workflows','knowledge','cloud']}
];
window.PORTFOLIO.milestones.forEach((milestone,i)=>milestone.toolDetail=checkpointToolDetails[i]);
