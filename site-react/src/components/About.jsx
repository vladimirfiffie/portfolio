import React from 'react'
import Skills from './Skills'
import { HoverEffect as CardHoverEffect } from '@/components/ui/card-hover-effect'

export default function About() {
  const projectItems = [
    {
      title: 'Portfolio Website',
      description: 'React + Tailwind + ShadCN components',
      link: '#',
    },
    {
      title: 'Task Manager App',
      description: 'Full-stack project with Node.js & React',
      link: '#',
    },
    {
      title: 'E-commerce Demo',
      description: 'React & Tailwind responsive layout',
      link: '#',
    },
  ]

  return (
    <section id="about" className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About text and skills */}
        <div>
          <span className="text-sm font-semibold uppercase text-blue-500">About</span>
          <h2 className="text-3xl font-bold mb-4">A Bit About Me</h2>

          <div className="space-y-4 text-gray-700 mb-6">
            <p>
              I'm an Information Technology graduate with a passion for creating engaging digital
              experiences. I specialize in combining creative coding with thoughtful design to build
              applications that are both functional and beautiful.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, experimenting with design
              patterns, and always looking for ways to push the boundaries of what's possible on the web.
            </p>
          </div>

          <Skills />
        </div>

        {/* Visual card with projects / hover effect */}
        <div>
          <CardHoverEffect items={projectItems} className="p-4 rounded-xl shadow-md bg-white" />

          <a
            href="assets/Resume 5⁄10⁄25.docx"
            download
            className="mt-6 inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-md hover:rotate-3 transition-transform duration-300"
          >
            Download Résumé
          </a>
        </div>
      </div>
    </section>
  )
}
