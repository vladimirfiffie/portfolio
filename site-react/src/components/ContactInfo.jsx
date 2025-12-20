import React from 'react'

const CONTACTS = [
  { href: 'mailto:vladimir.fiffiejr@proton.me', label: 'Email', value: 'vladimir.fiffiejr@proton.me' },
  { href: 'https://github.com/vladimirfiffie', label: 'GitHub', value: '@vladimirfiffie' },
  { href: 'https://www.linkedin.com/in/vladimir-fiffie', label: 'LinkedIn', value: 'vladimir-fiffie' },
]

export default function ContactInfo(){
  return (
    <div className="contact-info" style={{display:'grid',gap:12}}>
      {CONTACTS.map(c => (
        <a key={c.href} className="contact-btn" href={c.href} target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:12,padding:12,borderRadius:8,background:'#f3f4f6'}}>
          <div className="contact-btn-content">
            <div className="contact-btn-label" style={{fontWeight:700}}>{c.label}</div>
            <div className="contact-btn-value" style={{fontSize:12,color:'#374151'}}>{c.value}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
