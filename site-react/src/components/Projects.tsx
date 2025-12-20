import Carousel from '@/components/ui/carousel'

const PROJECTS = [
  {
    title: "Pao'er Ship",
    year: "2024",
    type: "Game Development",
    description:
      "A Raspberry Pi-based Battleship game featuring custom animations and interactive gameplay. Built with Pygame for smooth performance on embedded systems.",
    tags: ["Pygame", "Python", "Raspberry Pi"],
    src: "/images/paoer-ship.jpg",
    github: "https://github.com/ponderrr/paoer_ship",
    button: "View on GitHub",
  },
  {
    title: "Lion's Den Cinema",
    year: "2024",
    type: "Web Application",
    description:
      "A comprehensive cinema booking platform with a dynamic UI and seamless animations. Built with React and TypeScript for type-safe, scalable development.",
    tags: ["React", "TypeScript", "Figma"],
    src: "/images/lion-den-cinema.png",
    github: null, // add link later if needed
    button: "View Project",
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="projects-section"
      aria-label="Featured projects"
    >
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>
        Featured Projects
      </h2>

      <Carousel slides={PROJECTS} />
    </section>
  )
}
