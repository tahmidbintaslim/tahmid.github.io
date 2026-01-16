# Docker Commands Quick Reference

## Essential Commands

### Development

```bash
# Initialize Docker environment (one-time)
./scripts/docker-setup.sh

# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f app
docker-compose logs app --tail=50

# Restart services
docker-compose restart

# Rebuild image
docker-compose build --no-cache
```

### Building

```bash
# Build local image
docker build -t portfolio:latest .

# Build with script
./scripts/docker-build.sh latest

# Build specific version
./scripts/docker-build.sh 1.0.0

# Build & push to registry
REGISTRY=docker.io/username ./scripts/docker-build.sh 1.0.0 push

# Multi-platform build (requires buildx)
docker buildx build --platform linux/amd64,linux/arm64 -t portfolio:latest .
```

### Running

```bash
# Run single container
docker run -p 3000:3000 portfolio:latest

# Run with environment file
docker-compose --env-file .env.docker up -d

# Run production setup
docker-compose -f docker-compose.prod.yml up -d

# Run with monitoring
docker-compose -f docker-compose.prod.yml --profile monitoring up -d
```

### Inspection

```bash
# List running containers
docker ps
docker-compose ps

# View container details
docker inspect portfolio-app
docker stats portfolio-app

# Check health status
docker ps --format "table {{.Names}}\t{{.Status}}"

# View image size
docker images portfolio

# Check logs
docker logs portfolio-app
docker logs portfolio-app --follow
docker logs portfolio-app --tail=100
```

### Cleanup

```bash
# Interactive cleanup menu
./scripts/docker-cleanup.sh

# Remove stopped containers
docker container prune -f

# Remove dangling images
docker image prune -f

# Remove build cache
docker builder prune -f

# Full system cleanup
docker system prune -a --volumes
```

### Registry & Pushing

```bash
# Tag image for Docker Hub
docker tag portfolio:latest username/portfolio:latest

# Login to registry
docker login
docker login registry.digitalocean.com
docker login gcr.io

# Push image
docker push username/portfolio:latest

# Pull image
docker pull username/portfolio:latest
```

## Environment Variables

### Set variables

```bash
# In .env file
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXX

# On command line
docker run -e NEXT_PUBLIC_APP_VERSION=1.0.0 portfolio:latest

# In docker-compose.yml (auto-loaded from .env.docker)
docker-compose --env-file .env.docker up -d
```

## Health Checks

### Test health endpoint

```bash
curl http://localhost:3000/health

# Monitor health status
docker ps --format "{{.Names}}\t{{.Status}}"

# Logs when unhealthy
docker logs portfolio-app
```

## Volume Management

### List volumes

```bash
docker volume ls
docker volume ls | grep portfolio
```

### Inspect volume

```bash
docker volume inspect portfolio-app-data
```

### Clean volumes

```bash
docker-compose down -v    # Remove volumes
docker volume prune -f    # Clean unused
```

## Network Management

### List networks

```bash
docker network ls
docker network inspect portfolio-network
```

### Container communication

```bash
# Within container
curl http://app:3000     # From nginx container
curl http://nginx:80     # From app container
```

## Troubleshooting

### Common Issues

```bash
# Port already in use
lsof -i :3000
kill -9 <PID>

# Container exits immediately
docker logs portfolio-app
docker run -it portfolio:latest /bin/sh

# Image build fails
docker build --no-cache -t portfolio:latest .
docker build --progress=plain -t portfolio:latest .

# Out of disk
docker system df
./scripts/docker-cleanup.sh

# Permission denied
sudo usermod -aG docker $USER
newgrp docker
```

## Docker Compose Extended

### Service management

```bash
# Start specific service
docker-compose up app

# Stop specific service
docker-compose stop app

# Restart service
docker-compose restart app

# Run one-off command
docker-compose exec app npm list

# Scale service (if configured)
docker-compose up -d --scale app=3
```

### Configuration

```bash
# Validate compose file
docker-compose config

# Show environment variables
docker-compose config | grep environment

# Check service status
docker-compose ps --services
```

## Production Commands

### Deploy

```bash
# Build production image
./scripts/docker-build.sh 1.0.0

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# Stop production services
docker-compose -f docker-compose.prod.yml down

# View all services
docker-compose -f docker-compose.prod.yml ps
```

### Monitoring

```bash
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001

# Start with monitoring profile
docker-compose -f docker-compose.prod.yml --profile monitoring up -d

# View monitoring logs
docker logs portfolio-prometheus
docker logs portfolio-grafana
```

### SSL Certificates

```bash
# Generate self-signed certificate (testing only)
openssl req -x509 -newkey rsa:4096 -nodes \
  -out ssl/cert.pem -keyout ssl/key.pem \
  -days 365 -subj "/CN=localhost"

# View certificate info
openssl x509 -in ssl/cert.pem -text -noout

# Check certificate expiry
openssl x509 -in ssl/cert.pem -noout -dates
```

## CI/CD Integration

### GitHub Actions

```bash
# View workflow runs
gh workflow view docker.yml
gh run list --workflow=docker.yml

# Trigger workflow manually
gh workflow run docker.yml

# View run logs
gh run view <run-id> --log
```

### Image tagging for releases

```bash
# Tag for version release
docker tag portfolio:latest portfolio:v1.0.0
docker tag portfolio:latest portfolio:stable
docker tag portfolio:latest portfolio:production

# Push all tags
docker push portfolio --all-tags
```

## Advanced Usage

### Multi-stage build inspection

```bash
# Build with specific target
docker build --target builder -t portfolio:builder .

# Build without cache
docker build --no-cache -t portfolio:latest .

# Build with labels
docker build -t portfolio:latest \
  --label version=1.0.0 \
  --label maintainer=rafi \
  .
```

### Container shell access

```bash
# Execute bash in running container
docker exec -it portfolio-app /bin/sh

# Run as different user
docker exec -u nextjs portfolio-app whoami

# Run with environment variable
docker exec -e DEBUG=true portfolio-app node script.js
```

### Resource limits (docker-compose)

```bash
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

## Quick Aliases (Optional)

Add to your shell profile (~/.zshrc or ~/.bashrc):

```bash
alias dbuild='./scripts/docker-build.sh'
alias dclean='./scripts/docker-cleanup.sh'
alias dsetup='./scripts/docker-setup.sh'
alias dup='docker-compose up -d'
alias ddown='docker-compose down'
alias dlogs='docker-compose logs -f app'
alias dps='docker-compose ps'
```

Then use:

```bash
dup          # Start containers
dlogs        # View logs
dps          # Check status
```

---

**Last Updated**: 2026-01-16
**Version**: 1.0
**For Help**: See DOCKER.md and DOCKER-SUMMARY.md
