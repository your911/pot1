/* ============================================
   SHIVANSHU METHEPATIL — PORTFOLIO SCRIPTS
   ============================================ */

'use strict';

// ─── DOM Ready ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initHamburger();
  initScrollReveal();
  initBackToTop();
  initActiveNav();

  // Page-specific inits
  if (document.querySelector('.hero-typed'))  initTypingAnimation();
  if (document.querySelector('.contact-form')) initContactForm();
});

// ─── Theme (Dark / Light) ──────────────────────────────────────────────────
function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Toggle icon visibility manually for compatibility
  document.querySelectorAll('.icon-sun').forEach(el => {
    el.style.display = theme === 'dark' ? 'block' : 'none';
  });
  document.querySelectorAll('.icon-moon').forEach(el => {
    el.style.display = theme === 'dark' ? 'none' : 'block';
  });
}

// ─── Sticky Navbar ─────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handler = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

// ─── Hamburger / Mobile Menu ────────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── Active Nav Link ────────────────────────────────────────────────────────
function initActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── Typing Animation ────────────────────────────────────────────────────────
function initTypingAnimation() {
  const el = document.querySelector('.hero-typed');
  if (!el) return;

  const words = [
    'Data Analyst',
    'Web Developer',
    'Problem Solver',
    'Power BI Expert',
    'Dashboard Creator',
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isPaused) return;

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      isPaused = true;
      setTimeout(() => { isPaused = false; isDeleting = true; setTimeout(type, 80); }, 1800);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

// ─── Scroll Reveal ──────────────────────────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ─── Back To Top ─────────────────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled = true;

    // Simulate send (replace with real endpoint)
    await new Promise(resolve => setTimeout(resolve, 1200));

    const success = form.querySelector('.form-success');
    form.style.opacity = '0';
    form.style.transform = 'translateY(10px)';
    form.style.transition = 'all 0.3s';

    setTimeout(() => {
      form.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        success.innerHTML = `
          <div style="font-size:2.5rem;margin-bottom:12px">🎉</div>
          <div style="font-size:1.2rem;font-weight:700;color:var(--text-primary);margin-bottom:8px">Message Sent!</div>
          <div style="font-size:0.9rem;color:var(--text-secondary)">Thank you for reaching out. I'll get back to you soon.</div>
        `;
      }
    }, 300);
  });
}
