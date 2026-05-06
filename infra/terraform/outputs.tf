##############################################################################
# Outputs
##############################################################################

output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.shopsmart.id
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.shopsmart.arn
}

output "bucket_region" {
  description = "Region of the S3 bucket"
  value       = aws_s3_bucket.shopsmart.region
}

output "versioning_status" {
  description = "Versioning status of the bucket"
  value       = aws_s3_bucket_versioning.shopsmart.versioning_configuration[0].status
}

# ── Phase 3: ECS Outputs ────────────────────────────────────────────────────

output "ecr_server_repository_url" {
  description = "URL of the server ECR repository"
  value       = aws_ecr_repository.shopsmart_server.repository_url
}

output "ecr_client_repository_url" {
  description = "URL of the client ECR repository"
  value       = aws_ecr_repository.shopsmart_client.repository_url
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.shopsmart.name
}

output "ecs_server_service_name" {
  description = "Name of the server ECS service"
  value       = aws_ecs_service.shopsmart_server.name
}

output "ecs_client_service_name" {
  description = "Name of the client ECS service"
  value       = aws_ecs_service.shopsmart_client.name
}
