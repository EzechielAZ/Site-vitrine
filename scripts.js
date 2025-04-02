import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    setupMobileNav();
    
    // Testimonial slider
    setupTestimonialSlider();
    
    // Newsletter form
    setupNewsletterForm();
    
    // Chat widget
    setupChatWidget();
    
    // Contact form
    setupContactForm();
    
    // FAQ toggle
    setupFaqToggle();
    
    // Animations
    setupAnimations();
});

function setupMobileNav() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.querySelector('body');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle nav
            nav.classList.toggle('active');
            
            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger animation
            burger.classList.toggle('toggle');
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                    body.style.overflow = 'auto';
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            });
        });
    }
}

function setupTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // Auto-advance every 5 seconds
        let slideTimer;
        
        // Show the first slide by default
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        // Function to show a specific slide
        function showSlide(n) {
            // Clear any existing timer
            clearInterval(slideTimer);
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Update current slide index
            currentSlide = (n + slides.length) % slides.length;
            
            // Add active class to current slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Restart the timer
            slideTimer = setInterval(() => {
                showSlide(currentSlide + 1);
            }, slideInterval);
        }
        
        // Event listeners for prev/next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }
        
        // Event listeners for dot indicators
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Start the automatic slide timer
        slideTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, slideInterval);
    }
}

function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterConfirmation = document.querySelector('.newsletter-confirmation');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            newsletterForm.style.display = 'none';
            newsletterConfirmation.style.display = 'flex';
        });
    }
}

function setupChatWidget() {
    const chatButton = document.getElementById('chat-button');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const userMessageInput = document.getElementById('user-message');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatButton && chatWidget) {
        // Toggle chat widget
        chatButton.addEventListener('click', () => {
            chatWidget.style.display = 'flex';
            chatButton.style.display = 'none';
        });
        
        // Close chat widget
        closeChat.addEventListener('click', () => {
            chatWidget.style.display = 'none';
            chatButton.style.display = 'flex';
        });
        
        // Send message
        function sendUserMessage() {
            const messageText = userMessageInput.value.trim();
            
            if (messageText) {
                // Add user message to chat
                const userMessage = document.createElement('div');
                userMessage.classList.add('message', 'user');
                userMessage.innerHTML = `<p>${messageText}</p>`;
                chatMessages.appendChild(userMessage);
                
                // Clear input field
                userMessageInput.value = '';
                
                // Auto-scroll to the bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate bot response after a short delay
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.classList.add('message', 'bot');
                    botMessage.innerHTML = `<p>Merci pour votre message! Un membre de notre équipe vous contactera bientôt. En attendant, n'hésitez pas à consulter notre page de services.</p>`;
                    chatMessages.appendChild(botMessage);
                    
                    // Auto-scroll to the bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        sendMessage.addEventListener('click', sendUserMessage);
        
        userMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate the captcha (simple example, would need more security in production)
            const captchaValue = document.getElementById('captcha').value.trim().toUpperCase();
            if (captchaValue !== 'C6R9') {
                alert('Code de vérification incorrect. Veuillez réessayer.');
                return;
            }
            
            // Simulate form submission
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Scroll to form success message
            formSuccess.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function setupFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

function setupAnimations() {
    // Animate elements as they come into view
    const animElements = document.querySelectorAll('.service-card, .value-card, .team-member, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animElements.forEach(element => {
        observer.observe(element);
    });
    
    // GSAP animations for hero section
    if (document.querySelector('.hero-content')) {
        gsap.from('.hero-content h1', { 
            opacity: 0, 
            y: 50, 
            duration: 1, 
            ease: 'power3.out' 
        });
        
        gsap.from('.hero-content p', { 
            opacity: 0, 
            y: 30, 
            duration: 1, 
            delay: 0.3, 
            ease: 'power3.out' 
        });
        
        gsap.from('.hero-content .cta-button', { 
            opacity: 0, 
            y: 30, 
            duration: 1, 
            delay: 0.6, 
            ease: 'power3.out' 
        });
        
        gsap.from('.hero-illustration', { 
            opacity: 0, 
            scale: 0.8, 
            duration: 1.2, 
            delay: 0.3, 
            ease: 'back.out(1.7)' 
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = `translateY(-${header.offsetHeight}px)`;
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        if (scrollTop === 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

