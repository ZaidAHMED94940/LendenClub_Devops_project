# Project Setup Guide

## Directory Structure
```
.
├── terraform/
│   ├── variables.tf
│   ├── main.tf
│   └── terraform.tfvars
├── backend/
│   └── .env
├── frontend/
│   └── .env
└── docker-compose.yml
```

## 1. Terraform Setup and Deployment

### Export Required Variables
First, navigate to the terraform directory:
```bash
cd terraform
```

Export the necessary AWS credentials:
```bash
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_DEFAULT_REGION="your_region"
```

### Terraform Deployment Steps

1. Initialize Terraform:
```bash
terraform init
```
This command initializes Terraform, downloads required providers, and sets up the backend.

2. Review the deployment plan:
```bash
terraform plan
```
This command shows what changes Terraform will make to your infrastructure.

3. Apply the changes:
```bash
terraform apply
```
When prompted, type 'yes' to confirm the changes.

### Connecting to AWS Server
After successful deployment, get the server IP:
```bash
terraform output server_ip
```

Connect to the server:
```bash
ssh -i "your-key.pem" ubuntu@<server_ip>
```

## 2. Backend Configuration

Navigate to the backend directory:
```bash
cd ../backend
```

Create and configure the .env file:
```bash
cat << EOF > .env
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
API_PORT=3000
EOF
```

## 3. Frontend Configuration

Navigate to the frontend directory:
```bash
cd ../frontend
```

Create and configure the .env file:
```bash
cat << EOF > .env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=production
EOF
```

## 4. Application Deployment

Return to the main directory and start the application:
```bash
cd ..
docker-compose up -d --build
```

This command will:
- Build all services defined in docker-compose.yml
- Start the containers in detached mode
- Set up the network between containers

## 5. Monitoring

Monitor container resources:
```bash
docker stats
```

This will show real-time statistics for:
- Container CPU usage
- Memory usage
- Network I/O
- Block I/O

You can exit the stats view by pressing Ctrl+C.

## Troubleshooting

If containers fail to start:
1. Check logs: `docker-compose logs`
2. Verify environment variables are set correctly
3. Ensure all ports are available
4. Check network connectivity

For detailed logs of a specific service:
```bash
docker-compose logs <service_name>
```