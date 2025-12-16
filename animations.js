// Page Animations with GSAP
if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
}

// Hero Animations
const initHeroAnimations = () => {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.8
    })
    .from('.title-line', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1
    }, '-=0.5')
    .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.5')
    .from('.hero-actions .btn', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    }, '-=0.4')
    .from('.stat-item', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, '-=0.2');
};

// Scroll Animations
const initScrollAnimations = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Project Cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // About Section
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Skill Groups
    gsap.utils.toArray('.skill-group').forEach((group, index) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: group,
                start: 'top bottom-=50',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    });

    // Skill Items
    gsap.utils.toArray('.skill-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=50',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.05,
            ease: 'back.out(1.7)'
        });
    });

    // Visual Card
    gsap.from('.visual-card', {
        scrollTrigger: {
            trigger: '.visual-card',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Code Lines Animation
    gsap.utils.toArray('.code-line').forEach((line, index) => {
        gsap.from(line, {
            scrollTrigger: {
                trigger: '.code-snippet',
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            x: -30,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Contact Items
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=50',
                toggleActions: 'play none none reverse'
            },
            x: -40,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Contact Form
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
};

// Parallax Effect for Hero Orbs
const initParallaxOrbs = () => {
    const orbs = document.querySelectorAll('.gradient-orb');
    if (!orbs.length) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const animateOrbs = () => {
        orbs.forEach((orb, index) => {
            const depth = (index + 1) * 40;
            const parallaxStrength = (index + 1) * 0.4;
            const x = mouseX * 40 * parallaxStrength;
            const y = mouseY * 40 * parallaxStrength;

            gsap.to(orb, {
                x,
                y,
                z: depth,
                scale: 1 + (index * 0.05),
                rotateY: mouseX * 10,
                rotateX: -mouseY * 10,
                duration: 2,
                ease: 'power1.out',
                overwrite: true
            });
        });
        requestAnimationFrame(animateOrbs);
    };
    animateOrbs();
};

// Number Counter Animation
const initNumberCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const isNumber = !isNaN(parseFloat(text));
        
        if (isNumber && text.includes('+')) {
            const target = parseInt(text);
            let current = 0;
            const increment = target / 30;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target + '+';
                                clearInterval(counter);
                            } else {
                                stat.textContent = Math.floor(current) + '+';
                            }
                        }, 30);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        }
    });
};

const initNavbarScroll = () => {
    const nav = document.querySelector('.nav');
    if (!nav || typeof gsap === 'undefined') return;

    let isScrolled = false;
    let ticking = false;

    const EXPANDED_WIDTH = 1200;
    const COLLAPSED_WIDTH = 880;

    const updateNavbar = () => {
        const shouldCondense = window.scrollY > 50;

        if (shouldCondense !== isScrolled) {
            isScrolled = shouldCondense;
            nav.classList.toggle('scrolled', shouldCondense);

            gsap.to(nav, {
                maxWidth: shouldCondense ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
                duration: 1.2,
                ease: 'elastic.out(1, 0.3)',
                overwrite: true
            });
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
};

// Typewriter Text Animation
const initTextInterchange = () => {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;

    const words = ['playful interfaces', 'cinematic web experiences', 'pixel-perfect UIs', 'thoughtful animations'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            typewriterText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    };

    // Start typing immediately
    setTimeout(() => {
        type();
    }, 1000);
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollAnimations();
    initParallaxOrbs();
    initNumberCounter();
    initNavbarScroll();
    initTextInterchange();
});
