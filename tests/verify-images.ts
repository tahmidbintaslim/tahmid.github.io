/**
 * Image Assets Verification
 * Checks if all referenced images exist in the public directory
 */

import { existsSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public');

const requiredImages = {
  projects: [
    'AP-Logo-on-White-Stack_Final_Hi.webp',
    'HvYrQMU4r6fe7KYdGkhJ.jpg',
    'RELEVANT-AUDIENCE.png',
    'c1_657976_150817065848_790.jpg',
    'chao-doi.png',
    'plantoys-24.jpg',
    'marions-kitchen.jpg',
    'klaviyo-integration.jpg',
    'tcas-system.jpg',
    'bettr.jpg',
    'adaptivity-gpt.jpg',
  ],
  skills: [
    'js.png',
    'ts.png',
    'go.png',
    'html.png',
    'css.png',
    'react.png',
    'next.png',
    'redux.png',
    'reactquery.png',
    'tailwind.png',
    'mui.png',
    'node.png',
    'express.png',
    'graphql.png',
    'mongodb.png',
    'postgresql.png',
    'mysql.png',
    'prisma.png',
    'firebase.png',
    'docker.png',
    'reactnative.png',
    'figma.png',
    'framer.png',
    'stripe.png',
  ],
  blog: [
    'react-performance.jpg',
    'nodejs-realtime.jpg',
    'nextjs-fullstack.jpg',
    'ai-ml-integration.jpg',
    'shopify-ecommerce.jpg',
    'cloud-aws.jpg',
  ],
  partners: [
    'ibm-watson.png',
    'openai.png',
    'devto.png',
    'google-cloud.png',
    'kaggle.png',
  ],
  root: [
    'hero-bg.svg',
    'lock-main.png',
    'lock-top.png',
    'logo.svg',
    'logo.png',
    'og-image.png',
  ],
};

function checkImages() {
  console.log('🖼️  Verifying image assets...\n');

  let allExist = true;
  let totalChecked = 0;
  let totalMissing = 0;

  for (const [category, images] of Object.entries(requiredImages)) {
    const dir = category === 'root' ? PUBLIC_DIR : join(PUBLIC_DIR, category);

    for (const image of images) {
      totalChecked++;
      const imagePath = join(dir, image);
      const exists = existsSync(imagePath);

      if (!exists) {
        console.log(`❌ Missing: ${category}/${image}`);
        allExist = false;
        totalMissing++;
      }
    }
  }

  if (allExist) {
    console.log(`✅ All ${totalChecked} images verified successfully!`);
  } else {
    console.log(
      `\n⚠️  ${totalMissing} missing images out of ${totalChecked} checked`
    );
  }

  return allExist;
}

const success = checkImages();
process.exit(success ? 0 : 1);
