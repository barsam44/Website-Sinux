import React from 'react';
import {createPortal} from 'react-dom';
import BrowserOnly from '@docusaurus/BrowserOnly';
import DonateModal, {DonateButton} from '@site/src/components/DonateModal';

// ============================================================================
// Root wrapper
//
// Docusaurus calls this component around the entire app. We use it to mount
// the global Donate modal + a Donate button in the navbar, without swizzling.
//
// The modal is always mounted (listens for 'sinux:open-donate' events).
// The button is portalled into the navbar's right-side items container so
// it sits naturally with the other navbar items.
// ============================================================================

export default function Root({children}: {children: React.ReactNode}): React.ReactElement {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => <DonateButtonPortal />}
      </BrowserOnly>
    </>
  );
}

function DonateButtonPortal(): React.ReactElement {
  const [navbarRight, setNavbarRight] = React.useState<HTMLElement | null>(
    null,
  );

  React.useEffect(() => {
    const container = document.querySelector(
      '.navbar__items--right',
    ) as HTMLElement | null;
    if (container) setNavbarRight(container);
  }, []);

  return (
    <>
      {/* Modal is always mounted; listens for open events */}
      <DonateModal />
      {/* Button portalled into the navbar */}
      {navbarRight &&
        createPortal(<DonateButton variant="navbar" />, navbarRight)}
    </>
  );
}
