/* ═══════════════════════════════════════════════
   HASSAN RAZA · PORTFOLIO
   DESIGN SYSTEM : CRIMSON VELVET
   script.js — All Interactions & Animations
   ═══════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────
   1. PAGE LOAD CURTAIN
───────────────────────────────────── */
(function initCurtain() {
  const curtain = document.getElementById('curtain');
  if (!curtain) return;
  window.addEventListener('load', () => {
    setTimeout(() => curtain.classList.add('gone'), 2000);
  });
})();


/* ─────────────────────────────────────
   2. CUSTOM CURSOR  (desktop only)
───────────────────────────────────── */
(function initCursor() {
  /* Bail on touch / coarse-pointer devices — covers all phones & tablets */
  const isTouch = window.matchMedia('(hover:none),(pointer:coarse)').matches;
  if (isTouch) return;

  const dot   = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!dot || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;
  let revealed = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    /* Only reveal after first genuine mouse movement — prevents red square at 0,0 */
    if (!revealed) {
      dot.classList.add('active');
      trail.classList.add('active');
      revealed = true;
    }
  });

  /* Trail follows with smooth lag */
  (function loop() {
    tx += (mx - tx) * 0.13;
    ty += (my - ty) * 0.13;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(loop);
  })();

  /* Expand on interactive elements */
  const sel = 'a, button, .tc-tag, .proj-featured, .proj-small, .about-card, .skill-card, .cert-card, .contact-link, .btn, .pdc-link';
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('expanded'));
    el.addEventListener('mouseleave', () => dot.classList.remove('expanded'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity   = '0';
    trail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (revealed) {
      dot.style.opacity   = '1';
      trail.style.opacity = '1';
    }
  });
})();


/* ─────────────────────────────────────
   3. SCROLL PROGRESS BAR
───────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;
  const update = () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ─────────────────────────────────────
   4. NAV — glass on scroll
───────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 55);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();


/* ─────────────────────────────────────
   5. HAMBURGER / MOBILE MENU
───────────────────────────────────── */
(function initMobileMenu() {
  const burger = document.getElementById('hamburger');
  const menu   = document.getElementById('mobileMenu');
  const close  = document.getElementById('mobileClose');
  if (!burger || !menu) return;

  const open = () => {
    burger.classList.add('open');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const shut = () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () =>
    menu.classList.contains('open') ? shut() : open()
  );
  if (close) close.addEventListener('click', shut);
  menu.querySelectorAll('.m-link').forEach(l => l.addEventListener('click', shut));

  /* Close on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) shut();
  });
})();


/* ─────────────────────────────────────
   6. SMOOTH ANCHOR SCROLL
───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href   = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
    ) || 68;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH,
      behavior: 'smooth'
    });
  });
});


/* ─────────────────────────────────────
   7. SCROLL REVEAL — Intersection Observer
───────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const base     = parseFloat(el.getAttribute('data-delay') || 0);

      /* Auto-stagger siblings inside same parent */
      const siblings = Array.from(
        el.parentElement.querySelectorAll(':scope > .reveal-up')
      );
      const idx      = siblings.indexOf(el);
      const delay    = base + idx * 0.07;

      el.style.transitionDelay = delay + 's';
      el.classList.add('visible');
      io.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ─────────────────────────────────────
   8. TYPING EFFECT
───────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Cloud Security Engineer',
    'AWS S3 · Static Hosting Expert',
    'Google Cloud Certified',
    'Azure Blob Specialist',
    'DecodeLabs Intern · Batch 2026',
    'Making the Cloud Secure.',
  ];

  let pIdx = 0, cIdx = 0, deleting = false, paused = false;

  function tick() {
    if (paused) return;
    const phrase = phrases[pIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2500);
      }
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 32 : 78);
  }

  /* Start after curtain clears */
  setTimeout(tick, 2300);
})();


/* ─────────────────────────────────────
   9. COUNTER ANIMATION  (reusable)
───────────────────────────────────── */
function countUp(el, target, dur = 1200) {
  let val  = 0;
  const step = Math.ceil(target / (dur / 16));
  const t  = setInterval(() => {
    val = Math.min(val + step, target);
    el.textContent = val;
    if (val >= target) clearInterval(t);
  }, 16);
}

(function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countUp(e.target, parseInt(e.target.getAttribute('data-count'), 10));
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
})();


