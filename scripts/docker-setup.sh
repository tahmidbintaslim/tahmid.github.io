#!/bin/bash

# Docker environment setup helper
# Creates necessary files and directories for Docker deployment

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Docker Environment Setup${NC}"
echo ""

# Create ssl directory
if [ ! -d "ssl" ]; then
  echo -e "${YELLOW}Creating SSL directory...${NC}"
  mkdir -p ssl
  echo -e "${GREEN}✓ SSL directory created${NC}"
else
  echo -e "${YELLOW}SSL directory already exists${NC}"
fi

# Create .env.docker if it doesn't exist
if [ ! -f ".env.docker" ]; then
  echo -e "${YELLOW}Creating .env.docker template...${NC}"
  cat > .env.docker << 'EOF'
# Docker environment variables
NODE_ENV=production

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=

# Error Tracking
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_LOGROCKET_ID=
NEXT_PUBLIC_ERROR_LOG_ENDPOINT=

# Application
NEXT_PUBLIC_APP_VERSION=1.0.0

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
EOF
  echo -e "${GREEN}✓ .env.docker created${NC}"
else
  echo -e "${YELLOW}.env.docker already exists${NC}"
fi

# Check for SSL certificates
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
  echo ""
  echo -e "${YELLOW}SSL certificates not found. Generating self-signed certificates...${NC}"
  echo -e "${YELLOW}(For production, replace with real certificates)${NC}"
  
  openssl req -x509 -newkey rsa:4096 -nodes \
    -out ssl/cert.pem -keyout ssl/key.pem \
    -days 365 -subj "/CN=localhost"
  
  echo -e "${GREEN}✓ Self-signed certificates generated${NC}"
  echo -e "${YELLOW}Note: Replace ssl/cert.pem and ssl/key.pem with production certificates${NC}"
else
  echo -e "${YELLOW}SSL certificates found${NC}"
fi

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit .env.docker with your configuration"
echo "  2. Run: docker-compose --env-file .env.docker up -d"
echo "  3. Access at http://localhost:3000"
echo ""
echo "For production:"
echo "  1. Replace ssl/cert.pem and ssl/key.pem with real certificates"
echo "  2. Update nginx.conf with your domain"
echo "  3. Run: docker-compose -f docker-compose.prod.yml up -d"
