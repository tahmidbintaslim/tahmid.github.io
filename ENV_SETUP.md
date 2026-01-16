# Environment Setup

This project uses a local `.env.local` file for development configuration.

## Quick Setup

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in the values below.

## Required Variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-receiving-email@example.com
```

- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP auth username
- `SMTP_PASS`: SMTP auth password
- `CONTACT_EMAIL`: Destination for contact form submissions

## Optional Variables

```env
NEXT_PUBLIC_GNEWS_API_KEY=your-gnews-key
ADMIN_API_KEY=your-random-admin-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- `NEXT_PUBLIC_GNEWS_API_KEY`: Enables the news widget
- `ADMIN_API_KEY`: Protects admin endpoints
- `NEXT_PUBLIC_BASE_URL`: Base URL for API tests (defaults to `http://localhost:3000`)

## Gmail App Passwords

If you use Gmail, create an App Password and use it for `SMTP_PASS`:

https://myaccount.google.com/apppasswords

## Verify

Run the environment check:

```bash
pnpm test:env
```

If required variables are missing, the script will exit with a non-zero status.