/* ─────────────────────────────────────
   10. SKILL BAR FILL ANIMATION
───────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.sbar-fill');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      setTimeout(() => {
        e.target.style.width = (e.target.getAttribute('data-w') || 0) + '%';
      }, 220);
      io.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  bars.forEach(b => io.observe(b));
})();


/* ─────────────────────────────────────
   11. SKILL PERCENTAGE COUNTER  (right grid)
───────────────────────────────────── */
(function initSkillNums() {
  const rings = document.querySelectorAll('.sk-pct-ring');
  if (!rings.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = parseInt(e.target.textContent, 10);
      if (isNaN(target)) return;
      e.target.textContent = 0;
      countUp(e.target, target, 1400);
      io.unobserve(e.target);
    });
  }, { threshold: 0.35 });
  rings.forEach(r => io.observe(r));
})();


/* ─────────────────────────────────────
   12. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => {
        l.style.color = '';
        if (l.classList.contains('nav-link-cta')) l.style.borderColor = '';
      });
      const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (active) {
        active.style.color = '#F5F5F0';
        if (active.classList.contains('nav-link-cta'))
          active.style.borderColor = '#D32F2F';
      }
    });
  }, { threshold: 0.42 });

  sections.forEach(s => io.observe(s));
})();


/* ─────────────────────────────────────
   13. HERO CANVAS — crimson particle network
───────────────────────────────────── */
(function initHeroCanvas() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:absolute;inset:0;pointer-events:none;z-index:0;opacity:0.35;';
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H, pts;

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    pts = Array.from({ length: 55 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r:  Math.random() * 1.3 + 0.3,
      a:  Math.random(),
      da: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x  += p.vx; p.y  += p.vy;
      p.a  += p.da;
      if (p.a < 0 || p.a > 1)  p.da *= -1;
      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;

      /* Particle dot */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(211,47,47,${p.a * 0.7})`;
      ctx.fill();

      /* Connection lines to nearby particles */
      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(211,47,47,${(1 - d / 130) * 0.11})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  }, { passive: true });
})();


/* ─────────────────────────────────────
   14. PROJECT IMAGE HOVER PARALLAX
───────────────────────────────────── */
(function initProjParallax() {
  document.querySelectorAll('.proj-img').forEach(img => {
    const parent = img.closest('.proj-featured, .proj-small');
    if (!parent) return;
    parent.addEventListener('mousemove', e => {
      const r    = parent.getBoundingClientRect();
      const xPct = (e.clientX - r.left) / r.width  - 0.5;
      const yPct = (e.clientY - r.top)  / r.height - 0.5;
      img.style.transform  = `scale(1.05) translate(${xPct * 12}px,${yPct * 12}px)`;
      img.style.transition = 'transform 0.08s ease';
    });
    parent.addEventListener('mouseleave', () => {
      img.style.transform  = 'scale(1) translate(0,0)';
      img.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    });
  });
})();


/* ─────────────────────────────────────
   15. TECH TAG RIPPLE on click
───────────────────────────────────── */
(function initTagRipple() {
  /* Inject keyframe once */
  if (!document.getElementById('__hr_kf')) {
    const s   = document.createElement('style');
    s.id      = '__hr_kf';
    s.textContent = '@keyframes hrRipple{to{transform:scale(2.6);opacity:0}}';
    document.head.appendChild(s);
  }

  document.querySelectorAll('.tc-tag').forEach(tag => {
    tag.addEventListener('click', function (e) {
      const r    = this.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const el   = document.createElement('span');
      el.style.cssText = `
        position:absolute;pointer-events:none;
        width:${size}px;height:${size}px;border-radius:0;
        left:${e.clientX - r.left - size / 2}px;
        top:${e.clientY - r.top  - size / 2}px;
        background:rgba(211,47,47,0.22);
        transform:scale(0);
        animation:hrRipple 0.50s ease-out forwards;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(el);
      setTimeout(() => el.remove(), 600);
    });
  });
})();


