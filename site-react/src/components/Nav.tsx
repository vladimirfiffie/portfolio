"use client";
import { JSX, useState } from 'react';
import { Menu, MenuItem, HoveredLink } from './ui/navbar-menu';

export default function Nav(): JSX.Element {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fixed top-4 w-full flex justify-center z-50">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4">
            <HoveredLink href="#home">Home</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Projects">
          <div className="flex flex-col space-y-4">
            <HoveredLink href="#projects">View Projects</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4">
            <HoveredLink href="#about">About Me</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contact">
          <div className="flex flex-col space-y-4">
            <HoveredLink href="#contact">Get in Touch</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Resume">
          <div className="flex flex-col space-y-4">
            <HoveredLink href="assets/Resume_Vladimir.pdf">Download Resume</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}