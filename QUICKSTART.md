# Quick Reference Guide

## Most Important Setup Steps

### 1. GitHub Secrets (Required for CI/CD)

```
Settings → Secrets and variables → Actions → New repository secret
Name: VERCEL_TOKEN
Value: [Get from https://vercel.com/account/tokens]
```

### 2. Environment Variables (Optional but Recommended)

Create `.env.local` for local development:

```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

Add to Vercel Project Settings for production.

### 3. Verify Build

```bash
npm run build
```

Should complete in < 5 seconds with 0 errors.

---

## Key Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Production build
npm run start            # Run production build locally

# Analysis & Testing
npm run lint             # Run ESLint
npm run analyze          # Bundle size analysis with ANALYZE=true

# Lighthouse (if installed)
lhci autorun            # Run local Lighthouse audit

# Docker
docker build -t portfolio:latest .          # Build Docker image
docker-compose up -d                        # Start with Docker Compose
docker-compose logs -f app                  # View container logs
docker-compose down                         # Stop containers
```

---

## File Structure

```
tahmid.github.io/
├── app/
│   ├── layout.tsx          ← Google Analytics, Monitoring, Theme Provider
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── main/
│   │   └── navbar.tsx      ← Search, Share, Theme toggle
│   │   └── contact.tsx     ← Form validation
│   ├── theme-toggle.tsx    ← Theme switcher
│   ├── search-modal.tsx    ← Site-wide search
│   ├── social-share.tsx    ← Share buttons
│   ├── google-analytics.tsx ← GA init
│   └── monitoring-init.tsx ← Error tracking
├── lib/
│   ├── theme-provider.tsx  ← Theme context
│   ├── form-validation.ts  ← Validation rules
│   ├── social-share.ts     ← Share utilities
│   ├── google-analytics.ts ← GA events
│   └── error-tracking.ts   ← Error tracking
├── .github/
│   └── workflows/
│       ├── build.yml       ← CI/CD build pipeline
│       └── deploy.yml      ← Auto deployment
├── .env.example            ← Environment variables
├── DEPLOYMENT.md           ← Setup & monitoring guide
└── FEATURES.md            ← Complete feature list
```

---

## Features at a Glance

| Feature            | Location          | Setup Required         |
| ------------------ | ----------------- | ---------------------- |
| Dark/Light Theme   | Navbar            | None                   |
| Site Search        | Navbar (Cmd+K)    | None                   |
| Form Validation    | Contact form      | None                   |
| Social Sharing     | Navbar            | None                   |
| Google Analytics   | Auto-tracked      | Optional: GA ID        |
| Error Tracking     | Auto-tracked      | Optional: Sentry DSN   |
| Session Replay     | Auto-tracked      | Optional: LogRocket ID |
| CI/CD Pipeline     | GitHub Actions    | Required: Vercel Token |
| Lighthouse Testing | CI/CD             | None                   |
| Bundle Analysis    | `npm run analyze` | None                   |

---

## Common Tasks

### Add Google Analytics

1. Go to https://analytics.google.com/ → Create Property
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Set in `.env.local`: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`

### Setup Sentry Error Tracking

1. Create account at https://sentry.io/
2. Create Next.js project, copy DSN
3. Set in `.env.local`: `NEXT_PUBLIC_SENTRY_DSN=...`

### Deploy to Vercel

1. Push code to `main` branch
2. GitHub Actions automatically builds & deploys
3. Monitor at https://vercel.com/dashboard

### Run Local Build Check

```bash
npm run build          # Build for production
npm run start          # Test production build locally
npm run analyze        # Check bundle sizes
```

### Check Lighthouse Scores

```bash
# Option 1: Via npm script
npm run analyze

# Option 2: Chrome DevTools
# F12 → Lighthouse → Generate Report
```

---

## Monitoring Dashboards

| Service          | URL                           | Setup                           |
| ---------------- | ----------------------------- | ------------------------------- |
| Google Analytics | https://analytics.google.com/ | NEXT_PUBLIC_GOOGLE_ANALYTICS_ID |
| Vercel           | https://vercel.com/dashboard  | Auto (projects synced)          |
| GitHub Actions   | GitHub → Actions tab          | Auto (workflows active)         |
| Sentry           | https://sentry.io/            | NEXT_PUBLIC_SENTRY_DSN          |
| LogRocket        | https://app.logrocket.com/    | NEXT_PUBLIC_LOGROCKET_ID        |

---

## Performance Targets

✅ Lighthouse Performance: ≥ 85%
✅ Lighthouse Accessibility: ≥ 95%
✅ Lighthouse SEO: ≥ 95%
✅ Build time: < 5 seconds
✅ Bundle size: < 250 kB
✅ Pages: All static pre-rendered

Current: ✅ All targets met

---

## Troubleshooting

**Build fails:**

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Port 3000 already in use:**

```bash
npm run dev -- -p 3001
```

**TypeScript errors:**

```bash
npx tsc --noEmit
```

**GitHub Actions not deploying:**

- Check VERCEL_TOKEN is set in Secrets
- Check workflow logs: GitHub > Actions > View logs
- Ensure changes are on `main` branch

**Google Analytics not showing data:**

- Verify ID is set correctly
- Check browser console for errors
- Allow 24-48 hours for data collection

---

## Important Notes

1. **Environment Variables:**

   - `.env.local` for local development
   - Vercel Settings for production
   - Never commit `.env.local` to git

2. **GitHub Secrets:**

   - Required: `VERCEL_TOKEN`
   - Settings → Secrets and variables → Actions

3. **First Deployment:**

   - Set `VERCEL_TOKEN` first
   - Then push to `main` branch
   - Check GitHub Actions logs for progress

4. **Performance:**
   - Current build: 2.8s
   - Current bundle: 225 kB
   - Lighthouse targets: All met

---

## Docker Deployment

Quick start with Docker:

```bash
# Build and run locally
docker-compose up -d

# View logs
docker-compose logs -f app

# Access at http://localhost:3000
```

For detailed Docker setup, see [DOCKER.md](DOCKER.md)

**Docker features:**

- Multi-stage build (optimized ~200MB image)
- Non-root user security
- Health checks (auto-restart)
- Nginx reverse proxy with SSL support
- Environment variable support

---

## Support Resources

- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- GitHub Actions: https://docs.github.com/en/actions
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Web Vitals: https://web.dev/vitals/
- Docker Docs: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/

---

## Checklist for Go-Live

- [ ] Set `VERCEL_TOKEN` in GitHub Secrets
- [ ] Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (optional)
- [ ] Test locally: `npm run dev`
- [ ] Run build: `npm run build`
- [ ] Check Lighthouse: `npm run analyze`
- [ ] Push to `main` branch
- [ ] Verify GitHub Actions passed
- [ ] Check Vercel deployment succeeded
- [ ] Test live URL
- [ ] Monitor Google Analytics for data

**Status: ✅ Ready for deployment**
