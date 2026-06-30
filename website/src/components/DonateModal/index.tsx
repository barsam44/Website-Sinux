import React, {useState, useCallback, useEffect} from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// ============================================================================
// Donation Modal
//
// A modal dialog showing the donation link and cryptocurrency wallet
// addresses. The values are read from siteConfig.customFields.donation (set
// in docusaurus.config.ts) so they can be edited without touching source code.
//
// The modal is always mounted and listens for a custom event so any button
// in the app can open it:
//   window.dispatchEvent(new CustomEvent('sinux:open-donate'))
//
// The companion <DonateButton /> component below renders the trigger button
// that fires that event. Use <DonateButton /> anywhere you want a Donate
// trigger (e.g. in the navbar via the Root theme wrapper).
// ============================================================================

type Wallet = {
  ticker: string;
  label: string;
  address: string;
};

function useDonationConfig() {
  const {siteConfig} = useDocusaurusContext();
  const donation = siteConfig.customFields?.donation as
    | {
        link?: string;
        wallets?: Wallet[];
      }
    | undefined;
  return {
    link: donation?.link,
    wallets: donation?.wallets ?? [],
  };
}

/** The modal dialog itself. Listens for 'sinux:open-donate' events. */
export function DonateModalDialog(): React.ReactElement {
  const {link, wallets} = useDonationConfig();
  const [open, setOpen] = useState(false);
  const [copiedTicker, setCopiedTicker] = useState<string | null>(null);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    window.addEventListener('sinux:open-donate', openModal as EventListener);
    return () =>
      window.removeEventListener(
        'sinux:open-donate',
        openModal as EventListener,
      );
  }, [openModal]);

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeModal]);

  const copyAddress = async (wallet: Wallet) => {
    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopiedTicker(wallet.ticker);
      setTimeout(() => setCopiedTicker(null), 2000);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context) — silently ignore.
    }
  };

  if (!open) return <></>;

  return (
    <div
      className={styles.overlay}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Donation dialog"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeModal}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className={styles.modalTitle}>
          <Translate id="donate.modal.title">Support Sinux</Translate>
        </h2>
        <p className={styles.modalSub}>
          <Translate id="donate.modal.subtitle">
            If you find Sinux useful, consider supporting its development.
          </Translate>
        </p>

        {/* Donation link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.donateLink}
          >
            <span className={styles.donateLinkIcon}>🔗</span>
            <Translate id="donate.modal.link">
              Donate via sponsor page
            </Translate>
            <span className={styles.donateLinkArrow}>→</span>
          </a>
        )}

        {/* Crypto wallets */}
        {wallets.length > 0 && (
          <>
            <h3 className={styles.walletsHeading}>
              <Translate id="donate.modal.crypto">
                Cryptocurrency wallets
              </Translate>
            </h3>
            <div className={styles.walletList}>
              {wallets.map((w) => (
                <div key={w.ticker} className={styles.walletItem}>
                  <div className={styles.walletInfo}>
                    <span className={styles.walletTicker}>{w.ticker}</span>
                    <span className={styles.walletLabel}>{w.label}</span>
                  </div>
                  <code className={styles.walletAddress}>{w.address}</code>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={() => copyAddress(w)}
                  >
                    {copiedTicker === w.ticker ? (
                      <Translate id="donate.copied">Copied!</Translate>
                    ) : (
                      <Translate id="donate.copy">Copy</Translate>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {!link && wallets.length === 0 && (
          <p className={styles.emptyState}>
            <Translate id="donate.modal.empty">
              Donation options are not configured yet. Please check back later.
            </Translate>
          </p>
        )}
      </div>
    </div>
  );
}

/** A Donate trigger button. Dispatches the open-donate event. */
export function DonateButton({
  variant = 'navbar',
}: {
  variant?: 'navbar' | 'standalone';
}): React.ReactElement {
  const open = () => window.dispatchEvent(new CustomEvent('sinux:open-donate'));
  if (variant === 'standalone') {
    return (
      <button type="button" className={styles.donateBtn} onClick={open}>
        <span className={styles.donateHeart}>❤</span>
        <Translate id="donate.button">Donate</Translate>
      </button>
    );
  }
  return (
    <button
      type="button"
      className="navbar__link donate-navbar-btn"
      onClick={open}
      aria-label="Donate"
    >
      ❤ <Translate id="donate.button">Donate</Translate>
    </button>
  );
}

/** Default export: modal only (mounted globally by Root wrapper). */
export default function DonateModal(): React.ReactElement {
  return <DonateModalDialog />;
}
