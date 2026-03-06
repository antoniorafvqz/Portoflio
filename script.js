document.addEventListener('DOMContentLoaded', function () {

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile nav if open
        navLinks.classList.remove('open');
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Navbar active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.exp-card, .proj-card, .aside-card, .pub-card, .skill-row');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });

});

// Mobile nav open styles (injected)
const style = document.createElement('style');
style.textContent = `
  .nav-links.open {
    display: flex !important;
    flex-direction: column;
    position: fixed;
    top: 60px; left: 0; right: 0;
    background: rgba(12,15,20,0.97);
    backdrop-filter: blur(14px);
    padding: 1.5rem 2rem 2rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    gap: 1.2rem;
    z-index: 199;
  }
  .nav-links a.active { color: #f0ece4; }
`;
document.head.appendChild(style);
