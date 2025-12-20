import React from 'react'
import Carousel from '@/components/ui/carousel'

const SAMPLE_PROJECTS = [
  { title: 'Project One', button: 'View', src: '/images/project-1.jpg' },
  { title: 'Project Two', button: 'View', src: '/images/project-2.jpg' },
  { title: 'Project Three', button: 'View', src: '/images/project-3.jpg' },
]

export default function Projects(){
  return (
    <section id="projects" className="projects-section" aria-label="Featured projects">
      <h2 style={{textAlign:'center',marginBottom:16}}>Featured Projects</h2>
      <div className="projects-carousel">
        <Carousel slides={SAMPLE_PROJECTS} />
      </div>
    </section>
  )
}
