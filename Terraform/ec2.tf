resource "aws_eip" "elastic_ip" {
  domain = "vpc"
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.ec2.id
  allocation_id = aws_eip.elastic_ip.id
}

resource "aws_instance" "ec2" {   
  ami                    = data.aws_ami.ami.image_id   
  instance_type          = "t2.micro"   
  key_name               = var.key-name   
  subnet_id              = aws_subnet.public-subnet.id   
  vpc_security_group_ids = [aws_security_group.security-group.id]   
  iam_instance_profile   = aws_iam_instance_profile.instance-profile.name   
  root_block_device {     
    volume_size = 15   
  }   
  user_data = templatefile("./tools-install.sh", {      
    SERVER_IP = aws_eip.elastic_ip.public_ip
  })    
  
  tags = {     
    Name = var.instance-name   
  } 
}

output "instance_public_ip" {   
  value = aws_eip.elastic_ip.public_ip 
}