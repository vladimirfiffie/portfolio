// Initialize GSAP
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Theme Toggle
const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
    
    document.body.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Cute bounce animation
        if (typeof gsap !== 'undefined') {
            gsap.to(themeToggle, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
        }
    });
};


// Mobile Navigation
const initMobileNav = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
};

// Active Navigation Link
const initActiveNav = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target && typeof gsap !== 'undefined') {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: target,
                        offsetY: 100
                    },
                    ease: 'power3.inOut'
                });
            } else if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

// Featured Projects Slider
const initProjectSlider = () => {
    const slider = document.querySelector('.projects-swiper');
    if (!slider || typeof Swiper === 'undefined') return;

    // eslint-disable-next-line no-new
    new Swiper(slider, {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,
        loop: true,
        grabCursor: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 1.2,
            slideShadows: false,
            scale: 0.95
        },
        pagination: {
            el: slider.querySelector('.swiper-pagination'),
            clickable: true
        },
        navigation: {
            nextEl: slider.querySelector('.swiper-button-next'),
            prevEl: slider.querySelector('.swiper-button-prev')
        },
        breakpoints: {
            768: {
                spaceBetween: 28,
                coverflowEffect: {
                    depth: 160,
                    scale: 0.96
                }
            },
            1024: {
                spaceBetween: 32,
                coverflowEffect: {
                    depth: 200,
                    scale: 1
                }
            }
        }
    });
};

// Ripple Effect for Submit Button
const initRippleEffect = () => {
    const submitBtn = document.querySelector('.btn-submit');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('btn-ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
};

// Form Submission with EmailJS
const initForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        // Initialize EmailJS with your public key
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('YOUR_PUBLIC_KEY');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalHTML = submitBtn.innerHTML;
        const originalWidth = submitBtn.offsetWidth;

        submitBtn.style.width = originalWidth + 'px';
        submitBtn.innerHTML = '<span class="iconify" data-icon="mdi:loading"></span> Sending...';
        submitBtn.disabled = true;

        // Rotate loading icon
        const icon = submitBtn.querySelector('.iconify');
        if (icon && typeof gsap !== 'undefined') {
            gsap.to(icon, {
                rotate: 360,
                duration: 1,
                ease: 'none',
                repeat: -1
            });
        }

        try {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS library not loaded');
            }

            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' with your actual IDs
            const result = await emailjs.sendForm(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                form
            );

            // Success animation
            if (typeof gsap !== 'undefined') {
                gsap.to(form, {
                    scale: 0.98,
                    duration: 0.2,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(form, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'back.out(1.7)'
                        });
                    }
                });
            }

            submitBtn.innerHTML = '<span class="iconify" data-icon="mdi:check"></span> Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.style.width = '';
                submitBtn.disabled = false;
            }, 3000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            
            submitBtn.innerHTML = '<span class="iconify" data-icon="mdi:close"></span> Error';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.style.width = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
};

// Back to Top Button
const initBackToTop = () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: 0
                },
                ease: 'power3.inOut'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    // initCursorFollower(); - Disabled
    initMobileNav();
    initActiveNav();
    initSmoothScroll();
    // initProjectSlider(); - replaced with CSS scroll-snap layout
    initForm();
    initBackToTop();
    initRippleEffect();
});

// Refresh ScrollTrigger on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
});
