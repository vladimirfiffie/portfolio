import React from 'react'

const SKILL_GROUPS = [
  { title: 'Frontend', items: ['HTML5','CSS3','JavaScript','React'] },
  { title: 'Design', items: ['Figma','Photoshop'] }
]

export default function Skills(){
  return (
    <div style={{marginTop:20}}>
      <h3 className="skills-title">Skills & Tools</h3>
      <div className="skills-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12}}>
        {SKILL_GROUPS.map(g => (
          <div key={g.title} className="skill-group">
            <h4 className="skill-group-title">{g.title}</h4>
            <div className="skill-items" style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {g.items.map(s => (
                <div key={s} className="skill-item" style={{display:'flex',alignItems:'center',gap:8}}>
                  <span className="skill-name">{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
