variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "s3_bucket_name" {
  description = "Unique S3 bucket name for artifacts"
  type        = string
  default     = "shopsmart-artifacts-2026-unique"
}

variable "mongo_uri" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
  default     = "mongodb://localhost:27017/shopsmart"
}

variable "jwt_secret" {
  description = "JWT secret for authentication"
  type        = string
  sensitive   = true
  default     = "supersecretjwtkey_12345"
}
