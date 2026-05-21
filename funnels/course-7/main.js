// Main JavaScript for Landing Page
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initTypewriter();
    initParticles();
    initTestimonialSlider();
    initCurriculumAccordion();
    initScrollAnimations();
    initCounterAnimations();
    initSmoothScrolling();
    
    // Typewriter effect for hero section
    function initTypewriter() {
        const typed = new Typed('#typed-text', {
            strings: [
                'Learn the exact 12-step system that\'s helped 2,847+ young adults become published authors.',
                'Transform your pain into purpose, your testimony into a tool that changes lives.',
                'From blank page to published book in 30 days or less - even if you hate writing.'
            ],
            typeSpeed: 30,
            backSpeed: 15,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Particle background using p5.js
    function initParticles() {
        new p5((p) => {
            let particles = [];
            
            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('hero-canvas');
                canvas.id('p5-canvas');
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6),
                        alpha: p.random(0.1, 0.3)
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(13, 148, 136, particle.alpha * 255);
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                });
                
                // Draw connections
                particles.forEach((particle, i) => {
                    particles.slice(i + 1).forEach(other => {
                        const distance = p.dist(particle.x, particle.y, other.x, other.y);
                        if (distance < 100) {
                            p.stroke(13, 148, 136, (1 - distance / 100) * 50);
                            p.strokeWeight(1);
                            p.line(particle.x, particle.y, other.x, other.y);
                        }
                    });
                });
            };
            
            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }

    // Testimonial slider
    function initTestimonialSlider() {
        const splide = new Splide('#testimonial-slider', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: true,
            pagination: true,
            gap: '2rem',
            breakpoints: {
                768: {
                    perPage: 1,
                }
            }
        });
        splide.mount();
    }

    // Curriculum accordion
    function initCurriculumAccordion() {
        const toggles = document.querySelectorAll('.curriculum-toggle');
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const arrow = toggle.querySelector('svg');
                
                // Close all other accordions
                toggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherTargetId = otherToggle.getAttribute('data-target');
                        const otherContent = document.getElementById(otherTargetId);
                        const otherArrow = otherToggle.querySelector('svg');
                        
                        otherContent.classList.add('hidden');
                        otherArrow.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current accordion
                if (content.classList.contains('hidden')) {
                    content.classList.remove('hidden');
                    arrow.style.transform = 'rotate(180deg)';
                    
                    // Animate content in
                    anime({
                        targets: content,
                        opacity: [0, 1],
                        translateY: [-20, 0],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                } else {
                    content.classList.add('hidden');
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal-element').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter animations
    function initCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    
                    anime({
                        targets: { count: 0 },
                        count: target,
                        duration: 2000,
                        easing: 'easeOutQuad',
                        update: function(anim) {
                            const value = Math.floor(anim.animatables[0].target.count);
                            counter.textContent = value.toLocaleString();
                        }
                    });
                    
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Add hover effects to CTA buttons
    document.querySelectorAll('.hover-lift').forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Add click tracking for CTA buttons
    document.querySelectorAll('button[onclick*="checkout"]').forEach(button => {
        button.addEventListener('click', (e) => {
            // Add loading state
            const originalText = button.textContent;
            button.textContent = 'Redirecting...';
            button.disabled = true;
            
            // Simulate loading time
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 500);
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-mobile-menu-content]');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Add scroll effect to navigation
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
        
        lastScrollY = window.scrollY;
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add exit-intent popup (optional)
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            // Could show a last-chance offer here
            console.log('Exit intent detected - could show popup');
        }
    });

    // Track time on page for engagement
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        console.log(`User spent ${timeOnPage} seconds on page`);
        // Could send this data to analytics
    });

    console.log('Landing page initialized successfully!');
});