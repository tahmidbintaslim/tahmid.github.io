/**
 * Environment Variables Validation
 * Checks if all required environment variables are set
 */

import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

interface EnvCheck {
  name: string;
  required: boolean;
  description: string;
}

const envChecks: EnvCheck[] = [
  {
    name: 'SMTP_HOST',
    required: true,
    description: 'SMTP server host for email sending',
  },
  {
    name: 'SMTP_PORT',
    required: true,
    description: 'SMTP server port',
  },
  {
    name: 'SMTP_USER',
    required: true,
    description: 'SMTP authentication username',
  },
  {
    name: 'SMTP_PASS',
    required: true,
    description: 'SMTP authentication password',
  },
  {
    name: 'CONTACT_EMAIL',
    required: true,
    description: 'Email address to receive contact form submissions',
  },
  {
    name: 'NEWSAPI_KEY',
    required: false,
    description: 'NewsAPI key for news widget (optional)',
  },
  {
    name: 'ADMIN_API_KEY',
    required: false,
    description: 'Admin API key for protected endpoints (optional)',
  },
];

function validateEnv() {
  console.log('🔐 Validating environment variables...\n');

  let hasErrors = false;
  let hasWarnings = false;

  for (const check of envChecks) {
    const value = process.env[check.name];
    const isSet = value && value.trim() !== '';

    if (!isSet) {
      if (check.required) {
        console.log(`❌ REQUIRED: ${check.name}`);
        console.log(`   ${check.description}\n`);
        hasErrors = true;
      } else {
        console.log(`⚠️  OPTIONAL: ${check.name}`);
        console.log(`   ${check.description}\n`);
        hasWarnings = true;
      }
    } else {
      console.log(`✅ ${check.name}`);
    }
  }

  console.log('\n' + '='.repeat(50));

  if (hasErrors) {
    console.log('\n❌ Missing required environment variables!');
    console.log('📖 See ENV_SETUP.md for configuration instructions\n');
    return false;
  }

  if (hasWarnings) {
    console.log('\n⚠️  Some optional variables are not set');
    console.log('   The app will work but some features may be limited\n');
  } else {
    console.log('\n✅ All environment variables configured!\n');
  }

  return true;
}

const success = validateEnv();
process.exit(success ? 0 : 1);
