import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import CodeBlock from '@theme/CodeBlock';
import Hero from '@site/src/components/Hero';
import Features from '@site/src/components/Features';
import GitHubSection from '@site/src/components/GitHubSection';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function QuickStart(): React.ReactElement {
  return (
    <section className={styles.quickstart}>
      <div className={styles.qsInner}>
        <div className={styles.qsText}>
          <h2 className={styles.qsHeading}>
            <Translate id="qs.heading">Build &amp; boot in minutes</Translate>
          </h2>
          <p className={styles.qsSub}>
            <Translate id="qs.sub">
              Clone the repo, install the toolchain, and boot Sinux in QEMU. It runs on any
              x86_64 Linux host.
            </Translate>
          </p>
          <Link className={styles.qsBtn} to="/docs/building/dependencies">
            <Translate id="qs.btn">Full build guide →</Translate>
          </Link>
        </div>
        <div className={styles.qsCode}>
          <CodeBlock language="bash">
{`# Clone the source
git clone https://github.com/SinuxProject/Sinux.git
cd Sinux

# Build kernel + userspace
make

# Build bootable ISO (first time only)
make iso

# Boot it in QEMU
make run-bios`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — 64-bit OS kernel`}
      description="A minimal 64-bit Unix-like operating system kernel written from scratch in C and x86_64 Assembly."
    >
      <Hero />
      <main>
        <Features />
        <GitHubSection />
        <QuickStart />
      </main>
    </Layout>
  );
}
