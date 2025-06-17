# Start local database for development
up-dev:
	docker-compose --env-file env/.env.dev -f docker-compose.dev.yml up -d

down-dev:
	docker-compose --env-file env/.env.dev -f docker-compose.dev.yml down

# Full stack: database, backend, frontend
up-full:
	docker-compose --env-file env/.env.full -f docker-compose.full.yml up -d --build

down-full:
	docker-compose --env-file env/.env.full -f docker-compose.full.yml down

# Cleanup data and images (warning!)
clean:
	docker-compose --env-file env/.env.dev -f docker-compose.dev.yml down -v --rmi all
	docker-compose --env-file env/.env.full -f docker-compose.full.yml down -v --rmi all

# Quick login to backend container
backend-shell:
	docker exec -it poklet-backend bash

# Container status
ps:
	docker ps

# Rebuild and start stack (with cache)
rebuild-full:
	docker-compose --env-file env/.env.full -f docker-compose.full.yml up -d --build

# Rebuild and start stack (without cache)
rebuild-full-nocache:
	docker-compose --env-file env/.env.full -f docker-compose.full.yml up -d --build --no-cache