/* ─────────────────────────────────────
   16. SECTION LABEL CHARACTER SCRAMBLE on hover
───────────────────────────────────── */
(function initScramble() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—◈▲';
  document.querySelectorAll('.section-label').forEach(el => {
    const orig = el.textContent;
    let timer  = null;
    el.addEventListener('mouseenter', function () {
      clearInterval(timer);
      let iter = 0;
      timer = setInterval(() => {
        this.textContent = orig.split('').map((c, i) => {
          if (i < iter)                           return orig[i];
          if (/[\s·—·]/.test(c))                 return c;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iter += 0.75;
        if (iter >= orig.length) {
          this.textContent = orig;
          clearInterval(timer);
        }
      }, 36);
    });
    el.addEventListener('mouseleave', function () {
      clearInterval(timer);
      this.textContent = orig;
    });
  });
})();


/* ─────────────────────────────────────
   17. MAGNETIC BUTTON EFFECT
───────────────────────────────────── */
(function initMagnetic() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const r  = this.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      this.style.transform   = `translate(${dx * 0.14}px,${dy * 0.14}px)`;
      this.style.transition  = 'transform 0.08s ease';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform  = '';
      this.style.transition = 'transform 0.50s cubic-bezier(0.4,0,0.2,1)';
    });
  });
})();


/* ─────────────────────────────────────
   18. HERO STATS FADE on scroll
   — Only on desktop, only after CSS animation completes
   — 60 px threshold stops mobile rubber-band triggering
───────────────────────────────────── */
(function initHeroFade() {
  const stats = document.getElementById('heroStats');
  const hint  = document.querySelector('.hero-scroll-hint');
  if (!stats) return;

  /* No fade on touch devices */
  if (window.matchMedia('(hover:none),(pointer:coarse)').matches) return;

  /* Start AFTER the CSS animation finishes: 2.85s delay + 0.75s duration = 3.6s */
  setTimeout(() => {
    window.addEventListener('scroll', () => {
      const sy    = window.scrollY;
      const ratio = sy < 60 ? 1 : Math.max(0, 1 - (sy - 60) / 260);
      stats.style.opacity = ratio;
      if (hint) hint.style.opacity = sy < 60 ? 1 : Math.max(0, 1 - (sy - 60) / 140);
    }, { passive: true });
  }, 3650);
})();


/* ─────────────────────────────────────
   19. CONTACT LINK SIBLING DIM on hover
───────────────────────────────────── */
(function initContactHover() {
  const links = document.querySelectorAll('.contact-link');
  if (!links.length) return;
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      links.forEach(l => { if (l !== link) l.style.opacity = '0.38'; });
    });
    link.addEventListener('mouseleave', () => {
      links.forEach(l => { l.style.opacity = ''; });
    });
  });
})();


/* ─────────────────────────────────────
   20. PAGE ENTRANCE  — hero stagger after curtain
───────────────────────────────────── */
(function initEntrance() {
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.50s ease';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';

      /* Stagger hero reveal-up elements after curtain clears (≈2 s).
         hero-stats is intentionally excluded — it has its own CSS animation. */
      const heroReveal = document.querySelectorAll('.hero .reveal-up');
      heroReveal.forEach((el, i) => {
        const base = parseFloat(el.getAttribute('data-delay') || 0);
        el.style.transitionDelay = (base + 2.05 + i * 0.10) + 's';
        el.classList.add('visible');
      });
    }, 80);
  });
})();


/* ─────────────────────────────────────
   21. KEYBOARD ACCESSIBILITY — focus outlines
───────────────────────────────────── */
(function initA11y() {
  /* Show outlines only when using keyboard */
  document.addEventListener('mousedown', () =>
    document.documentElement.classList.remove('kb-nav')
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab')
      document.documentElement.classList.add('kb-nav');
  });

  /* Inject focus style */
  const s = document.createElement('style');
  s.textContent = `.kb-nav :focus{outline:2px solid #D32F2F !important;outline-offset:3px;}`;
  document.head.appendChild(s);
})();


/* ─────────────────────────────────────
   22. CONSOLE SIGNATURE
───────────────────────────────────── */
const _sig = [
  [ '%c HASSAN RAZA ',
    'background:#D32F2F;color:#F5F5F0;font-family:serif;font-size:16px;font-weight:700;padding:8px 24px;letter-spacing:.18em;' ],
  [ '%c Cloud Security Engineer · DecodeLabs 2026 ',
    'color:#D32F2F;font-size:12px;letter-spacing:.10em;' ],
  [ '%c heyyy.hassan0@gmail.com ',
    'color:rgba(245,245,240,0.55);font-size:11px;' ],
  [ '%c github.com/code-with-hassanraza · credly.com/users/muhammad_hassan_raza ',
    'color:rgba(245,245,240,0.4);font-size:10px;' ],
  [ '%c Design System: Crimson Velvet · Bodoni Moda · Hanken Grotesk · 0px radius ',
    'color:#4A1414;font-size:10px;' ],
];
_sig.forEach(([msg, style]) => console.log(msg, style));