import React, {useState, useEffect} from 'react';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './contributors.module.css';

// ============================================================================
// Contributors Page
//
// Fetches all contributors for the configured GitHub repository directly from
// the GitHub REST API and renders them as a grid of avatar cards. Contributors
// with the highest contribution counts are flagged as "main contributors" and
// rendered with a distinct badge + larger card. Everything is data-driven —
// no contributor is hardcoded.
// ============================================================================

type Contributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
};

// A contributor is considered "main" if their contributions are at least 30%
// of the top contributor's count. This naturally adapts to repos of any size
// without hardcoding a threshold number.
function isMainContributor(c: Contributor, topCount: number): boolean {
  if (topCount <= 0) return false;
  return c.contributions >= topCount * 0.3;
}

export default function ContributorsPage(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const owner =
    (siteConfig.customFields?.githubOwner as string) ?? 'CyberSinook';
  const repo = (siteConfig.customFields?.githubRepo as string) ?? 'Sinux';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const headers: Record<string, string> = {
          Accept: 'application/vnd.github+json',
        };
        const token =
          typeof localStorage !== 'undefined'
            ? localStorage.getItem('github_token')
            : null;
        if (token) headers.Authorization = `Bearer ${token}`;

        // GitHub's contributors endpoint is paginated (100 per page max).
        // Fetch the first 3 pages to cover up to 300 contributors without
        // hammering the API.
        const pages = await Promise.all([
          fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=1`,
            {headers},
          ),
          fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=2`,
            {headers},
          ),
          fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=3`,
            {headers},
          ),
        ]);

        if (cancelled) return;

        const failed = pages.find((p) => !p.ok);
        if (failed) {
          throw new Error(
            failed.status === 403
              ? 'rate_limit'
              : `GitHub API returned ${failed.status}`,
          );
        }

        const arrays = await Promise.all(pages.map((p) => p.json()));
        const all: Contributor[] = arrays.flat().filter(Boolean);

        if (cancelled) return;
        setContributors(all);
        setLoading(false);
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message ?? 'unknown');
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  const topCount = contributors.length ? contributors[0].contributions : 0;
  const mainContributors = contributors.filter((c) =>
    isMainContributor(c, topCount),
  );
  const otherContributors = contributors.filter(
    (c) => !isMainContributor(c, topCount),
  );

  return (
    <Layout
      title="Contributors"
      description="The people who built Sinux"
    >
      <section className={styles.section}>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            <Translate id="contributors.title">Contributors</Translate>
          </h1>
          <p className={styles.subtitle}>
            <Translate id="contributors.subtitle">
              Everyone who has contributed code to Sinux. Data is fetched live
              from GitHub.
            </Translate>
          </p>

          {loading && (
            <div className={styles.status}>
              <div className={styles.spinner} />
              <Translate id="contributors.loading">
                Loading contributors…
              </Translate>
            </div>
          )}

          {!loading && error && (
            <div className={styles.errorBox}>
              <Translate id="contributors.error.title">
                Could not load contributors
              </Translate>
              <p className={styles.errorHint}>
                {error === 'rate_limit' ? (
                  <Translate id="contributors.error.ratelimit">
                    GitHub API rate limit reached. Please try again later.
                  </Translate>
                ) : (
                  <Translate id="contributors.error.generic">
                    An unexpected error occurred while contacting the GitHub
                    API.
                  </Translate>
                )}
              </p>
            </div>
          )}

          {!loading && !error && contributors.length === 0 && (
            <div className={styles.emptyState}>
              <Translate id="contributors.empty">
                No contributors found for this repository yet.
              </Translate>
            </div>
          )}

          {!loading && !error && contributors.length > 0 && (
            <>
              {/* Main contributors */}
              {mainContributors.length > 0 && (
                <>
                  <h2 className={styles.groupHeading}>
                    <Translate id="contributors.main.heading">
                      Main Contributors
                    </Translate>
                  </h2>
                  <div className={styles.mainGrid}>
                    {mainContributors.map((c) => (
                      <ContributorCard
                        key={c.id}
                        contributor={c}
                        main
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Other contributors */}
              {otherContributors.length > 0 && (
                <>
                  <h2 className={styles.groupHeading}>
                    <Translate id="contributors.others.heading">
                      Contributors
                    </Translate>
                  </h2>
                  <div className={styles.grid}>
                    {otherContributors.map((c) => (
                      <ContributorCard
                        key={c.id}
                        contributor={c}
                        main={false}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

function ContributorCard({
  contributor,
  main,
}: {
  contributor: Contributor;
  main: boolean;
}): React.ReactElement {
  return (
    <a
      href={contributor.html_url}
      target="_blank"
      rel="noreferrer noopener"
      className={main ? styles.mainCard : styles.card}
    >
      {main && (
        <span className={styles.mainBadge}>
          <Translate id="contributors.badge.main">Main</Translate>
        </span>
      )}
      <img
        src={contributor.avatar_url}
        alt={contributor.login}
        className={main ? styles.mainAvatar : styles.avatar}
        loading="lazy"
      />
      <div className={styles.cardBody}>
        <span className={main ? styles.mainName : styles.name}>
          {contributor.login}
        </span>
        <span className={styles.contributions}>
          <strong>{contributor.contributions.toLocaleString()}</strong>{' '}
          <Translate id="contributors.contributions">contributions</Translate>
        </span>
      </div>
    </a>
  );
}
