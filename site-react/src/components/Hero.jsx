import React from 'react'
import HeroSectionDemo1 from "@/components/ui/hero-section-demo-1"

function HeroParallax({ products }) {
  return (
    <HeroSectionDemo1
      title="Crafting digital experiences with creativity and precision"
      description="I'm a web developer specializing in building engaging, user-friendly websites and applications that leave a lasting impression."
      products={products}
    />
  )
};

export default HeroParallax;