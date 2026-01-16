#!/bin/bash
# Bundle analyzer script for Next.js
# Usage: npm run analyze

# Install bundle analyzer if not present
if ! npm list @next/bundle-analyzer &>/dev/null; then
  echo "Installing @next/bundle-analyzer..."
  npm install --save-dev @next/bundle-analyzer
fi

# Set environment variable to analyze bundle
ANALYZE=true npm run build

echo ""
echo "✅ Bundle analysis complete!"
echo "📊 Check the .next folder for size reports"
echo ""
echo "📈 Bundle Analysis Tips:"
echo "  - Look for large chunks that can be code-split"
echo "  - Check for duplicate dependencies"
echo "  - Identify third-party scripts consuming space"
echo "  - Consider dynamic imports for large components"
