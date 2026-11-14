// Apply stored color-scheme before first paint
try {
  const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
  if (colorSchemeMeta) {
    colorSchemeMeta.content = localStorage.getItem('color-scheme') ?? 'light dark';
  }
} catch (_) {}

const FALLBACK_ICON_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' rx='6' fill='%231e293b'/%3E%3Ctext x='50%25' y='55%25' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%2394a3b8'%3E✦%3C/text%3E%3C/svg%3E";

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function initThemeToggle() {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const btn = document.getElementById('themeToggleBtn');
  if (!meta || !btn) return;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  btn.addEventListener('click', () => {
    const systemScheme = mq.matches ? 'dark' : 'light';
    let stored = null;
    try { stored = localStorage.getItem('color-scheme'); } catch (_) {}
    const currentScheme = (stored === 'dark' || stored === 'light') ? stored : systemScheme;
    const targetScheme = currentScheme === 'dark' ? 'light' : 'dark';

    if (targetScheme === systemScheme) {
      try { localStorage.removeItem('color-scheme'); } catch (_) {}
      meta.content = 'light dark';
    } else {
      try { localStorage.setItem('color-scheme', targetScheme); } catch (_) {}
      meta.content = targetScheme;
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'color-scheme') {
      meta.content = (e.newValue === 'dark' || e.newValue === 'light') ? e.newValue : 'light dark';
    }
  });
}

function initBackToTop(onScroll) {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;
  const updateVisibility = typeof onScroll === 'function'
    ? onScroll
    : () => {
        if (window.scrollY > 300) {
          btn.classList.remove('hidden');
          btn.classList.add('inline-flex');
        } else {
          btn.classList.add('hidden');
          btn.classList.remove('inline-flex');
        }
      };
  window.addEventListener('scroll', updateVisibility, { passive: true });
  btn.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  updateVisibility();
}
