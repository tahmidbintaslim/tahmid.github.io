# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your SMTP credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=tahmidbintaslimrafi@gmail.com
```

**Get Gmail App Password:** https://myaccount.google.com/apppasswords

### Step 3: Start Development
```bash
pnpm dev
```

Visit: http://localhost:3000

---

## 📋 Common Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm test             # Run all tests (env + images + api)
pnpm test:images      # Verify images
pnpm test:env         # Check environment
pnpm test:api         # Test API endpoints (requires dev server)
pnpm lint             # Run linter
```

---

## ✅ Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] `pnpm test` passes
- [ ] Contact form tested
- [ ] All images loading
- [ ] No console errors
- [ ] Lighthouse score > 90

---

## 📚 Documentation

- `ENV_SETUP.md` - Detailed environment setup
- `TESTING.md` - Testing guide
- `SETUP_COMPLETE.md` - Full improvements summary
- `README.md` - Project overview

---

## 🆘 Need Help?

1. Check documentation files above
2. Run `pnpm test` to diagnose issues
3. Check console for error messages
4. Verify `.env.local` is configured

---

## 🎉 You're Ready!

All improvements completed. Happy coding! 🚀
