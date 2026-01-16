# Deployment & Monitoring Guide

## GitHub Actions CI/CD

The project includes automated CI/CD workflows for building, testing, and deploying to Vercel.

### Workflows

#### 1. **Build & Test** (`.github/workflows/build.yml`)

Runs on every push to `main` and `develop` branches, and on pull requests.

Features:

- Multi-node version testing (18.x, 20.x)
- Linting with ESLint
- TypeScript type checking
- Next.js build verification
- Bundle size analysis
- Lighthouse CI audits

**Artifacts:**

- Build artifacts are archived for inspection
- Lighthouse reports are uploaded

#### 2. **Deploy to Vercel** (`.github/workflows/deploy.yml`)

Automatically deploys to Vercel on push to `main` branch.

Features:

- Production deployment via Vercel CLI
- OpenGraph tag validation
- Meta tag verification

**Requirements:**

- Add `VERCEL_TOKEN` secret to GitHub repository settings

### Setup Instructions

1. **Connect to Vercel:**

   ```bash
   # In Vercel dashboard: Settings > Tokens > Create Token
   # Copy the token
   ```

2. **Add GitHub Secret:**

   - Go to: Settings > Secrets and variables > Actions > New repository secret
   - Name: `VERCEL_TOKEN`
   - Value: [Paste the token from Vercel]

3. **Push to trigger workflows:**
   ```bash
   git push origin main
   ```

---

## Monitoring & Error Tracking

### 1. Google Analytics

**Setup:**

1. Create a Google Analytics property: https://analytics.google.com/
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

**Features:**

- Page views & scroll depth
- Core Web Vitals tracking
- User demographics
- Event tracking for shares, searches, form submissions

**Usage in code:**

```typescript
import { logEvent, logSearch, logFormSubmit } from "@/lib/google-analytics";

// Track custom events
logEvent("button_click", { button_name: "subscribe" });
logSearch("react hooks", 42);
logFormSubmit("contact_form");
```

### 2. Sentry (Optional - Error Tracking)

**Setup:**

1. Create Sentry account: https://sentry.io/
2. Create a new project for your Next.js app
3. Copy the DSN
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

**Features:**

- Real-time error tracking
- Performance monitoring
- Release tracking
- Source map uploads

**Errors automatically captured:**

- Uncaught JavaScript errors
- Unhandled promise rejections
- Network errors

### 3. LogRocket (Optional - Session Replay)

**Setup:**

1. Create LogRocket account: https://logrocket.com/
2. Create a new project
3. Copy your App ID
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_LOGROCKET_ID=xxxxx/xxxxx
   ```

**Features:**

- Session recording & replay
- Console logs & network requests
- Redux/Vuex state tracking
- Error context with session

### 4. Custom Error Logging

Send errors to your own backend:

```bash
# Add to .env.local
NEXT_PUBLIC_ERROR_LOG_ENDPOINT=https://your-api.com/logs/errors
```

**Usage:**

```typescript
import { captureError, captureMessage } from "@/lib/error-tracking";

try {
  // your code
} catch (error) {
  captureError(error, {
    severity: "critical",
    context: { formName: "contact" },
  });
}

captureMessage("User completed onboarding", "info");
```

---

## Performance Monitoring

### Web Vitals

Automatically tracked in [lib/web-vitals.ts](../lib/web-vitals.ts):

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms
- **FCP** (First Contentful Paint): < 1.8s

Data is sent to:

1. Vercel Analytics (built-in)
2. Google Analytics (if configured)
3. Custom backend (if NEXT_PUBLIC_ERROR_LOG_ENDPOINT set)

---

## Lighthouse CI

**Configuration:** `lighthouserc.json`

**Performance Targets:**

- Performance: ≥ 85%
- Accessibility: ≥ 95%
- Best Practices: ≥ 90%
- SEO: ≥ 95%

**Core Web Vitals:**

- LCP ≤ 4000ms
- FCP ≤ 2500ms
- CLS ≤ 0.1

Run locally:

```bash
npm install -g @lhci/cli@latest
lhci autorun
```

---

## Deployment Checklist

- [ ] Set `VERCEL_TOKEN` in GitHub secrets
- [ ] Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (optional)
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN` (optional)
- [ ] Set `NEXT_PUBLIC_LOGROCKET_ID` (optional)
- [ ] Verify OpenGraph image at `public/og-image.png`
- [ ] Test build: `npm run build`
- [ ] Run locally: `npm run dev`
- [ ] Check Lighthouse scores: `npm run analyze`
- [ ] Push to main branch to trigger deployment

---

## Vercel Environment Variables

Add these to Vercel project settings (Settings > Environment Variables):

```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
NEXT_PUBLIC_LOGROCKET_ID=xxxxx/xxxxx
NEXT_PUBLIC_ERROR_LOG_ENDPOINT=https://your-api.com/logs
NEXT_PUBLIC_EMAILJS_SERVICE_ID=xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxx
```

---

## Monitoring Dashboard Links

- **Google Analytics:** https://analytics.google.com/
- **Vercel Analytics:** https://vercel.com/dashboard (Project > Analytics)
- **Sentry:** https://sentry.io/ (if configured)
- **LogRocket:** https://app.logrocket.com/ (if configured)

---

## Troubleshooting

**GitHub Actions failing:**

- Check workflow logs: GitHub > Actions > Select workflow > View logs
- Verify secrets are set correctly
- Ensure branch protection rules allow deployments

**Google Analytics not showing data:**

- Verify `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set
- Check browser console for gtag errors
- Allow 24-48 hours for initial data collection

**Lighthouse CI failing:**

- Run locally: `npm run analyze`
- Check `.lighthouse/` for detailed reports
- Adjust thresholds in `lighthouserc.json` if needed

**Sentry not capturing errors:**

- Verify DSN is correct
- Check browser Network tab for sentry requests
- Ensure error happens on production (not localhost)

---

## Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Google Analytics 4](https://support.google.com/analytics/answer/10089681)
- [Sentry for Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Web Vitals](https://web.dev/vitals/)
