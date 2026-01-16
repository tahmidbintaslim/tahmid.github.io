#!/bin/bash

# Portfolio Docker Cleanup & Maintenance Script
# Removes dangling images, stopped containers, and build cache

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Docker Cleanup & Maintenance${NC}"
echo ""

# Stop all running portfolio containers
echo -e "${YELLOW}Stopping running containers...${NC}"
docker-compose down 2>/dev/null || true

echo ""
echo -e "${YELLOW}Cleanup Options:${NC}"
echo "1. Remove dangling images"
echo "2. Remove all stopped containers"
echo "3. Remove build cache"
echo "4. Full cleanup (all of above)"
echo "5. Cancel"
echo ""

read -p "Select option (1-5): " option

case $option in
  1)
    echo -e "${YELLOW}Removing dangling images...${NC}"
    docker image prune -f
    echo -e "${GREEN}✓ Done${NC}"
    ;;
  2)
    echo -e "${YELLOW}Removing stopped containers...${NC}"
    docker container prune -f
    echo -e "${GREEN}✓ Done${NC}"
    ;;
  3)
    echo -e "${YELLOW}Removing build cache...${NC}"
    docker builder prune -f
    echo -e "${GREEN}✓ Done${NC}"
    ;;
  4)
    echo -e "${YELLOW}Running full cleanup...${NC}"
    docker image prune -f
    docker container prune -f
    docker builder prune -f
    echo ""
    echo -e "${YELLOW}Removing portfolio images...${NC}"
    docker rmi portfolio:latest -f 2>/dev/null || true
    echo -e "${GREEN}✓ Full cleanup complete${NC}"
    ;;
  5)
    echo -e "${YELLOW}Cancelled${NC}"
    ;;
  *)
    echo -e "${RED}Invalid option${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${YELLOW}Current Docker usage:${NC}"
docker system df

echo ""
echo -e "${GREEN}Cleanup complete!${NC}"
