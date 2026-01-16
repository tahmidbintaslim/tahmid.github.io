# Docker Guide

## Overview

Your portfolio is now fully containerized with:

- **Multi-stage Dockerfile** for optimized production builds
- **Docker Compose** for local development and production deployment
- **Nginx** reverse proxy with SSL/TLS support and security headers

## Quick Start

### Build and Run Locally

```bash
# Build the Docker image
docker build -t portfolio:latest .

# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f app
```

Application will be available at `http://localhost:3000`

### With Environment Variables

Create a `.env.docker` file:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://...
NEXT_PUBLIC_LOGROCKET_ID=...
```

Then run:

```bash
docker-compose --env-file .env.docker up -d
```

## Production Deployment

### 1. Build the Image

```bash
docker build -t portfolio:1.0.0 .

# Push to Docker Hub
docker tag portfolio:1.0.0 your-username/portfolio:1.0.0
docker push your-username/portfolio:1.0.0
```

### 2. Deploy with Docker Compose (Production)

```bash
# Start all services including Nginx
docker-compose --profile prod up -d

# Stop services
docker-compose down
```

### 3. SSL/TLS Setup

For production with HTTPS:

```bash
# Create ssl directory
mkdir -p ssl

# Add your certificates
# ssl/cert.pem - Your SSL certificate
# ssl/key.pem - Your private key

# Or generate self-signed certificates for testing
openssl req -x509 -newkey rsa:4096 -nodes -out ssl/cert.pem -keyout ssl/key.pem -days 365
```

### 4. Configure Nginx (Optional)

Edit `nginx.conf` to customize:

- Server name
- SSL settings
- Cache headers
- Rate limiting
- Security headers

## Docker Commands

```bash
# Build image
docker build -t portfolio:latest .

# Run container
docker run -p 3000:3000 portfolio:latest

# Run with environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXX \
  portfolio:latest

# View running containers
docker ps

# View container logs
docker logs container-id

# Stop container
docker stop container-id

# Remove container
docker rm container-id

# Remove image
docker rmi portfolio:latest
```

## Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild image
docker-compose build --no-cache

# Remove everything
docker-compose down -v
```

## Health Check

The container includes a health check endpoint:

```bash
# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}"

# Manual health check
curl http://localhost:3000/health
```

## Multi-Platform Builds

Build for multiple architectures:

```bash
# Build for ARM64 and AMD64
docker buildx build --platform linux/arm64,linux/amd64 -t portfolio:latest .

# Push multi-platform image
docker buildx build --platform linux/arm64,linux/amd64 -t your-username/portfolio:latest --push .
```

## Environment Variables in Docker

Supported environment variables for the container:

```
NODE_ENV=production              # Always production in runtime image
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID  # Google Analytics ID
NEXT_PUBLIC_SENTRY_DSN          # Sentry error tracking
NEXT_PUBLIC_LOGROCKET_ID        # LogRocket session replay
NEXT_PUBLIC_ERROR_LOG_ENDPOINT  # Custom error logging
NEXT_PUBLIC_APP_VERSION         # Application version
NEXT_PUBLIC_EMAILJS_*           # EmailJS configuration
PORT=3000                        # Application port (default 3000)
HOSTNAME=0.0.0.0               # Hostname binding
```

## Deployment Platforms

### Docker Hub

```bash
# Login
docker login

# Tag and push
docker tag portfolio:latest username/portfolio:latest
docker push username/portfolio:latest

# Deploy from Docker Hub
docker run -p 3000:3000 username/portfolio:latest
```

### AWS ECS

```bash
# Create ECS task definition with the Docker image
# Use docker-compose.yml as reference for environment variables
# Deploy to ECS cluster
```

### DigitalOcean

```bash
# Push to DigitalOcean Container Registry
docker login registry.digitalocean.com

docker tag portfolio:latest registry.digitalocean.com/your-registry/portfolio:latest
docker push registry.digitalocean.com/your-registry/portfolio:latest
```

### Google Cloud Run

```bash
# Push to Google Container Registry
docker tag portfolio:latest gcr.io/your-project/portfolio:latest
gcloud auth configure-docker
docker push gcr.io/your-project/portfolio:latest

# Deploy to Cloud Run
gcloud run deploy portfolio \
  --image gcr.io/your-project/portfolio:latest \
  --platform managed \
  --region us-central1 \
  --port 3000
```

### Azure Container Instances

```bash
# Create resource group
az group create --name portfolio-rg --location eastus

# Push to Azure Container Registry
az acr login --name your-registry
docker tag portfolio:latest your-registry.azurecr.io/portfolio:latest
docker push your-registry.azurecr.io/portfolio:latest

# Deploy to ACI
az container create \
  --resource-group portfolio-rg \
  --name portfolio \
  --image your-registry.azurecr.io/portfolio:latest \
  --port 3000 \
  --registry-login-server your-registry.azurecr.io
```

## Performance Tips

1. **Use multi-stage builds** - Already configured (reduces image size)
2. **Non-root user** - Running as `nextjs` user for security
3. **Health checks** - Automatically restart failing containers
4. **Resource limits** - Add limits in docker-compose.yml:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
        reservations:
          cpus: "0.25"
          memory: 256M
```

## Troubleshooting

### Container exits immediately

```bash
# Check logs
docker logs container-id

# Run with interactive terminal
docker run -it portfolio:latest /bin/sh
```

### Port already in use

```bash
# Change port in docker-compose.yml
# Or kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Build fails

```bash
# Build with verbose output
docker build --progress=plain -t portfolio:latest .

# Check Dockerfile syntax
docker build --check -t portfolio:latest .
```

### Database/Cache issues

```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t portfolio:latest .
```

## Security Considerations

1. **Non-root user** - Container runs as unprivileged `nextjs` user
2. **Health checks** - Automatic container restart on failure
3. **Resource limits** - Prevent resource exhaustion
4. **Nginx security headers** - Added HSTS, X-Frame-Options, etc.
5. **SSL/TLS** - HTTPS with proper certificate validation
6. **Rate limiting** - Nginx rate limits configured

## Image Size

Current Dockerfile produces optimized images:

- Base: Node 20 Alpine (~170MB)
- Final production image: ~200-250MB
- Reduced by ~60-70% vs non-optimized builds

## Links

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment/docker)
- [Nginx Documentation](https://nginx.org/en/)
