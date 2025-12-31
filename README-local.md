# Local Docker Testing

This guide shows how to test the application locally using Docker, simulating the GitHub Actions build process.

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and run
docker-compose up --build

# Or in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Using Makefile (Easier)

```bash
# Build and run
make up

# View logs
make logs

# Test API
make test

# Stop
make stop

# Clean up
make clean
```

### Using Docker directly

```bash
# Build image
docker build -t github-acr-test-local .

# Run container
docker run -d -p 3000:3000 --name github-acr-test-local github-acr-test-local

# View logs
docker logs -f github-acr-test-local

# Test
curl http://localhost:3000

# Stop
docker stop github-acr-test-local
docker rm github-acr-test-local
```

## Testing

Once running, test the API:

```bash
# Main endpoint
curl http://localhost:3000

# Expected response:
# {"message":"Hello from Azure Container Registry!","timestamp":"..."}
```

## Comparison: Local vs GitHub Actions

### Local Build
```bash
docker build -t github-acr-test-local .
docker run -p 3000:3000 github-acr-test-local
```

### GitHub Actions Build
```yaml
- name: Build and push image
  run: |
    docker build -t ${{ env.REGISTRY_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:${{ github.sha }} .
    docker push ${{ env.REGISTRY_NAME }}.azurecr.io/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

Same Dockerfile, same build process!

## Development Workflow

1. **Develop locally**
   ```bash
   make up
   # Test at http://localhost:3000
   ```

2. **Make changes**
   - Edit `index.js` or `package.json`
   - Rebuild: `make restart`

3. **Test before pushing**
   ```bash
   make test
   ```

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update app"
   git push origin main
   ```

5. **GitHub Actions builds and deploys**
   - Same Dockerfile
   - Same build process
   - Pushes to ACR
   - Container Apps deploys

## Troubleshooting

### Port already in use
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead
```

### Container won't start
```bash
# Check logs
make logs

# Rebuild from scratch
make clean
make up
```

### Changes not reflected
```bash
# Rebuild image
make restart
```

