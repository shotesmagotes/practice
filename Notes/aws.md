# AWS Reference

# Connecting

# SSH
Connect via SSH using the pem file created when initializing the instance in AWS originally. You will need to specify the path to this pem file in order to connect using the SSH client. You will also need the instance's public DNS name. To connect, use the following:

```bash
ssh -i /path/to/file.pem user_name@public_dns_name
```

where user_name is one of either:
1. ubuntu or root if Ubuntu
2. ec2-user if Amazon-Linux
3. ec2-user or root if RHEL
4. centos if Centos
5. ec2-user if Fedora

The user name will usually be ec2-user or root.

## VPC (Virtual Private Cloud)

