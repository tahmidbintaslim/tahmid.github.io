#!/bin/bash

# Portfolio Docker Build & Deploy Script
# Usage: ./scripts/docker-build.sh [tag] [push]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="${IMAGE_NAME:-portfolio}"
TAG="${1:-latest}"
REGISTRY="${REGISTRY:-}"
FULL_IMAGE="${REGISTRY:+$REGISTRY/}${IMAGE_NAME}:${TAG}"

echo -e "${YELLOW}Building Docker image...${NC}"
echo "Image: ${FULL_IMAGE}"

# Build the image
docker build \
  -t "${FULL_IMAGE}" \
  -t "${IMAGE_NAME}:latest" \
  --label "build.date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
  --label "vcs.ref=$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')" \
  .

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Build successful${NC}"
else
  echo -e "${RED}✗ Build failed${NC}"
  exit 1
fi

# Show image info
echo ""
echo -e "${YELLOW}Image Information:${NC}"
docker images "${FULL_IMAGE}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"

# Push if requested
if [ "$2" = "push" ]; then
  if [ -z "$REGISTRY" ]; then
    echo -e "${RED}✗ REGISTRY environment variable not set${NC}"
    exit 1
  fi
  
  echo ""
  echo -e "${YELLOW}Pushing image to registry...${NC}"
  docker push "${FULL_IMAGE}"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Push successful${NC}"
  else
    echo -e "${RED}✗ Push failed${NC}"
    exit 1
  fi
fi

echo ""
echo -e "${GREEN}Done!${NC}"
echo ""
echo "Next steps:"
echo "  Run locally:    docker run -p 3000:3000 ${FULL_IMAGE}"
echo "  With compose:   docker-compose up -d"
echo "  View logs:      docker logs portfolio-app"
