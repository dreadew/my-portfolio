terraform {
  required_version = ">= 1.0"

  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  host = var.docker_host
}

# Variables
variable "docker_host" {
  description = "Docker host"
  type        = string
  default     = "unix:///var/run/docker.sock"
}

variable "postgres_user" {
  description = "PostgreSQL username"
  type        = string
  default     = "portfolio"
}

variable "postgres_password" {
  description = "PostgreSQL password"
  type        = string
  sensitive   = true
}

variable "postgres_db" {
  description = "PostgreSQL database name"
  type        = string
  default     = "portfolio"
}

variable "postgres_port" {
  description = "PostgreSQL external port"
  type        = number
  default     = 5432
}

variable "app_port" {
  description = "Application external port"
  type        = number
  default     = 3000
}

variable "admin_password_base64" {
  description = "Admin password in base64"
  type        = string
  sensitive   = true
}

# Network
resource "docker_network" "portfolio_network" {
  name = "portfolio-network"
}

# PostgreSQL Volume
resource "docker_volume" "postgres_data" {
  name = "portfolio-postgres-data"
}

# PostgreSQL Image
resource "docker_image" "postgres" {
  name         = "postgres:16-alpine"
  keep_locally = true
}

# PostgreSQL Container
resource "docker_container" "postgres" {
  name  = "portfolio-postgres"
  image = docker_image.postgres.image_id

  restart = "unless-stopped"

  networks_advanced {
    name = docker_network.portfolio_network.name
  }

  ports {
    internal = 5432
    external = var.postgres_port
  }

  volumes {
    volume_name    = docker_volume.postgres_data.name
    container_path = "/var/lib/postgresql/data"
  }

  env = [
    "POSTGRES_USER=${var.postgres_user}",
    "POSTGRES_PASSWORD=${var.postgres_password}",
    "POSTGRES_DB=${var.postgres_db}"
  ]

  healthcheck {
    test         = ["CMD-SHELL", "pg_isready -U ${var.postgres_user} -d ${var.postgres_db}"]
    interval     = "10s"
    timeout      = "5s"
    retries      = 5
    start_period = "10s"
  }
}

# App Image (built locally)
resource "docker_image" "app" {
  name = "portfolio-app:latest"

  build {
    context    = "${path.module}/../.."
    dockerfile = "infrastructure/Dockerfile"
  }

  triggers = {
    # Rebuild when these files change
    dockerfile_hash = filemd5("${path.module}/../Dockerfile")
  }
}

# App Container
resource "docker_container" "app" {
  name  = "portfolio-app"
  image = docker_image.app.image_id

  restart = "unless-stopped"

  networks_advanced {
    name = docker_network.portfolio_network.name
  }

  ports {
    internal = 3000
    external = var.app_port
  }

  env = [
    "DATABASE_URL=postgresql://${var.postgres_user}:${var.postgres_password}@portfolio-postgres:5432/${var.postgres_db}",
    "NEXT_PUBLIC_ADMIN_PASSWORD_BASE64=${var.admin_password_base64}"
  ]

  depends_on = [
    docker_container.postgres
  ]
}

# Outputs
output "postgres_connection_string" {
  description = "PostgreSQL connection string"
  value       = "postgresql://${var.postgres_user}:****@localhost:${var.postgres_port}/${var.postgres_db}"
}

output "app_url" {
  description = "Application URL"
  value       = "http://localhost:${var.app_port}"
}
