# Testing Guide

## Commands

```bash
pnpm test        # Runs env, image, and API tests
pnpm test:env    # Validate required environment variables
pnpm test:images # Verify required images exist in /public
pnpm test:api    # Check API endpoints (requires a running server)
pnpm test:security # Run CSRF + security header checks (requires a running server)
```

## API Tests

`pnpm test:api` expects the Next.js server to be running.

```bash
pnpm dev
pnpm test:api
```

By default, the test targets `http://localhost:3000`. Override this with:

```env
NEXT_PUBLIC_BASE_URL=https://your-deployment-url
```

## Notes

- `pnpm test` will fail if required environment variables are missing.
- `pnpm test` will fail if API endpoints are unreachable or return non-2xx responses.
