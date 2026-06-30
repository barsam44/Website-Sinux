import React, {useState, useEffect} from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// ============================================================================
// GitHub Repository Section
//
// Fetches the latest commits and star count directly from the GitHub REST API.
// No values are hardcoded — the owner/repo come from customFields set in
// docusaurus.config.ts so they can be changed without touching source code.
// ============================================================================

type Commit = {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
  html_url: string;
};

type RepoInfo = {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
};

type GitHubState = {
  loading: boolean;
  error: string | null;
  commits: Commit[];
  repo: RepoInfo | null;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.floor(months / 12)}y`;
}

export default function GitHubSection(): React.ReactElement {
  const [state, setState] = useState<GitHubState>({
    loading: true,
    error: null,
    commits: [],
    repo: null,
  });
  const {siteConfig} = useDocusaurusContext();
  const owner = (siteConfig.customFields?.githubOwner as string) ?? 'CyberSinook';
  const repo = (siteConfig.customFields?.githubRepo as string) ?? 'Sinux';

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const headers: Record<string, string> = {
          Accept: 'application/vnd.github+json',
        };
        // Optional token from localStorage (set by maintainers) to avoid rate
        // limits. Not required for normal operation.
        const token =
          typeof localStorage !== 'undefined'
            ? localStorage.getItem('github_token')
            : null;
        if (token) headers.Authorization = `Bearer ${token}`;

        const [repoRes, commitsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${repo}`, {headers}),
          fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?per_page=6`,
            {headers},
          ),
        ]);

        if (cancelled) return;

        if (!repoRes.ok || !commitsRes.ok) {
          throw new Error(
            repoRes.status === 403
              ? 'rate_limit'
              : `GitHub API returned ${repoRes.status}`,
          );
        }

        const repoData: RepoInfo = await repoRes.json();
        const commitsData: Commit[] = await commitsRes.json();

        if (!cancelled) {
          setState({
            loading: false,
            error: null,
            commits: commitsData.slice(0, 6),
            repo: repoData,
          });
        }
      } catch (err: any) {
        if (!cancelled) {
          setState({
            loading: false,
            error: err?.message ?? 'unknown',
            commits: [],
            repo: null,
          });
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          <Translate id="github.section.heading">
            Straight from the repository
          </Translate>
        </h2>
        <p className={styles.sub}>
          <Translate id="github.section.sub">
            Latest commits and project activity.
          </Translate>
        </p>

        {state.loading && (
          <div className={styles.status}>
            <div className={styles.spinner} />
            <Translate id="github.loading">Loading repository data…</Translate>
          </div>
        )}

        {!state.loading && state.error && (
          <div className={styles.errorBox}>
            <Translate id="github.error.title">
              Could not load repository data
            </Translate>
            <p className={styles.errorHint}>
              {state.error === 'rate_limit' ? (
                <Translate id="github.error.ratelimit">
                  GitHub API rate limit reached. Please try again later.
                </Translate>
              ) : (
                <Translate id="github.error.generic">
                  An unexpected error occurred while contacting the GitHub API.
                </Translate>
              )}
            </p>
          </div>
        )}

        {!state.loading && !state.error && state.repo && (
          <>
            {/* Stats row */}
            <div className={styles.statsRow}>
              <a
                className={styles.statBadge}
                href={state.repo.html_url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.statIcon}>★</span>
                <span className={styles.statValue}>
                  {state.repo.stargazers_count.toLocaleString()}
                </span>
                <span className={styles.statTextLabel}>
                  <Translate id="github.stat.stars">stars</Translate>
                </span>
              </a>
              <a
                className={styles.statBadge}
                href={`${state.repo.html_url}/forks`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.statIcon}>⑂</span>
                <span className={styles.statValue}>
                  {state.repo.forks_count.toLocaleString()}
                </span>
                <span className={styles.statTextLabel}>
                  <Translate id="github.stat.forks">forks</Translate>
                </span>
              </a>
              <a
                className={styles.statBadge}
                href={`${state.repo.html_url}/issues`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.statIcon}>⚑</span>
                <span className={styles.statValue}>
                  {state.repo.open_issues_count.toLocaleString()}
                </span>
                <span className={styles.statTextLabel}>
                  <Translate id="github.stat.issues">issues</Translate>
                </span>
              </a>
            </div>

            {/* Commits list */}
            <h3 className={styles.commitHeading}>
              <Translate id="github.commits.heading">Latest commits</Translate>
            </h3>
            <ul className={styles.commitList}>
              {state.commits.map((c) => {
                const firstLine = c.commit.message.split('\n')[0];
                return (
                  <li key={c.sha} className={styles.commitItem}>
                    <a
                      href={c.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles.commitAvatarLink}
                    >
                      {c.author ? (
                        <img
                          src={c.author.avatar_url}
                          alt={c.author.login}
                          className={styles.commitAvatar}
                          loading="lazy"
                        />
                      ) : (
                        <div className={styles.commitAvatarFallback}>
                          {c.commit.author.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </a>
                    <div className={styles.commitBody}>
                      <a
                        href={c.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={styles.commitMessage}
                        title={firstLine}
                      >
                        {firstLine}
                      </a>
                      <div className={styles.commitMeta}>
                        {c.author ? (
                          <a
                            href={c.author.html_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={styles.commitAuthor}
                          >
                            {c.author.login}
                          </a>
                        ) : (
                          <span className={styles.commitAuthor}>
                            {c.commit.author.name}
                          </span>
                        )}
                        <span className={styles.commitSha}>
                          {c.sha.slice(0, 7)}
                        </span>
                        <span className={styles.commitTime}>
                          {timeAgo(c.commit.author.date)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
