// Utilities
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Dynamic year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Mobile nav toggle
const navToggle = $('.nav-toggle');
const nav = $('#nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  // Close on link click (mobile)
  $$('.nav__list a', nav).forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Theme toggle (persisted)
const root = document.documentElement;
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  if (theme === 'light') root.classList.add('light');
  else root.classList.remove('light');
}

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  return mq.matches ? 'light' : 'dark';
}

applyTheme(getPreferredTheme());

const themeToggle = $('#themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.classList.contains('light') ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    themeToggle.textContent = next === 'light' ? '🌞' : '🌙';
  });
  // Initial icon
  themeToggle.textContent = root.classList.contains('light') ? '🌞' : '🌙';
}

// Project filters
const filterButtons = $$('.filters .chip');
const projects = $$('.project-card');

function setActiveFilter(btn) {
  filterButtons.forEach(b => b.classList.toggle('is-active', b === btn));
}

function filterProjects(tag) {
  projects.forEach(card => {
    const tags = (card.getAttribute('data-tags') || '').split(' ');
    const matches = tag === 'all' || tags.includes(tag);
    card.style.display = matches ? '' : 'none';
    card.setAttribute('aria-hidden', matches ? 'false' : 'true');
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveFilter(btn);
    filterProjects(btn.getAttribute('data-filter'));
  });
});

// Contact form validation (basic client-side)
const form = $('#contactForm');
if (form) {
  const name = $('#name');
  const email = $('#email');
  const message = $('#message');

  const nameError = $('#nameError');
  const emailError = $('#emailError');
  const messageError = $('#messageError');
  const status = $('#formStatus');

  function validate() {
    let ok = true;

    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      ok = false;
    } else nameError.textContent = '';

    const emailVal = email.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailValid) {
      emailError.textContent = 'Please enter a valid email address.';
      ok = false;
    } else emailError.textContent = '';

    if (message.value.trim().length < 10) {
      messageError.textContent = 'Please provide at least 10 characters.';
      ok = false;
    } else messageError.textContent = '';

    return ok;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    if (!validate()) return;

    // Fake submit (replace with your endpoint)
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      await new Promise(res => setTimeout(res, 800));
      status.textContent = 'Thanks! Your message has been sent.';
      form.reset();
    } catch (err) {
      status.textContent = 'Something went wrong. Please try again later.';
      status.style.color = 'var(--danger)';
    }
  });
}