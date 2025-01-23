#!/bin/bash

# Update package lists
sudo apt update

# Install Docker
sudo apt install docker.io -y

# Add Ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Restart Docker service
sudo systemctl restart docker

# Set permissions for Docker socket
sudo chmod 777 /var/run/docker.sock

# Install Docker Compose
sudo apt install docker-compose -y

# Add Hashicorp GPG key and repository
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

# Update and install Terraform
sudo apt update
sudo apt install terraform -y

# Install Trivy
sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt update
sudo apt install trivy -y

# Clone the project
git clone https://github.com/ZaidAHMED94940/LendenClub_Devops_project.git

# Move project to home directory
mv LendenClub_Devops_project/ /home/ubuntu/

# Create backend .env file with Mongo URI and port
cat << EOF > /home/ubuntu/LendenClub_Devops_project/backend/.env
MONGO_URI=mongodb+srv://your_mongodb_connection_string
PORT=5000
EOF

# Create frontend .env file with the public IP of the server
cat << EOF > /home/ubuntu/LendenClub_Devops_project/frontend/.env
REACT_APP_BACKEND_API=http://${SERVER_IP}:5000
EOF

# Execute Docker Compose commands directly
cd /home/ubuntu/LendenClub_Devops_project
sudo docker-compose up --build -d
sudo docker-compose ps

# Optional: Set ownership to ubuntu user
sudo chown -R ubuntu:ubuntu /home/ubuntu/LendenClub_Devops_project
