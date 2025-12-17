#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Portfolio Deploy Script ===${NC}"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}Error: .env file not found${NC}"
    echo "Create .env file with DATABASE_URL first"
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Parse arguments
COMMAND=${1:-"help"}

case $COMMAND in
    "dev")
        echo -e "${GREEN}Starting development server...${NC}"
        pnpm dev
        ;;
    
    "build")
        echo -e "${GREEN}Building for production...${NC}"
        pnpm prisma generate
        pnpm build
        ;;
    
    "start")
        echo -e "${GREEN}Starting production server...${NC}"
        pnpm start
        ;;
    
    "db:up")
        echo -e "${GREEN}Starting database...${NC}"
        cd infrastructure && docker compose up -d db
        echo -e "${GREEN}Database started on localhost:5432${NC}"
        ;;
    
    "db:down")
        echo -e "${YELLOW}Stopping database...${NC}"
        cd infrastructure && docker compose down
        ;;
    
    "db:migrate")
        echo -e "${GREEN}Running database migrations...${NC}"
        pnpm prisma migrate deploy
        ;;
    
    "db:seed")
        echo -e "${GREEN}Seeding database...${NC}"
        pnpm db:seed
        ;;
    
    "db:reset")
        echo -e "${YELLOW}Resetting database...${NC}"
        pnpm prisma migrate reset --force
        pnpm db:seed
        echo -e "${GREEN}Database reset and seeded${NC}"
        ;;
    
    "docker:build")
        echo -e "${GREEN}Building Docker image...${NC}"
        docker build -f infrastructure/Dockerfile -t portfolio:latest .
        ;;
    
    "docker:up")
        echo -e "${GREEN}Starting all services with Docker Compose...${NC}"
        cd infrastructure && docker compose up -d
        echo -e "${GREEN}Services started:${NC}"
        echo "  - App: http://localhost:3000"
        echo "  - Database: localhost:5432"
        ;;
    
    "docker:down")
        echo -e "${YELLOW}Stopping all Docker services...${NC}"
        cd infrastructure && docker compose down
        ;;
    
    "docker:logs")
        cd infrastructure && docker compose logs -f
        ;;
    
    "setup")
        echo -e "${GREEN}Full setup...${NC}"
        
        # Check for pnpm
        if ! command -v pnpm &> /dev/null; then
            echo -e "${RED}pnpm not found. Installing...${NC}"
            npm install -g pnpm
        fi
        
        # Install dependencies
        echo -e "${BLUE}Installing dependencies...${NC}"
        pnpm install
        
        # Generate Prisma client
        echo -e "${BLUE}Generating Prisma client...${NC}"
        pnpm prisma generate
        
        # Start database
        echo -e "${BLUE}Starting database...${NC}"
        cd infrastructure && docker compose up -d db && cd ..
        
        # Wait for database
        echo -e "${BLUE}Waiting for database to be ready...${NC}"
        sleep 3
        
        # Run migrations
        echo -e "${BLUE}Running migrations...${NC}"
        pnpm prisma migrate deploy
        
        # Seed database
        echo -e "${BLUE}Seeding database...${NC}"
        pnpm db:seed
        
        echo -e "${GREEN}Setup complete!${NC}"
        echo "Run './deploy.sh dev' to start development server"
        ;;
    
    "help"|*)
        echo -e "${BLUE}Usage: ./deploy.sh <command>${NC}"
        echo ""
        echo "Commands:"
        echo "  ${GREEN}dev${NC}          - Start development server"
        echo "  ${GREEN}build${NC}        - Build for production"
        echo "  ${GREEN}start${NC}        - Start production server"
        echo ""
        echo "  ${GREEN}db:up${NC}        - Start PostgreSQL database"
        echo "  ${GREEN}db:down${NC}      - Stop database"
        echo "  ${GREEN}db:migrate${NC}   - Run database migrations"
        echo "  ${GREEN}db:seed${NC}      - Seed database with initial data"
        echo "  ${GREEN}db:reset${NC}     - Reset and reseed database"
        echo ""
        echo "  ${GREEN}docker:build${NC} - Build Docker image"
        echo "  ${GREEN}docker:up${NC}    - Start all services (app + db)"
        echo "  ${GREEN}docker:down${NC}  - Stop all Docker services"
        echo "  ${GREEN}docker:logs${NC}  - View Docker logs"
        echo ""
        echo "  ${GREEN}setup${NC}        - Full project setup"
        echo "  ${GREEN}help${NC}         - Show this help"
        ;;
esac
