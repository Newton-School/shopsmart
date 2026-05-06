##############################################################################
# ECS Infrastructure — ECR, Cluster, Task Definitions, Services
# Deploys ShopSmart client + server containers on ECS Fargate
##############################################################################

# ── Data Sources: Default VPC & Subnets ─────────────────────────────────────
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# ── ECR Repositories ────────────────────────────────────────────────────────
resource "aws_ecr_repository" "shopsmart_server" {
  name                 = var.ecr_server_repo_name
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_ecr_repository" "shopsmart_client" {
  name                 = var.ecr_client_repo_name
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }

  lifecycle {
    ignore_changes = [tags]
  }
}

# ── CloudWatch Log Groups ──────────────────────────────────────────────────
resource "aws_cloudwatch_log_group" "shopsmart_server" {
  name              = "/ecs/shopsmart-server"
  retention_in_days = 7

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }
}

resource "aws_cloudwatch_log_group" "shopsmart_client" {
  name              = "/ecs/shopsmart-client"
  retention_in_days = 7

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }
}

# ── IAM: Use existing LabRole (AWS Learner Lab) ─────────────────────────────
data "aws_iam_role" "lab_role" {
  name = "LabRole"
}

# ── ECS Cluster ─────────────────────────────────────────────────────────────
resource "aws_ecs_cluster" "shopsmart" {
  name = var.ecs_cluster_name

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }

  lifecycle {
    ignore_changes = [tags]
  }
}

# ── Security Group ──────────────────────────────────────────────────────────
resource "aws_security_group" "ecs_service" {
  name        = "shopsmart-ecs-sg"
  description = "Allow inbound traffic to ShopSmart ECS services"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "Server API"
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Client UI"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }
}

# ══════════════════════════════════════════════════════════════════════════════
# SERVER — Task Definition & Service
# ══════════════════════════════════════════════════════════════════════════════

resource "aws_ecs_task_definition" "shopsmart_server" {
  family                   = "shopsmart-server"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.lab_role.arn

  container_definitions = jsonencode([
    {
      name      = "shopsmart-server"
      image     = "${aws_ecr_repository.shopsmart_server.repository_url}:${var.server_image_tag}"
      essential = true

      portMappings = [
        {
          containerPort = 5001
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "PORT", value = "5001" },
        { name = "NODE_ENV", value = "production" }
      ]

      healthCheck = {
        command     = ["CMD-SHELL", "wget -qO- http://localhost:5001/health || exit 1"]
        interval    = 15
        timeout     = 5
        retries     = 3
        startPeriod = 30
      }

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.shopsmart_server.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "server"
        }
      }
    }
  ])

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }
}

resource "aws_ecs_service" "shopsmart_server" {
  name            = "shopsmart-server-service"
  cluster         = aws_ecs_cluster.shopsmart.id
  task_definition = aws_ecs_task_definition.shopsmart_server.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }

  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 200

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }

  lifecycle {
    ignore_changes = [task_definition, desired_count, tags]
  }
}

# ══════════════════════════════════════════════════════════════════════════════
# CLIENT — Task Definition & Service
# ══════════════════════════════════════════════════════════════════════════════

resource "aws_ecs_task_definition" "shopsmart_client" {
  family                   = "shopsmart-client"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.lab_role.arn

  container_definitions = jsonencode([
    {
      name      = "shopsmart-client"
      image     = "${aws_ecr_repository.shopsmart_client.repository_url}:${var.client_image_tag}"
      essential = true

      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      healthCheck = {
        command     = ["CMD-SHELL", "wget -qO- http://localhost:3000/health || exit 1"]
        interval    = 15
        timeout     = 5
        retries     = 3
        startPeriod = 30
      }

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.shopsmart_client.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "client"
        }
      }
    }
  ])

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }
}

resource "aws_ecs_service" "shopsmart_client" {
  name            = "shopsmart-client-service"
  cluster         = aws_ecs_cluster.shopsmart.id
  task_definition = aws_ecs_task_definition.shopsmart_client.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }

  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 200

  tags = {
    Project   = "ShopSmart"
    ManagedBy = "Terraform"
  }

  lifecycle {
    ignore_changes = [task_definition, desired_count, tags]
  }
}

