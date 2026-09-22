// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<span>☀️</span><span>🌙</span>';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<span>🌙</span><span>☀️</span>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<span>☀️</span><span>🌙</span>';
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to elements
const animateElements = document.querySelectorAll('.card, .timeline-item, .skill-category, .contact-links a');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Animate education items
const educationItems = document.querySelectorAll('.education-item');

const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            eduObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

educationItems.forEach(item => {
    eduObserver.observe(item);
});

// Typing effect
const typingTexts = [
    "Technical Support Specialist",
    "Cybersecurity Student",
    "Problem Solver",
    "Tech Enthusiast"
];
const typingElement = document.getElementById('typingText');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = typingTexts[textIndex];
    
    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, 100);
    } else {
        typingElement.textContent = currentText.substring(0, charIndex);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(typeEffect, 500);
            return;
        }
        setTimeout(typeEffect, 50);
    }
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Counter animation for hero stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}