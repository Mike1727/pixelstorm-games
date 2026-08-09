const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('is-open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    });
  });
}

const form = document.getElementById('contactForm');
if (form) {
  const success = document.getElementById('formSuccess');
  const rules = {
    name: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    projectType: (v) => v.trim().length > 0,
    message: (v) => v.trim().length >= 10,
  };
  const messages = {
    name: 'Введите имя (минимум 2 символа).',
    email: 'Введите корректный email.',
    projectType: 'Выберите тип проекта.',
    message: 'Расскажите чуть подробнее — минимум 10 символов.',
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      const errorEl = document.getElementById(`${name}Error`);
      const ok = rules[name](field.value);
      if (!ok) {
        valid = false;
        if (errorEl) errorEl.textContent = messages[name];
        field.setAttribute('aria-invalid', 'true');
      } else {
        if (errorEl) errorEl.textContent = '';
        field.removeAttribute('aria-invalid');
      }
    });

    if (!valid) return;

    form.querySelectorAll('input, select, textarea, button').forEach((el) => {
      el.disabled = true;
    });
    if (success) success.hidden = false;
    form.reset();
  });
}
