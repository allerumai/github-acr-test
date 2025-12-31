.PHONY: build run stop clean test logs

# Build the Docker image
build:
	docker-compose build

# Run the container
run:
	docker-compose up -d

# Run in foreground (see logs)
run-live:
	docker-compose up

# Stop the container
stop:
	docker-compose down

# Remove containers and volumes
clean:
	docker-compose down -v
	docker rmi github-acr-test-app:latest 2>/dev/null || true

# View logs
logs:
	docker-compose logs -f

# Test the API
test:
	curl http://localhost:3000

# Rebuild and restart
restart: stop build run

# Build and run in one command
up: build run

