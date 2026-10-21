/* =============================================================
   Website Biodata Diri — Sri Rahayuni
   JavaScript vanilla, tanpa dependensi eksternal.
   ============================================================= */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 1. Tema terang / gelap ---------- */
  const themeToggle = $('#themeToggle');
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('biodata-theme', theme); } catch (e) { /* ignore */ }
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#16161c' : '#2f2f38');
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('biodata-theme'); } catch (e) { /* ignore */ }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  /* ---------- 2. Navigasi mobile ---------- */
  const menuToggle = $('#menuToggle');
  const nav = $('#mainNav');

  function closeNav() {
    document.body.classList.remove('nav-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const open = document.body.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) closeNav();
    });
  }

  document.addEventListener('click', function (e) {
    if (!document.body.classList.contains('nav-open')) return;
    if (e.target.closest('.nav') || e.target.closest('.menu-toggle')) return;
    closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- 3. Header lengket + progres scroll ---------- */
  const header = $('#siteHeader');
  const progress = $('#scrollProgress');
  const toTop = $('#toTop');

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 420);

    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 4. Scroll spy (menu aktif) ---------- */
  const navLinks = $$('.nav-link');
  const sections = navLinks
    .map(function (link) {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 5. Animasi muncul + bar keahlian ---------- */
  const revealEls = $$('.reveal');
  const bars = $$('.bar i');

  function fillBars() {
    bars.forEach(function (bar) { bar.classList.add('is-filled'); });
  }

  if ('IntersectionObserver' in window) {
    const revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revObs.observe(el); });

    const skillCard = $('.skill-card');
    if (skillCard) {
      const barObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { fillBars(); barObs.disconnect(); }
        });
      }, { threshold: 0.2 });
      barObs.observe(skillCard);
    }
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    fillBars();
  }

  /* Pengaman: pastikan semua elemen tetap tampil (mis. saat mencetak) */
  setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    fillBars();
  }, 1800);

  /* ---------- 6. Cetak / Simpan sebagai PDF ---------- */
  $$('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.print();
    });
  });

  /* ---------- 7. Salin nomor telepon ---------- */
  const copyBtn = $('#copyPhone');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const value = copyBtn.getAttribute('data-copy') || '';
      const label = $('#copyLabel');
      const done = function () {
        if (!label) return;
        const original = 'Klik untuk menyalin nomor telepon';
        label.textContent = 'Nomor tersalin: ' + value;
        setTimeout(function () { label.textContent = original; }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (err) { /* ignore */ }
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------- 8. Formulir kontak -> email ---------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const nama  = (data.get('nama') || '').trim();
      const email = (data.get('email') || '').trim();
      const pesan = (data.get('pesan') || '').trim();

      const subject = 'Halo Sri Rahayuni — ' + nama;
      const body =
        'Nama: ' + nama + '\n' +
        'Email: ' + email + '\n\n' +
        pesan + '\n\n' +
        '--- Dikirim dari website biodata ---';

      window.location.href =
        'mailto:srahayuni888@gmail.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- 9. Tahun footer ---------- */
  const yearEl = $('#tahun');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
