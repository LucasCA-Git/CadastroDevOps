# Projeto de Sistema de Cadastro - Deploy na AWS com Terraform, Docker e CI/CD

Este projeto é um sistema simples de cadastro, desenvolvido com Node.js e Docker. A infraestrutura é provisionada automaticamente na AWS usando **Terraform** e o processo de deploy é gerenciado com **GitHub Actions** para implementar pipelines de **CI/CD**.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Estrutura da Infraestrutura](#estrutura-da-infraestrutura)
- [Configuração do Terraform](#configuração-do-terraform)
- [Pipeline CI/CD com GitHub Actions](#pipeline-ci-cd-com-github-actions)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Como Realizar o Deploy na AWS](#como-realizar-o-deploy-na-aws)
- [Acessando o Swagger](#acessando-o-swagger)
- [Considerações Finais](#considerações-finais)

## Visão Geral

A ideia deste projeto é fornecer uma infraestrutura automatizada para subir um sistema de cadastro na nuvem, utilizando **AWS EC2** para hospedar o sistema e **EKS** (Elastic Kubernetes Service) para gerenciar os containers, onde o sistema está configurado via **Docker**. O código é versionado e armazenado no GitHub, e o deploy é realizado automaticamente sempre que há alterações na branch `main` através de **GitHub Actions**.

![GitHub repo size](https://img.shields.io/github/repo-size/LucasCA-Git/CadastroDevOps?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/LucasCA-Git/CadastroDevOps?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/LucasCA-Git/CadastroDevOps?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/LucasCA-Git/CadastroDevOps?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/LucasCA-Git/CadastroDevOps?style=for-the-badge)

### Objetivo

- Provisão automática de infraestrutura na AWS utilizando **Terraform**.
- Automação de deploy usando pipeline CI/CD com **GitHub Actions**.
- Utilização de **ECR** para armazenar imagens Docker e **EKS** para gerenciar containers.
- Hospedagem do banco de dados MySQL em container na **EC2**.

## 📝 Licença

Esse Projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 💻 Pré-requisitos
Antes de começar, certifique-se de ter os seguintes itens instalados/localmente:

- Terraform
- AWS CLI
- Docker
- GitHub CLI ou autenticação configurada via SSH/Token

## Tecnologias Usadas

- **Terraform**: Provisionamento de infraestrutura como código.
- **AWS (Amazon Web Services)**:
  - **EC2**: Instância para rodar o sistema com Docker.
  - **ECR**: Armazenamento das imagens Docker.
  - **EKS**: Gerenciamento de containers com Kubernetes.
  - **IAM**: Controle de permissões.
- **Docker**: Containerização da aplicação e banco de dados.
- **MySQL**: Banco de dados utilizado.
- **GitHub Actions**: Automação de deploy com CI/CD.

## Estrutura da Infraestrutura

A infraestrutura na AWS é composta por:

- **VPC**: Rede privada que contém sub-redes para a EC2 e EKS.
- **EC2**: Instância para rodar a aplicação e o banco de dados MySQL dentro de containers Docker.
- **EKS**: Cluster Kubernetes para orquestração dos containers e deploy contínuo de novas versões da aplicação.
- **ECR**: Repositório Docker que armazena as imagens da aplicação.
- **IAM Roles**: Controlam as permissões necessárias para que o EKS e EC2 acessem o ECR e outros serviços.

### Diagrama Resumido

```plaintext
AWS Infra:
VPC -> Contém Sub-redes, EC2 (Docker + MySQL), e EKS.

EKS -> Gerencia os contêineres e usa imagens do ECR.

IAM Roles -> Controlam permissões de acesso.

ECR -> Armazena as imagens Docker.
```

## Configuração do Terraform
O Terraform é utilizado para automatizar a criação da infraestrutura na AWS. As principais configurações incluem:

- **VPC** : Rede privada para os recursos.
Subnets: Duas sub-redes para suportar o EC2 e o EKS.
- **EC2**: Instância criada com Docker e banco MySQL rodando em container.
- **ECR**: Repositório Docker para armazenar as imagens da aplicação.
- **EKS**: Cluster para orquestração de containers.

### Como rodar o Terraform

Lembando que precisa estar dentro da pasta do terraform nesse caso o main.tf (terraform/ec2)

Inicialize o Terraform:

```bash
terraform init
```
Crie o plano de execução:
```bash
terraform plan
```
Aplique a infraestrutura:
```bash
terraform apply -auto-approve
```

## Git Actions

**Pipeline CI/CD com GitHub Actions**
- O GitHub Actions é configurado para executar pipelines de CI/CD. Toda vez que o código é alterado na branch main, o Terraform é executado para provisionar ou atualizar a infraestrutura.

**Estrutura do Pipeline**

- Verificação de código: O pipeline verifica o repositório e configura o Terraform.
- Terraform Apply: Provisiona a infraestrutura na AWS.
- Deploy: Executa o Docker na EC2, configurando o MySQL e a aplicação.
- **O pipeline está definido no arquivo .github/workflows/terraform.yml**


## Como Realizar o Deploy na AWS
Certifique-se que o Terraform 
esteja configurado corretamente.

**Execute o pipeline CI/CD com GitHub Actions**, ou manualmente via:

```bash
terraform apply -auto-approve
```
A aplicação será provisionada na instância EC2 e o container Docker será iniciado com a aplicação rodando.

**Acessando o Swagger**
Após o deploy, a aplicação pode ser acessada via o endereço público da instância EC2, que estará rodando o Swagger da API. Você pode acessá-lo com:

```bash
http://<public-ip-da-ec2>/swagger
```

**Repositório GitHub**: [CadastroDevOps](https://github.com/LucasCA-Git/CadastroDevOps)
