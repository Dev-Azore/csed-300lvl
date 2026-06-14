function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function filterPhase(idx) {
  document.querySelectorAll('.phase-tab').forEach((t, i) => {
    if (idx === 'all') t.classList.toggle('active', i === 0);
    else t.classList.toggle('active', i === idx + 1);
  });
  document.querySelectorAll('.phase-block').forEach((b, i) => {
    if (idx === 'all') {
      b.style.display = 'grid';
      b.classList.add('active');
    } else {
      const s = i === idx;
      b.style.display = s ? 'grid' : 'none';
      b.classList.toggle('active', s);
    }
  });
  updateSpine();
}

function updateSpine() {
  const blocks = document.querySelectorAll('.phase-block');
  let last = -1;
  blocks.forEach((b, i) => {
    if (b.style.display !== 'none') last = i;
  });
  const fill = document.getElementById('spineFill');
  if (!fill) return;
  const pct = last === -1 ? 100 : ((last + 1) / blocks.length * 100);
  fill.style.height = pct + '%';
}

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, {
  threshold: 0.07,
  rootMargin: '0px 0px -30px 0px'
});
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const fill = document.getElementById('spineFill');
    if (fill) fill.style.height = '100%';
  }, 400);
});

const navLinks = document.querySelectorAll('.nav-links a');
const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const m = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (m) m.style.color = 'var(--ink)';
    }
  });
}, {
  threshold: 0.4
});
document.querySelectorAll('section[id]').forEach(s => scrollSpy.observe(s));
