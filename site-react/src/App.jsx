import React from 'react'
import { Button, IconButton } from 'aceternity-ui'
import ContactForm from './components/ContactForm'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import ContactInfo from './components/ContactInfo'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />

        <section style={{padding: '32px'}}>
          <h2 style={{textAlign:'center',marginBottom:16}}>Get in touch</h2>
          <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
            <ContactInfo />
            <ContactForm />
          </div>
        </section>

        <Footer />

        <section style={{padding: '32px'}}>
          <h2>Buttons (Aceternity)</h2>
          <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <IconButton icon="download" aria-label="download" />
          </div>
        </section>

        <section style={{padding: '32px'}}>
          <h2 id="contact">Contact Form</h2>
          <ContactForm />
        </section>
      </main>
    </div>
  )
}
