  
    /* JAVASCRIPT — FULL DYNAMIC EFFECTS */
         /* ── PRELOADER ──────────────────────────────── */
    (function () {
      const bar = document.getElementById('preBar');
      const pct = document.getElementById('prePct');
      const pre = document.getElementById('preloader');
      let v = 0;
      const iv = setInterval(() => {
        v += Math.random() * 12 + 3;
        if (v >= 100) { v = 100; clearInterval(iv); setTimeout(() => { pre.classList.add('hide'); startHeroAnimations() }, 300) }
        bar.style.width = v + '%';
        pct.textContent = Math.floor(v) + '%';
      }, 60);
    })();

    /* ── HERO TITLE — WORD BY WORD ANIMATION ──── */
    function startHeroAnimations() {
      const words = document.querySelectorAll('.hero-title .word span');
      words.forEach((w, i) => {
        w.style.display = 'inline-block';
        w.style.opacity = '0';
        w.style.transform = 'translateY(60px)';
        w.style.transition = `opacity .6s cubic-bezier(.16,1,.3,1) ${i * 0.12 + 0.1}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.12 + 0.1}s`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          w.style.opacity = '1';
          w.style.transform = 'translateY(0)';
        }));
      });
      // start counters after short delay
      setTimeout(startCounters, 900);
    }

    /* ── PARTICLES CANVAS ───────────────────────── */
    (function () {
      const canvas = document.getElementById('hero-canvas');
      const ctx = canvas.getContext('2d');
      let W, H, particles = [];
      function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
      resize();
      window.addEventListener('resize', resize);
      class Particle {
        constructor() { this.reset() }
        reset() {
          this.x = Math.random() * W; this.y = Math.random() * H;
          this.r = Math.random() * 1.5 + .3;
          this.vx = (Math.random() - .5) * .25; this.vy = (Math.random() - .5) * .25;
          this.life = 0; this.maxLife = 200 + Math.random() * 200;
          this.col = ['#6366f1', '#a855f7', '#3b82f6', '#818cf8'][Math.floor(Math.random() * 4)];
        }
        update() {
          this.x += this.vx; this.y += this.vy; this.life++;
          if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
          const a = Math.sin(this.life / this.maxLife * Math.PI) * .7;
          ctx.globalAlpha = a; ctx.fillStyle = this.col;
          ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
        }
      }
      for (let i = 0; i < 120; i++)particles.push(new Particle());
      // connections
      function connect() {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
              ctx.globalAlpha = (.08 * (1 - d / 100));
              ctx.strokeStyle = '#6366f1'; ctx.lineWidth = .5;
              ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
          }
        }
      }
      function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw() });
        connect();
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
      }
      animate();
    })();

    /* ── CUSTOM CURSOR ───────────────────────────── */
    (function () {
      if (window.innerWidth <= 768) return;
      const cur = document.getElementById('cursor');
      const ring = document.getElementById('cursor-ring');
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' }, { passive: true });
      function animRing() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing) }
      animRing();
      document.querySelectorAll('a,button,.btn,.filter-btn,.skill-chip,.tilt-card,.social-link').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
      document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
      document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    })();

    /* ── SCROLL PROGRESS ─────────────────────────── */
    const progressBar = document.getElementById('progress-bar');
    function updateProgress() {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = pct + '%';
    }

    /* ── NAVBAR & BACK TOP ───────────────────────── */
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 20);
      backTop.classList.toggle('vis', y > 400);
      updateProgress();
      checkReveal();
      checkProcess();
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ── HAMBURGER ───────────────────────────────── */
    const ham = document.getElementById('hamburger');
    const mob = document.getElementById('mobileMenu');
    ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open') });
    document.querySelectorAll('.mobile-link,.mobile-menu .btn').forEach(l => l.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open') }));

    /* ── INTERSECTION REVEAL ─────────────────────── */
    function checkReveal() {
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.88) el.classList.add('vis');
      });
    }
    checkReveal();

    /* ── PROCESS LINE ANIMATION ──────────────────── */
    function checkProcess() {
      const line = document.getElementById('processLine');
      if (!line) return;
      const r = line.getBoundingClientRect();
      if (r.top < window.innerHeight * .9) line.classList.add('vis');
    }

    /* ── COUNTER ANIMATION ───────────────────────── */
    function startCounters() {
      document.querySelectorAll('.counter-num').forEach(el => {
        const target = +el.dataset.target;
        let cur = 0;
        const step = target / 60;
        const iv = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(iv) }
          el.textContent = Math.floor(cur);
        }, 20);
      });
    }

    /* ── 3D TILT ON CARDS ────────────────────────── */
    (function () {
      if (window.innerWidth <= 768) return;
      document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - .5) * 14;
          const y = ((e.clientY - r.top) / r.height - .5) * -14;
          card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });
    })();

    /* ── MAGNETIC BUTTONS ────────────────────────── */
    (function () {
      if (window.innerWidth <= 768) return;
      document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * .25;
          const y = (e.clientY - r.top - r.height / 2) * .25;
          btn.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      });
    })();

    /* ── PORTFOLIO FILTER ────────────────────────── */
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        const cards = document.querySelectorAll('.portfolio-card');
        cards.forEach((card, i) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            // Stagger re-appear animation
            card.style.opacity = '0'; card.style.transform = 'scale(.9) translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'all .5s cubic-bezier(.16,1,.3,1)';
              card.style.opacity = '1'; card.style.transform = '';
            }, i * 80);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    /* ── SMOOTH ANCHOR ───────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return; e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      });
    });

    /* ── FORM SUBMIT FEEDBACK ────────────────────── */
    document.getElementById('sendBtn').addEventListener('click', function (e) {
      e.preventDefault();
      const form = document.querySelector('.contact-form');
      const inputs = form.querySelectorAll('input, select, textarea');
      let isValid = true;
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });
      if (!isValid) {
        alert('Please fill in all required fields.');
        return;
      }
      const orig = this.innerHTML;
      this.innerHTML = '✓ Message Sent!';
      this.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      this.style.boxShadow = '0 4px 24px rgba(34,197,94,.4)';
      // Simulate form submission
      setTimeout(() => {
        this.innerHTML = orig;
        this.style.background = '';
        this.style.boxShadow = '';
        form.reset();
      }, 3000);
    });

    /* ── PARALLAX ORBS ───────────────────────────── */
    (function () {
      if (window.innerWidth <= 768) return;
      window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - .5);
        const y = (e.clientY / window.innerHeight - .5);
        document.querySelectorAll('.orb').forEach((o, i) => {
          const depth = (i + 1) * 12;
          o.style.transform = `translate(${x * depth}px,${y * depth}px)`;
        });
      }, { passive: true });
    })();

    /* ── TYPING CURSOR BLINK on hero sub ─────────── */
    (function () {
      const desc = document.querySelector('.hero-desc');
      if (!desc) return;
      const cursor = document.createElement('span');
      cursor.textContent = '|';
      cursor.style.cssText = 'margin-left:2px;color:#6366f1;animation:blink 1s step-end infinite;font-weight:300;';
      const style = document.createElement('style');
      style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
      document.head.appendChild(style);
      desc.appendChild(cursor);
      setTimeout(() => cursor.remove(), 4000);
    })();

    /* Initial check */
    setTimeout(checkReveal, 100);
    setTimeout(checkProcess, 200);