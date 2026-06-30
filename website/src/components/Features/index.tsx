.hero {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 4rem 1.25rem;
  background:
    radial-gradient(ellipse at 20% 0%, var(--hero-glow-1), transparent 55%),
    radial-gradient(ellipse at 90% 90%, var(--hero-glow-2), transparent 55%),
    var(--hero-bg-base);
  transition: background 0.3s ease;
}

.gridOverlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--hero-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--hero-grid-line) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 25%, transparent 75%);
}

.inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.text {
  min-width: 0;
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--hero-badge-border);
  border-radius: 999px;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--hero-badge-text);
  background: var(--hero-badge-bg);
  backdrop-filter: blur(6px);
  margin-bottom: 1.4rem;
}

.title {
  font-family: 'Orbitron', system-ui, sans-serif;
  font-size: clamp(3.2rem, 9vw, 7rem);
  font-weight: 800;
  line-height: 1;
  margin: 0 0 1.2rem;
  letter-spacing: 0.02em;
  background: var(--hero-title-grad);
  background-size: 250% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 28px var(--hero-title-glow));
  animation: sinuxShimmer 6s linear infinite;
}

@keyframes sinuxShimmer {
  to {
    background-position: 250% center;
  }
}

.subtitle {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  line-height: 1.7;
  color: var(--hero-subtitle);
  max-width: 540px;
  margin: 0 0 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.6rem;
}

.primaryBtn,
.secondaryBtn {
  padding: 0.85rem 1.7rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.primaryBtn {
  color: var(--hero-btn-text);
  background: var(--hero-btn-grad);
  box-shadow: 0 8px 30px var(--hero-btn-shadow);
}

.primaryBtn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px var(--hero-btn-shadow);
  color: var(--hero-btn-text);
  text-decoration: none;
}

.secondaryBtn {
  color: var(--hero-secondary-text);
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: var(--hero-secondary-bg);
  backdrop-filter: blur(6px);
}

.secondaryBtn:hover {
  transform: translateY(-3px);
  border-color: var(--hero-secondary-border-hover);
  color: var(--hero-secondary-text);
  text-decoration: none;
}

.stats {
  display: flex;
  gap: 2.2rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
}

.statNum {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--hero-stat-num);
}

.statLabel {
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #94a3b8;
}

.stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 480px;
  margin: 0 auto;
}

.canvasWrap {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  touch-action: pan-y;
}

.canvasFallback {
  width: 100%;
  height: 100%;
}

.logoFloat {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  animation: logoFloat 6s ease-in-out infinite;
}

.logoImg {
  width: 58%;
  max-width: 280px;
  height: auto;
  filter: drop-shadow(0 0 30px var(--hero-logo-glow-1))
    drop-shadow(0 0 60px var(--hero-logo-glow-2));
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(-10px) rotate(-1.5deg);
  }
  50% {
    transform: translateY(10px) rotate(1.5deg);
  }
}

@media (max-width: 900px) {
  .inner {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  .stage {
    order: -1;
    max-width: 340px;
  }
  .badge {
    margin-inline: auto;
  }
  .subtitle {
    margin-inline: auto;
  }
  .buttons,
  .stats {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: auto;
    padding: 3rem 1.1rem;
  }
  .stats {
    gap: 1.4rem;
  }
}

html[dir='rtl'] .subtitle {
  max-width: 540px;
}
