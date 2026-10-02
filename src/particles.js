// Ambient Particle Starfield Script with Theme Detection & 2D Elastic Collisions
export const DARK_PARTICLE_PALETTE = ['#f97316', '#a855f7', '#fb923c', '#c084fc', '#e11d48'];
export const LIGHT_PARTICLE_PALETTE = ['#334155', '#475569', '#64748b', '#94a3b8', '#7c3aed'];

export function isCurrentThemeDark() {
  if (typeof document === 'undefined') return true;
  return !document.documentElement.classList.contains('light-theme') && !document.documentElement.classList.contains('light');
}

export function initParticleStarfield(canvas, options = {}) {
  if (!canvas) return { destroy: () => {} };
  const ctx = canvas.getContext('2d');
  if (!ctx) return { destroy: () => {} };

  let animId;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const isMobile = window.innerWidth < 768;
  const count = options.count || (isMobile ? 26 : 68);
  const maxDistance = options.maxDistance || (isMobile ? 95 : 135);
  const mouseRadius = options.mouseRadius || (isMobile ? 0 : 155);

  const mouse = { x: -2000, y: -2000, active: false };

  const getPalette = () => {
    const isDark = typeof options.isDark === 'boolean' ? options.isDark : isCurrentThemeDark();
    return isDark ? DARK_PARTICLE_PALETTE : LIGHT_PARTICLE_PALETTE;
  };

  let activePalette = getPalette();

  const particles = [];
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * 2.2 + 1.8;
    particles.push({
      x: Math.random() * (width - 40) + 20,
      y: Math.random() * (height - 40) + 20,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius,
      mass: radius * radius,
      color: activePalette[Math.floor(Math.random() * activePalette.length)],
      phase: Math.random() * Math.PI * 2
    });
  }

  const updatePaletteForTheme = (isDark) => {
    activePalette = isDark ? DARK_PARTICLE_PALETTE : LIGHT_PARTICLE_PALETTE;
    particles.forEach(p => {
      p.color = activePalette[Math.floor(Math.random() * activePalette.length)];
    });
  };

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const onMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  };

  const onMouseLeave = () => {
    mouse.active = false;
    mouse.x = -2000;
    mouse.y = -2000;
  };

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);

  let frame = 0;

  const render = () => {
    frame++;
    const isDark = typeof options.isDark === 'boolean' ? options.isDark : isCurrentThemeDark();
    ctx.clearRect(0, 0, width, height);

    // Update & mouse dispersion
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius && dist > 0.01) {
          const force = (1 - dist / mouseRadius) * 2.6;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.35;
          p.vy += Math.sin(angle) * force * 0.35;
        }
      }

      p.vx *= 0.992;
      p.vy *= 0.992;

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = 3.5;
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Screen boundary bounces with damping
      if (p.x - p.radius < 0) {
        p.x = p.radius;
        p.vx = Math.abs(p.vx) * 0.95;
      } else if (p.x + p.radius > width) {
        p.x = width - p.radius;
        p.vx = -Math.abs(p.vx) * 0.95;
      }

      if (p.y - p.radius < 0) {
        p.y = p.radius;
        p.vy = Math.abs(p.vy) * 0.95;
      } else if (p.y + p.radius > height) {
        p.y = height - p.radius;
        p.vy = -Math.abs(p.vy) * 0.95;
      }
    }

    // Elastic 2D particle-particle collisions
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = p1.radius + p2.radius;

        if (dist < minDist && dist > 0.001) {
          const nx = dx / dist;
          const ny = dy / dist;
          const kx = p1.vx - p2.vx;
          const ky = p1.vy - p2.vy;
          const p = (2 * (nx * kx + ny * ky)) / (p1.mass + p2.mass);

          if (nx * kx + ny * ky > 0) {
            p1.vx -= p * p2.mass * nx;
            p1.vy -= p * p2.mass * ny;
            p2.vx += p * p1.mass * nx;
            p2.vy += p * p1.mass * ny;

            const overlap = 0.5 * (minDist - dist);
            p1.x -= overlap * nx;
            p1.y -= overlap * ny;
            p2.x += overlap * nx;
            p2.y += overlap * ny;
          }
        }
      }
    }

    // Render particles and connecting edges
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const pulse = Math.sin(frame * 0.035 + p.phase) * 0.35 + 1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      if (isDark) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.15);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isDark
            ? p.color === '#f97316'
              ? `rgba(249, 115, 22, ${alpha})`
              : `rgba(168, 85, 247, ${alpha})`
            : `rgba(71, 85, 105, ${alpha})`;
          ctx.lineWidth = isDark ? 0.85 : 0.75;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(render);
  };

  render();

  return {
    destroy: () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    },
    updateTheme: updatePaletteForTheme
  };
}
