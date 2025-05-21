document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Setup dark mode toggle
  setupDarkModeToggle();
  
  // Setup mobile menu
  setupMobileMenu();
  
  // Skill bar animations
  animateSkills();
  
  // Smooth scrolling for navigation
  setupSmoothScrolling();
  
  // Header scroll effect
  setupHeaderScroll();
  
  // Contact form functionality
  setupContactForm();
  
  // Typing effect for hero section
  setupTypingEffect();
});

function initAnimations() {
  // Add data-aos attributes to elements for scroll animations
  document.querySelectorAll('.about-text').forEach(el => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', '100');
  });
  
  document.querySelectorAll('.about-image').forEach(el => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', '200');
  });
  
  document.querySelectorAll('.project-card').forEach((el, index) => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', (index * 100 + 100).toString());
  });
  
  document.querySelectorAll('.skill-category').forEach((el, index) => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', (index * 100 + 100).toString());
  });
  
  document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
    el.setAttribute('data-aos-delay', (index * 100 + 100).toString());
  });
  
  document.querySelectorAll('.certification-card').forEach((el, index) => {
    el.setAttribute('data-aos', 'zoom-in');
    el.setAttribute('data-aos-delay', (index * 50 + 100).toString());
  });
  
  document.querySelectorAll('.contact-item').forEach((el, index) => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', (index * 100 + 100).toString());
  });
  
  document.querySelector('.contact-form').setAttribute('data-aos', 'fade-up');
  document.querySelector('.contact-form').setAttribute('data-aos-delay', '300');
  
  // Initialize AOS library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
}

function setupDarkModeToggle() {
  const darkModeToggle = document.getElementById('darkMode');
  if (darkModeToggle) {
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }
}

function setupMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // Animate hamburger menu
      const spans = this.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
      
      if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          
          const spans = mobileMenuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }
}

function animateSkills() {
  const skillBars = document.querySelectorAll('.progress-bar div');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.setProperty('--progress-width', width);
    bar.style.width = '0';
  });
  
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillsSection.classList.add('skill-animate');
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
  }
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get header height for offset
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function setupHeaderScroll() {
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }
}

function setupContactForm() {
  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Handle form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const submitButton = contactForm.querySelector('.btn');
    
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      const nameInput = document.querySelector('input[placeholder="Your Name"]');
      const emailInput = document.querySelector('input[placeholder="Your Email"]');
      const subjectInput = document.querySelector('input[placeholder="Subject"]');
      const messageInput = document.querySelector('textarea[placeholder="Your Message"]');
      
      let isValid = true;
      
      // Simple validation
      if (!nameInput.value.trim()) {
        isValid = false;
        nameInput.style.borderColor = 'red';
      } else {
        nameInput.style.borderColor = '';
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        isValid = false;
        emailInput.style.borderColor = 'red';
      } else {
        emailInput.style.borderColor = '';
      }
      
      if (!subjectInput.value.trim()) {
        isValid = false;
        subjectInput.style.borderColor = 'red';
      } else {
        subjectInput.style.borderColor = '';
      }
      
      if (!messageInput.value.trim()) {
        isValid = false;
        messageInput.style.borderColor = 'red';
      } else {
        messageInput.style.borderColor = '';
      }
      
      if (isValid) {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.backgroundColor = '#4CAF50';
        successMessage.style.color = 'white';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '20px';
        successMessage.style.animation = 'fadeIn 0.5s ease-out';
        successMessage.textContent = 'Your message has been sent successfully! I will get back to you soon.';
        
        // Add success message after form
        contactForm.appendChild(successMessage);
        
        // Reset form fields
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.style.animation = 'fadeOut 0.5s ease-out';
          setTimeout(() => {
            contactForm.removeChild(successMessage);
          }, 500);
        }, 5000);
      }
    });
  }
}

function setupTypingEffect() {
  const heroText = document.querySelector('.hero-content p');
  if (heroText) {
    // Different phrases to type
    const phrases = [
      "Java Developer with expertise in Spring Boot",
      "Full-Stack Developer passionate about clean code",
      "Software Engineer specializing in Java solutions",
      "Backend Developer ready for new challenges"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseBeforeDelete = 1500;
    let pauseBeforeType = 500;
    
    heroText.textContent = '';
    
    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text
        heroText.textContent = currentPhrase.substring(0, charIndex);
        charIndex--;
        typingSpeed = deletingSpeed;
        
        if (charIndex < 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingSpeed = pauseBeforeType;
        }
      } else {
        // Typing text
        heroText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          typingSpeed = pauseBeforeDelete;
        }
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect when the hero section is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(type, 500); // Delay before typing starts
        observer.disconnect();
      }
    });
    
    observer.observe(document.querySelector('.hero'));
  }
}

function sendMessage() {
  const name = document.querySelector('input[placeholder="Your Name"]').value;
  const email = document.querySelector('input[placeholder="Your Email"]').value;
  const subject = document.querySelector('input[placeholder="Subject"]').value;
  const message = document.querySelector('textarea[placeholder="Your Message"]').value;
  const contactForm = document.querySelector('.contact-form');

  if (!name || !email || !subject || !message) {
    alert('Please fill out all fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const submitButton = contactForm.querySelector('.btn');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  // Prepare EmailJS parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: 'asvats374@gmail.com' // Optional: can be set in your template too
  };

  emailjs.send("service_wea3x9h", "template_5wpd1u8", templateParams)
    .then(function (response) {
      // Clear fields
      document.querySelector('input[placeholder="Your Name"]').value = '';
      document.querySelector('input[placeholder="Your Email"]').value = '';
      document.querySelector('input[placeholder="Subject"]').value = '';
      document.querySelector('textarea[placeholder="Your Message"]').value = '';

      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.style.backgroundColor = '#4CAF50';
      successMessage.style.color = 'white';
      successMessage.style.padding = '15px';
      successMessage.style.borderRadius = '5px';
      successMessage.style.marginTop = '20px';
      successMessage.style.animation = 'fadeIn 0.5s ease-out';
      successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! I will get back to you soon.';
      contactForm.appendChild(successMessage);

      submitButton.disabled = false;
      submitButton.textContent = originalText;

      setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
          contactForm.removeChild(successMessage);
        }, 500);
      }, 5000);
    }, function (error) {
      alert('Failed to send message. Please try again later.');
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      console.error("EmailJS Error:", error);
    });
}


// Particle background for hero section
function setupParticleBackground() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';
  
  // Insert canvas before the first child of hero
  hero.insertBefore(canvas, hero.firstChild);
  
  // Set canvas dimensions
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
  
  // Get canvas context
  const ctx = canvas.getContext('2d');
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  // Create particles array
  const particlesArray = [];
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
      
      // Connect particles with lines
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  });
  
  // Start animation
  animate();
}

// Call particle background setup after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupParticleBackground();
});