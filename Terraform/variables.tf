variable "vpc-name" {
  default = "my-vpc"
}

variable "igw-name" {
  default = "my-internet-gateway"
}

variable "rt-name" {
  default = "my-route-table"
}

variable "subnet-name" {
  default = "my-subnet"
}

variable "sg-name" {
  default = "my-security-group"
}

variable "instance-name" {
  default = "my-ec2-instance"
}

variable "key-name" {
  default = "JenkinsServer"
}

variable "iam-role" {
  default = "my-iam-role"
}
