// ============================================================================
// Type augmentation for Docusaurus customFields.
//
// This lets TypeScript understand the shape of siteConfig.customFields so that
// components like GitHubSection and DonateModal can access configuration values
// with full type safety.
//
// The values themselves live in docusaurus.config.ts (customFields) and are
// editable there without touching any component source code.
// ============================================================================

declare module '@docusaurus/types' {
  interface CustomFields {
    /** GitHub repository owner, e.g. "CyberSinook" */
    githubOwner?: string;
    /** GitHub repository name, e.g. "Sinux" */
    githubRepo?: string;
    /** Donation settings used by the DonateModal component */
    donation?: {
      link?: string;
      wallets?: Array<{
        ticker: string;
        label: string;
        address: string;
      }>;
    };
  }
}
