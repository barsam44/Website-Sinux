# Sinux Website

The documentation & landing site for [Sinux](https://github.com/CyberSinook/Sinux),
built with [Docusaurus](https://docusaurus.io/) and a Three.js 3D hero.

**Live:** https://amdevelopercp-dotcom.github.io/Sinux/

[فارسی](./README.fa.md) | English

## Local development

```bash
cd website
npm install      # first time only
npm start        # dev server at http://localhost:3000
```

## Build

```bash
npm run build    # outputs static files to website/build/
npm run serve    # preview the production build locally
```

## Deployment

Deployment is automatic via GitHub Actions. Any push to `main` that touches `website/**`
rebuilds and publishes the site to GitHub Pages. The workflow lives at
`.github/workflows/deploy.yml` (repo root).
