import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function Hero(): React.ReactElement {
  const logoUrl = useBaseUrl('/img/sinux-logo.png');
  return (
    <header className={styles.hero}>
      <div className={styles.gridOverlay} />

      <div className={styles.inner}>
        {/* Left: text */}
        <div className={styles.text}>
          <span className={styles.badge}>
            <Translate id="hero.badge" description="hero pill badge">
              64-bit · written from scratch
            </Translate>
          </span>
          <h1 className={styles.title}>Sinux</h1>
          <p className={styles.subtitle}>
            <Translate id="hero.subtitle" description="hero subtitle">
              A minimal Unix-like operating system kernel, built from scratch in C and
              x86_64 Assembly. Boots via GRUB Multiboot2 on UEFI and BIOS — real hardware
              or QEMU.(the satan herself uses sinux)
            </Translate>
          </p>

          <div className={styles.buttons}>
            <Link className={styles.primaryBtn} to="/docs/intro">
              <Translate id="hero.cta.start" description="primary CTA">
                Get Started →
              </Translate>
            </Link>
            <Link className={styles.secondaryBtn} to="https://github.com/CyberSinook/Sinux">
              <Translate id="hero.cta.github" description="github CTA">
                ★ View on GitHub
              </Translate>
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>14</span>
              <span className={styles.statLabel}>
                <Translate id="hero.stat.syscalls">syscalls</Translate>
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>Ring 3</span>
              <span className={styles.statLabel}>
                <Translate id="hero.stat.usermode">user mode</Translate>
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>ext2</span>
              <span className={styles.statLabel}>
                <Translate id="hero.stat.fs">persistent fs</Translate>
              </span>
            </div>
          </div>
        </div>

        {/* Right: 3D stage with floating logo */}
        <div className={styles.stage}>
          <div className={styles.canvasWrap}>
            <BrowserOnly fallback={<div className={styles.canvasFallback} />}>
              {() => {
                const Scene = require('./Scene').default;
                return <Scene />;
              }}
            </BrowserOnly>
          </div>
          <div className={styles.logoFloat}>
            <img src={logoUrl} alt="Sinux logo" className={styles.logoImg} />
          </div>
        </div>
      </div>
    </header>
  );
}
