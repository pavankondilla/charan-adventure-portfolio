window.buildSections = function(data) {
 const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const chips=items=>items.map(s=>`<span>${e(s)}</span>`).join('');
 const toolDetails=m=>`<h3>Tools & working setup</h3><p class="tool-note">${e(m.toolDetail.note)}</p><div class="tool-groups">${(m.toolDetail.confirmed||[]).map(t=>`<article class="tool-group"><h4>${e(t.title)}</h4><p>${e(t.detail)}</p></article>`).join('')}${m.toolDetail.groups.map(key=>{const t=data.toolGroups[key];return `<article class="tool-group"><h4>${e(t.title)}</h4><p>${e(t.names)}</p><small>${e(t.detail)}</small></article>`;}).join('')}</div>`;
 return data.milestones.map((m,i)=>({ ...m, place:m.company, sign:m.role, body:`
 <p class="eyebrow">CHECKPOINT ${String(i+1).padStart(2,'0')} / ${data.milestones.length} · ${e(m.date)}</p>
 <h2 id="title-${m.id}">${e(m.role)}</h2><p class="lead">${e(m.company)}</p>
 ${m.result?`<div class="result-banner">${e(m.result)}</div>`:''}
 <h3>What I did</h3><ul class="work-list">${m.work.map(w=>`<li>${e(w)}</li>`).join('')}</ul>
 <div class="skill-heading"><h3>Skills gained</h3><span>${m.skills.length} skills at this checkpoint</span></div><div class="pills">${chips(m.skills)}</div>
 ${toolDetails(m)}
 ${m.expanded?`<details class="full-toolkit"><summary>View my full automation toolkit</summary><p class="tool-note">Used across my later work; exact usage varies by project.</p><div class="pills tools">${chips(data.toolkit)}</div></details>`:''}
 ${i===data.milestones.length-1?`<a class="button" href="${data.links.linkedin}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>`:''}
 `}));
};
