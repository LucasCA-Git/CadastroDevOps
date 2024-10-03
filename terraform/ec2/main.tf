terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.69.0"
    }
  }

  required_version = ">= 0.14"
}

provider "aws" {
  region = "sa-east-1"
}

# Repositório ECR
resource "aws_ecr_repository" "meu_repositorio" {
  name                 = "meu-repositorio"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name = "Meu Repositório ECR"
  }
}

# IAM Role for EKS
resource "aws_iam_role" "eks_role" {
  name               = "eks-role"
  assume_role_policy = data.aws_iam_policy_document.eks_assume_role_policy.json
}

data "aws_iam_policy_document" "eks_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
  }
}

# Política IAM para o EKS Cluster
resource "aws_iam_policy" "eks_cluster_policy" {
  name        = "eks-cluster-policy"
  description = "EKS Cluster Policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "eks:DescribeCluster",
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

# Anexando a política à role
resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = aws_iam_policy.eks_cluster_policy.arn
  role       = aws_iam_role.eks_role.name
}

# Sub-rede 1 (exemplo)
resource "aws_subnet" "meus_subnets_1" {
  vpc_id                  = aws_vpc.meu_vpc.id
  cidr_block              = "10.0.3.0/24"  # Alterado para evitar conflito
  availability_zone       = "sa-east-1a"
  map_public_ip_on_launch = true
}

# Sub-rede 2 (exemplo)
resource "aws_subnet" "meus_subnets_2" {
  vpc_id                  = aws_vpc.meu_vpc.id
  cidr_block              = "10.0.4.0/24"  # Alterado para evitar conflito
  availability_zone       = "sa-east-1b"
  map_public_ip_on_launch = true
}

# Cluster EKS
resource "aws_eks_cluster" "meu_cluster" {
  name     = "meu-cluster"
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.meus_subnets_1.id,
      aws_subnet.meus_subnets_2.id,
    ]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
  ]
}

# Instância EC2
resource "aws_instance" "estudos" {
  count         = 1
  ami           = "ami-0c5410a9e09852edd" # Verifique a AMI para o Ubuntu
  instance_type = "t2.micro"
  key_name      = "UbuntuWSL-pub"
  tags = {
    Name = "EC2 criação de contas"
  }
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y docker.io
              sudo service docker start
              sudo usermod -aG docker $USER
              sudo docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=devops_project -p 3306:3306 -d mysql:latest
              EOF
}

# Saída do IP privado
output "ec2_private_ip" {
  value = aws_instance.estudos[0].private_ip
}

# VPC
resource "aws_vpc" "meu_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "Meu VPC"
  }
}
