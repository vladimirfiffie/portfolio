import React, {useState} from 'react'
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from '@/components/ui/resizable-navbar'

const LINKS = [
  { name: 'Home', link: '#home' },
  { name: 'Projects', link: '#projects' },
  { name: 'About', link: '#about' },
  { name: 'Contact', link: '#contact' },
]

export default function Nav(){
  const [open, setOpen] = useState(false)

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />

        <NavItems items={LINKS} onItemClick={() => setOpen(false)} />

        <div className="ml-auto">
          <NavbarButton href="assets/Resume 5⁄10⁄25.docx" className="rotating-border" variant="primary">Resume</NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={open} onClick={() => setOpen(v => !v)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {LINKS.map(l => (
              <a key={l.link} href={l.link} onClick={() => setOpen(false)} className="px-2 py-2 rounded">{l.name}</a>
            ))}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
