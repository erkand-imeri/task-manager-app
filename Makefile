# Define environment variables
export $(shell cat .env | xargs)

# Install dependencies and build the Docker containers
install:
	docker compose build

# Create a new migration file (only run when entity changes occur)
migration-create:
	docker exec task_manager_app npx mikro-orm migration:create --config=src/database/mikro-orm.config.ts	

# Run migrations (ensure the container is running)
migrate:
	docker exec task_manager_app npx mikro-orm migration:up --config=src/database/mikro-orm.config.ts

# Initialize the database (apply migrations after container is up)
setup_db: migrate

# Start the Docker containers and apply migrations
run:	
	docker compose up && $(MAKE) migrate

# Clean up Docker containers and volumes
clean:
	docker compose down -v

# Stop the application
stop:
	docker compose down

# Restart the application
restart:
	docker compose down
	docker compose up -d && $(MAKE) migrate
