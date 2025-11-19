// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===================================
// Particles.js Configuration
// ===================================
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6366f1'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Project Filtering
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
                // Re-trigger animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// Typing Effect for Hero Section
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        typeWriter(heroTagline, originalText, 30);
    }
});

// ===================================
// Skill Progress Animation
// ===================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

animateSkillBars();

// ===================================
// Contact Form Validation & Submission
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.classList.remove('show');
        });
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let isValid = true;
        
        if (name === '' || name.length < 2) {
            showError('nameError', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (subject === '' || subject.length < 3) {
            showError('subjectError', 'Please enter a subject (at least 3 characters)');
            isValid = false;
        }
        
        if (message === '' || message.length < 10) {
            showError('messageError', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showMessage('success', 'Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        } catch (error) {
            // Error
            showMessage('error', 'Oops! Something went wrong. Please try again or email me directly.');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function showMessage(type, message) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message show ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// Download Resume Functionality
// ===================================
const downloadResumeBtn = document.getElementById('downloadResume');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show alert (replace with actual resume download link)
        alert('Resume download functionality will be implemented with your actual resume file. Please add your resume PDF link here.');
        
        // Uncomment and update with actual resume link:
        // window.open('path/to/your/resume.pdf', '_blank');
    });
}

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.querySelector('.footer-text p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// ===================================
// Cursor Animation (Optional Enhancement)
// ===================================
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        width: 8px;
        height: 8px;
        background: #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        display: none;
    `;
    document.body.appendChild(cursorDot);
    
    // Only show on desktop devices
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = (e.clientX + 6) + 'px';
            cursorDot.style.top = (e.clientY + 6) + 'px';
        });
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .trait-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#8b5cf6';
                cursorDot.style.background = '#8b5cf6';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#6366f1';
                cursorDot.style.background = '#6366f1';
            });
        });
    }
}

// Initialize cursor effect
createCursorEffect();

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    // Add fade-in animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to elements that need fade-in animation
document.querySelectorAll('.project-card, .skill-category, .trait-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const avatar = document.querySelector('.avatar-container');
        if (avatar) {
            avatar.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ===================================
// Count Up Animation for Stats (Optional)
// ===================================
function countUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===================================
// Theme Toggle (Optional - Future Enhancement)
// ===================================
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border: none;
        border-radius: 12px;
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    // Note: Theme toggle functionality can be implemented later
    // This is a placeholder for future enhancement
}

// ===================================
// Console Message
// ===================================
console.log('%c👨‍💻 Abdullah Sikandar Portfolio', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Full Stack Developer | Python | AI/ML Specialist', 'color: #8b5cf6; font-size: 16px;');
console.log('%c📧 abdullahkhokhar5146@gmail.com', 'color: #06b6d4; font-size: 14px;');
console.log('%c🔗 https://github.com/Abdullah5146', 'color: #06b6d4; font-size: 14px;');

// ===================================
// Easter Egg - Konami Code
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('%c🎉 Easter Egg Found! You discovered the Konami Code!', 'color: #ec4899; font-size: 20px; font-weight: bold;');
    }
});

// ===================================
// Performance Optimization
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// End of main.js
// ===================================
