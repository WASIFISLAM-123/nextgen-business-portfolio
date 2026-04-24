/*     JAVASCRIPT  */

    /* ── PRELOADER ───────────────────────────────── */
    (() => {
      const bar = document.getElementById('preBar'), pct = document.getElementById('prePct'), pre = document.getElementById('preloader');
      let v = 0;
      const iv = setInterval(() => {
        v += Math.random() * 14 + 4;
        if (v >= 100) { v = 100; clearInterval(iv); setTimeout(() => { pre.classList.add('hide'); startHeroAnim() }, 350) }
        bar.style.width = v + '%'; pct.textContent = Math.floor(v) + '%';
      }, 55);
    })();

    /* ── HERO WORD ANIMATION ─────────────────────── */
    function startHeroAnim() {
      document.querySelectorAll('.hero-title .word span').forEach((w, i) => {
        w.style.cssText = `display:inline-block;opacity:0;transform:translateY(60px);transition:opacity .65s cubic-bezier(.16,1,.3,1) ${i * .13 + .1}s,transform .65s cubic-bezier(.16,1,.3,1) ${i * .13 + .1}s`;
        requestAnimationFrame(() => requestAnimationFrame(() => { w.style.opacity = '1'; w.style.transform = 'translateY(0)' }));
      });
      setTimeout(startCounters, 900);
    }

    /* ── PARTICLE CANVAS ─────────────────────────── */
    (() => {
      const canvas = document.getElementById('hero-canvas'), ctx = canvas.getContext('2d');
      let W, H, particles = [];
      const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight };
      resize(); window.addEventListener('resize', resize);
      class P {
        constructor() { this.reset() }
        reset() { this.x = Math.random() * W; this.y = Math.random() * H; this.r = Math.random() * 1.5 + .3; this.vx = (Math.random() - .5) * .25; this.vy = (Math.random() - .5) * .25; this.life = 0; this.maxLife = 180 + Math.random() * 200; this.col = ['#6366f1', '#a855f7', '#3b82f6', '#818cf8'][Math.floor(Math.random() * 4)] }
        update() { this.x += this.vx; this.y += this.vy; this.life++; if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset() }
        draw() { const a = Math.sin(this.life / this.maxLife * Math.PI) * .7; ctx.globalAlpha = a; ctx.fillStyle = this.col; ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill() }
      }
      for (let i = 0; i < 120; i++)particles.push(new P());
      function connect() { for (let i = 0; i < particles.length; i++)for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 100) { ctx.globalAlpha = .08 * (1 - d / 100); ctx.strokeStyle = '#6366f1'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke() } } }
      const loop = () => { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw() }); connect(); ctx.globalAlpha = 1; requestAnimationFrame(loop) };
      loop();
    })();

    /* ── CUSTOM CURSOR ───────────────────────────── */
    (() => {
      if (window.innerWidth <= 768) return;
      const cur = document.getElementById('cursor'), ring = document.getElementById('cursor-ring');
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' }, { passive: true });
      const animRing = () => { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing) };
      animRing();
      document.querySelectorAll('a,button,.btn,.filter-btn,.skill-chip,.tilt-card,.social-link,.ft-social,.portfolio-card,.testi-card,.service-card,.contact-item').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
      document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
      document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    })();

    /* ── PROGRESS BAR ────────────────────────────── */
    const progressBar = document.getElementById('progress-bar');

    /* ── NAV + BACK TOP ──────────────────────────── */
    const navbar = document.getElementById('navbar'), backTop = document.getElementById('backTop');
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ── MAIN SCROLL HANDLER ─────────────────────── */
    let ticking = false;
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true } }, { passive: true });
    function onScroll() {
      ticking = false;
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 20);
      backTop.classList.toggle('vis', y > 500);
      progressBar.style.width = (y / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
      checkReveal();
      checkProcessLine();
      checkSkillBars();
    }

    /* ── REVEAL ──────────────────────────────────── */
    const revealEls = () => document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-rotate');
    function checkReveal() {
      revealEls().forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * .88) el.classList.add('vis');
      });
    }
    checkReveal();

    /* ── PROCESS LINE ────────────────────────────── */
    function checkProcessLine() {
      const line = document.getElementById('processLine');
      if (line && line.getBoundingClientRect().top < window.innerHeight * .9) line.classList.add('vis');
    }

    /* ── SKILL BARS ──────────────────────────────── */
    let barsAnimated = false;
    function checkSkillBars() {
      if (barsAnimated) return;
      const about = document.getElementById('about');
      if (!about) return;
      if (about.getBoundingClientRect().top < window.innerHeight * .8) {
        barsAnimated = true;
        document.querySelectorAll('.exp-bar-fill').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.width + '%' }, i * 120);
        });
      }
    }

    /* ── COUNTERS ────────────────────────────────── */
    function startCounters() {
      document.querySelectorAll('.counter-num').forEach(el => {
        const target = +el.dataset.target, step = target / 60;
        let cur = 0;
        const iv = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(iv) } el.textContent = Math.floor(cur) }, 20);
      });
    }

    /* ── 3D TILT CARDS ───────────────────────────── */
    (() => {
      if (window.innerWidth <= 768) return;
      document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - .5) * 16;
          const y = ((e.clientY - r.top) / r.height - .5) * -16;
          card.style.transform = `translateY(-10px) rotateX(${y}deg) rotateY(${x}deg) scale(1.01)`;
          // move glow
          const glow = card.querySelector('.card-glow');
          if (glow) { glow.style.left = (e.clientX - r.left) + 'px'; glow.style.top = (e.clientY - r.top) + 'px' }
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });
    })();

    /* ── SERVICE SPOTLIGHT (mouse glow) ─────────── */
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const g = card.querySelector('.card-glow');
        if (!g) return;
        const r = card.getBoundingClientRect();
        g.style.left = (e.clientX - r.left) + 'px';
        g.style.top = (e.clientY - r.top) + 'px';
      });
    });

    /* ── MAGNETIC BUTTONS ────────────────────────── */
    (() => {
      if (window.innerWidth <= 768) return;
      document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const r = btn.getBoundingClientRect();
          btn.style.transform = `translateX(${(e.clientX - r.left - r.width / 2) * .28}px) translateY(${(e.clientY - r.top - r.height / 2) * .28}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      });
    })();

    /* ── PORTFOLIO FILTER ────────────────────────── */
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.portfolio-card').forEach((c, i) => {
          c.style.opacity = '0'; c.style.transform = 'scale(.88) translateY(24px)'; c.style.transition = 'none';
          requestAnimationFrame(() => {
            setTimeout(() => {
              c.style.transition = `opacity .55s cubic-bezier(.16,1,.3,1) ${i * 0.07}s,transform .55s cubic-bezier(.16,1,.3,1) ${i * 0.07}s`;
              c.style.opacity = '1'; c.style.transform = '';
            }, 30);
          });
        });
      });
    });

    /* ── PARALLAX ORBS ───────────────────────────── */
    (() => {
      if (window.innerWidth <= 768) return;
      window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - .5), y = (e.clientY / window.innerHeight - .5);
        document.querySelectorAll('.orb').forEach((o, i) => { const d = (i + 1) * 14; o.style.transform = `translate(${x * d}px,${y * d}px)` });
      }, { passive: true });
    })();

    /* ── HAMBURGER ───────────────────────────────── */
    const ham = document.getElementById('hamburger'), mob = document.getElementById('mobileMenu');
    ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open') });
    document.querySelectorAll('.mobile-link,.mobile-menu .btn').forEach(l => l.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open') }));

    /* ── SMOOTH ANCHOR ───────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return; e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      });
    });

    /* ── CONTACT FORM ────────────────────────────── */
    document.getElementById('sendBtn').addEventListener('click', function () {
      const orig = this.innerHTML;
      this.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Message Sent!';
      this.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      this.style.boxShadow = '0 4px 24px rgba(34,197,94,.45)';
      setTimeout(() => { this.innerHTML = orig; this.style.background = ''; this.style.boxShadow = ''; }, 3500);
    });

    /* ── SECTION HEADER TAG PULSE ON SCROLL ──────── */
    (() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const tag = e.target.querySelector('.tag');
            if (tag) { tag.style.animation = 'none'; requestAnimationFrame(() => { tag.style.animation = '' }) }
          }
        });
      }, { threshold: .3 });
      document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
    })();

    /* ── ABOUT IMAGE PARALLAX ────────────────────── */
    (() => {
      if (window.innerWidth <= 768) return;
      const frame = document.querySelector('.about-img-wrap');
      if (!frame) return;
      window.addEventListener('scroll', () => {
        const r = frame.getBoundingClientRect();
        const center = r.top + r.height / 2 - window.innerHeight / 2;
        frame.style.transform = `translateY(${center * 0.04}px)`;
      }, { passive: true });
    })();

    /* ── TESTI CARD STAGGER ENTER ────────────────── */
    (() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.animationPlayState = 'running';
          }
        });
      }, { threshold: .2 });
      document.querySelectorAll('.testi-card').forEach(c => observer.observe(c));
    })();

    /* Initial run */
    setTimeout(() => { checkReveal(); checkProcessLine(); checkSkillBars() }, 200);
