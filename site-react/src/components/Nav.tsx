import { useState } from 'react';
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
} from '@/components/ui/resizable-navbar';

interface NavLink {
  name: string;
  link: string;
}

const LINKS: NavLink[] = [
  { name: 'Home', link: '#home' },
  { name: 'Projects', link: '#projects' },
  { name: 'About', link: '#about' },
  { name: 'Contact', link: '#contact' },
];

export default function Nav(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />

        <NavItems items={LINKS} onItemClick={() => setOpen(false)} />

        <div className="ml-auto">
          <NavbarButton 
            href="assets/Resume_Vladimir.pdf" 
            className="rotating-border" 
            variant="primary"
          >
            Resume
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-2 p-4">
            {LINKS.map((l: NavLink) => (
              <a 
                key={l.link} 
                href={l.link} 
                onClick={() => setOpen(false)} 
                className="px-2 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {l.name}
              </a>
            ))}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}