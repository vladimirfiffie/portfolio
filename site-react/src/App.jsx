"use client";

import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans antialiased">
      <Nav />
      
      <main>
        {/* Main Sections */}
        <Hero />
        <Projects />
        <About />

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 dark:text-white">
              Get in touch
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left Side: Contact Info/Links */}
              <ContactInfo />
              
              {/* Right Side: Placeholder for a Contact Form or Map */}
              <div className="bg-neutral-100 dark:bg-neutral-900 rounded-3xl p-8 h-full min-h-[300px] flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                <p className="text-neutral-500 dark:text-neutral-400 text-center">
                  Have a project in mind? <br />
                  <span className="font-semibold text-blue-500">Let&apos;s build something great together.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}