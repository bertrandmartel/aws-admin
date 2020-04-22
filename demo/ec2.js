export default {
  getInstances(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "Reservations": [{
          "Groups": null,
          "Instances": [{
            "AmiLaunchIndex": 0,
            "Architecture": "x86_64",
            "BlockDeviceMappings": [{
              "DeviceName": "/dev/xvda",
              "Ebs": {
                "AttachTime": "2020-04-21T05:56:17Z",
                "DeleteOnTermination": true,
                "Status": "attached",
                "VolumeId": "vol-0ed1c813843ae1949"
              }
            }],
            "CapacityReservationId": null,
            "CapacityReservationSpecification": {
              "CapacityReservationPreference": "open",
              "CapacityReservationTarget": null
            },
            "ClientToken": "infra-NatIn-1YUGZT7YNCNH",
            "CpuOptions": {
              "CoreCount": 1,
              "ThreadsPerCore": 1
            },
            "EbsOptimized": false,
            "ElasticGpuAssociations": null,
            "ElasticInferenceAcceleratorAssociations": null,
            "EnaSupport": true,
            "HibernationOptions": {
              "Configured": false
            },
            "Hypervisor": "xen",
            "IamInstanceProfile": {
              "Arn": "arn:aws:iam::123456789012:instance-profile/infrastructure-stack-InstanceProfile-1CO0CQG5R5UP",
              "Id": "ABCDEFGHIJKLMNOP"
            },
            "ImageId": "ami-0050bb60cea70c5b3",
            "InstanceId": "i-052fe68488ebab7c5",
            "InstanceLifecycle": null,
            "InstanceType": "t2.micro",
            "KernelId": null,
            "KeyName": null,
            "LaunchTime": "2020-04-21T05:56:16Z",
            "Licenses": null,
            "MetadataOptions": {
              "HttpEndpoint": "enabled",
              "HttpPutResponseHopLimit": 1,
              "HttpTokens": "optional",
              "State": "applied"
            },
            "Monitoring": {
              "State": "disabled"
            },
            "NetworkInterfaces": [{
              "Association": {
                "IpOwnerId": "123456789012",
                "PublicDnsName": "ec2-15-200-58-41.eu-west-3.compute.amazonaws.com",
                "PublicIp": "15.200.58.41"
              },
              "Attachment": {
                "AttachTime": "2020-04-21T05:56:16Z",
                "AttachmentId": "eni-attach-0c7b8fcccb69ac8a9",
                "DeleteOnTermination": true,
                "DeviceIndex": 0,
                "Status": "attached"
              },
              "Description": "",
              "Groups": [{
                "GroupId": "sg-024ff2d6cc39a7603",
                "GroupName": "infrastructure-stack-NATSGAZ2-1Y0N170OIEYSC"
              }],
              "InterfaceType": "interface",
              "Ipv6Addresses": null,
              "MacAddress": "0a:28:d6:18:e6:16",
              "NetworkInterfaceId": "eni-0b7e661274c11391a",
              "OwnerId": "123456789012",
              "PrivateDnsName": "ip-172-16-1-207.eu-west-3.compute.internal",
              "PrivateIpAddress": "172.16.1.207",
              "PrivateIpAddresses": [{
                "Association": {
                  "IpOwnerId": "123456789012",
                  "PublicDnsName": "ec2-15-200-58-41.eu-west-3.compute.amazonaws.com",
                  "PublicIp": "15.200.58.41"
                },
                "Primary": true,
                "PrivateDnsName": "ip-172-16-1-207.eu-west-3.compute.internal",
                "PrivateIpAddress": "172.16.1.207"
              }],
              "SourceDestCheck": false,
              "Status": "in-use",
              "SubnetId": "subnet-003cf9832775e946a",
              "VpcId": "vpc-0f123456789123456"
            }],
            "OutpostArn": null,
            "Placement": {
              "Affinity": null,
              "AvailabilityZone": "eu-west-3b",
              "GroupName": "",
              "HostId": null,
              "HostResourceGroupArn": null,
              "PartitionNumber": null,
              "SpreadDomain": null,
              "Tenancy": "default"
            },
            "Platform": null,
            "PrivateDnsName": "ip-172-16-1-207.eu-west-3.compute.internal",
            "PrivateIpAddress": "172.16.1.207",
            "ProductCodes": null,
            "PublicDnsName": "ec2-15-200-58-41.eu-west-3.compute.amazonaws.com",
            "PublicIpAddress": "15.200.58.41",
            "RamdiskId": null,
            "RootDeviceName": "/dev/xvda",
            "RootDeviceType": "ebs",
            "SecurityGroups": [{
              "GroupId": "sg-024ff2d6cc39a7603",
              "GroupName": "infrastructure-stack-NATSGAZ2-1Y0N170OIEYSC"
            }],
            "SourceDestCheck": false,
            "SpotInstanceRequestId": null,
            "SriovNetSupport": null,
            "State": {
              "Code": 16,
              "Name": "running"
            },
            "StateReason": null,
            "StateTransitionReason": "",
            "SubnetId": "subnet-003cf9832775e946a",
            "Tags": [{
              "Key": "aws:cloudformation:stack-id",
              "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-8394-11ea-b4b5-0e3a535926a2"
            }, {
              "Key": "aws:cloudformation:stack-name",
              "Value": "infrastructure-stack"
            }, {
              "Key": "aws:cloudformation:logical-id",
              "Value": "NatInstanceAZ2"
            }, {
              "Key": "Name",
              "Value": "infrastructure-stack-NI2"
            }],
            "VirtualizationType": "hvm",
            "VpcId": "vpc-0f123456789123456"
          }],
          "OwnerId": "123456789012",
          "RequesterId": "962022475371",
          "ReservationId": "r-0755b26b2c79325eb"
        }, {
          "Groups": null,
          "Instances": [{
            "AmiLaunchIndex": 0,
            "Architecture": "x86_64",
            "BlockDeviceMappings": [{
              "DeviceName": "/dev/xvda",
              "Ebs": {
                "AttachTime": "2020-04-21T05:56:17Z",
                "DeleteOnTermination": true,
                "Status": "attached",
                "VolumeId": "vol-0fe2a2a29d032306a"
              }
            }],
            "CapacityReservationId": null,
            "CapacityReservationSpecification": {
              "CapacityReservationPreference": "open",
              "CapacityReservationTarget": null
            },
            "ClientToken": "infra-NatIn-1HQ1WJXPZ6XFA",
            "CpuOptions": {
              "CoreCount": 1,
              "ThreadsPerCore": 1
            },
            "EbsOptimized": false,
            "ElasticGpuAssociations": null,
            "ElasticInferenceAcceleratorAssociations": null,
            "EnaSupport": true,
            "HibernationOptions": {
              "Configured": false
            },
            "Hypervisor": "xen",
            "IamInstanceProfile": {
              "Arn": "arn:aws:iam::123456789012:instance-profile/infrastructure-stack-InstanceProfile-1CO0CQG5R5UP",
              "Id": "ABCDEFGHIJKLMNOP"
            },
            "ImageId": "ami-0050bb60cea70c5b3",
            "InstanceId": "i-0ac968a3e377106a9",
            "InstanceLifecycle": null,
            "InstanceType": "t2.micro",
            "KernelId": null,
            "KeyName": null,
            "LaunchTime": "2020-04-21T05:56:16Z",
            "Licenses": null,
            "MetadataOptions": {
              "HttpEndpoint": "enabled",
              "HttpPutResponseHopLimit": 1,
              "HttpTokens": "optional",
              "State": "applied"
            },
            "Monitoring": {
              "State": "disabled"
            },
            "NetworkInterfaces": [{
              "Association": {
                "IpOwnerId": "123456789012",
                "PublicDnsName": "ec2-15-200-125-223.eu-west-3.compute.amazonaws.com",
                "PublicIp": "15.200.125.223"
              },
              "Attachment": {
                "AttachTime": "2020-04-21T05:56:16Z",
                "AttachmentId": "eni-attach-0dac956681fa1f751",
                "DeleteOnTermination": true,
                "DeviceIndex": 0,
                "Status": "attached"
              },
              "Description": "",
              "Groups": [{
                "GroupId": "sg-0affb3de1f417703f",
                "GroupName": "infrastructure-stack-NATSGAZ1-1LHNIB2KP5V5E"
              }],
              "InterfaceType": "interface",
              "Ipv6Addresses": null,
              "MacAddress": "07:01:f3:ff:02:e2",
              "NetworkInterfaceId": "eni-09c7a82ca3bd304f6",
              "OwnerId": "123456789012",
              "PrivateDnsName": "ip-172-16-0-254.eu-west-3.compute.internal",
              "PrivateIpAddress": "172.16.0.254",
              "PrivateIpAddresses": [{
                "Association": {
                  "IpOwnerId": "123456789012",
                  "PublicDnsName": "ec2-15-200-125-223.eu-west-3.compute.amazonaws.com",
                  "PublicIp": "15.200.125.223"
                },
                "Primary": true,
                "PrivateDnsName": "ip-172-16-0-254.eu-west-3.compute.internal",
                "PrivateIpAddress": "172.16.0.254"
              }],
              "SourceDestCheck": false,
              "Status": "in-use",
              "SubnetId": "subnet-029edb9493a17af8e",
              "VpcId": "vpc-0f123456789123456"
            }],
            "OutpostArn": null,
            "Placement": {
              "Affinity": null,
              "AvailabilityZone": "eu-west-3a",
              "GroupName": "",
              "HostId": null,
              "HostResourceGroupArn": null,
              "PartitionNumber": null,
              "SpreadDomain": null,
              "Tenancy": "default"
            },
            "Platform": null,
            "PrivateDnsName": "ip-172-16-0-254.eu-west-3.compute.internal",
            "PrivateIpAddress": "172.16.0.254",
            "ProductCodes": null,
            "PublicDnsName": "ec2-15-200-125-223.eu-west-3.compute.amazonaws.com",
            "PublicIpAddress": "15.200.125.223",
            "RamdiskId": null,
            "RootDeviceName": "/dev/xvda",
            "RootDeviceType": "ebs",
            "SecurityGroups": [{
              "GroupId": "sg-0affb3de1f417703f",
              "GroupName": "infrastructure-stack-NATSGAZ1-1LHNIB2KP5V5E"
            }],
            "SourceDestCheck": false,
            "SpotInstanceRequestId": null,
            "SriovNetSupport": null,
            "State": {
              "Code": 16,
              "Name": "running"
            },
            "StateReason": null,
            "StateTransitionReason": "",
            "SubnetId": "subnet-029edb9493a17af8e",
            "Tags": [{
              "Key": "aws:cloudformation:logical-id",
              "Value": "NatInstanceAZ1"
            }, {
              "Key": "Name",
              "Value": "infrastructure-stack-NI1"
            }, {
              "Key": "aws:cloudformation:stack-id",
              "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
            }, {
              "Key": "aws:cloudformation:stack-name",
              "Value": "infrastructure-stack"
            }],
            "VirtualizationType": "hvm",
            "VpcId": "vpc-0f123456789123456"
          }],
          "OwnerId": "123456789012",
          "RequesterId": "962022475371",
          "ReservationId": "r-0aee1fb474074e75f"
        }, {
          "Groups": null,
          "Instances": [{
            "AmiLaunchIndex": 0,
            "Architecture": "x86_64",
            "BlockDeviceMappings": [{
              "DeviceName": "/dev/xvda",
              "Ebs": {
                "AttachTime": "2020-04-21T05:56:17Z",
                "DeleteOnTermination": true,
                "Status": "attached",
                "VolumeId": "vol-07acc42f24878ea32"
              }
            }],
            "CapacityReservationId": null,
            "CapacityReservationSpecification": {
              "CapacityReservationPreference": "open",
              "CapacityReservationTarget": null
            },
            "ClientToken": "infra-NatIn-1UAIK88P4JTFH",
            "CpuOptions": {
              "CoreCount": 1,
              "ThreadsPerCore": 1
            },
            "EbsOptimized": false,
            "ElasticGpuAssociations": null,
            "ElasticInferenceAcceleratorAssociations": null,
            "EnaSupport": true,
            "HibernationOptions": {
              "Configured": false
            },
            "Hypervisor": "xen",
            "IamInstanceProfile": {
              "Arn": "arn:aws:iam::123456789012:instance-profile/infrastructure-stack-InstanceProfile-1CO0CQG5R5UP",
              "Id": "ABCDEFGHIJKLMNOP"
            },
            "ImageId": "ami-0050bb60cea70c5b3",
            "InstanceId": "i-0b3a05baa4cc60486",
            "InstanceLifecycle": null,
            "InstanceType": "t2.micro",
            "KernelId": null,
            "KeyName": null,
            "LaunchTime": "2020-04-21T05:56:17Z",
            "Licenses": null,
            "MetadataOptions": {
              "HttpEndpoint": "enabled",
              "HttpPutResponseHopLimit": 1,
              "HttpTokens": "optional",
              "State": "applied"
            },
            "Monitoring": {
              "State": "disabled"
            },
            "NetworkInterfaces": [{
              "Association": {
                "IpOwnerId": "123456789012",
                "PublicDnsName": "ec2-15-200-141-132.eu-west-3.compute.amazonaws.com",
                "PublicIp": "15.200.141.132"
              },
              "Attachment": {
                "AttachTime": "2020-04-21T05:56:17Z",
                "AttachmentId": "eni-attach-0a9554cd95a0b53a5",
                "DeleteOnTermination": true,
                "DeviceIndex": 0,
                "Status": "attached"
              },
              "Description": "",
              "Groups": [{
                "GroupId": "sg-0365dd28384f9ee30",
                "GroupName": "infrastructure-stack-NATSGAZ3-P76FG3XAC6LU"
              }],
              "InterfaceType": "interface",
              "Ipv6Addresses": null,
              "MacAddress": "0f:e0:6a:14:6c:4c",
              "NetworkInterfaceId": "eni-075ef638eb0a143b4",
              "OwnerId": "123456789012",
              "PrivateDnsName": "ip-172-16-2-233.eu-west-3.compute.internal",
              "PrivateIpAddress": "172.16.2.233",
              "PrivateIpAddresses": [{
                "Association": {
                  "IpOwnerId": "123456789012",
                  "PublicDnsName": "ec2-15-200-141-132.eu-west-3.compute.amazonaws.com",
                  "PublicIp": "15.200.141.132"
                },
                "Primary": true,
                "PrivateDnsName": "ip-172-16-2-233.eu-west-3.compute.internal",
                "PrivateIpAddress": "172.16.2.233"
              }],
              "SourceDestCheck": false,
              "Status": "in-use",
              "SubnetId": "subnet-0526a5ce7456f54f3",
              "VpcId": "vpc-0f123456789123456"
            }],
            "OutpostArn": null,
            "Placement": {
              "Affinity": null,
              "AvailabilityZone": "eu-west-3c",
              "GroupName": "",
              "HostId": null,
              "HostResourceGroupArn": null,
              "PartitionNumber": null,
              "SpreadDomain": null,
              "Tenancy": "default"
            },
            "Platform": null,
            "PrivateDnsName": "ip-172-16-2-233.eu-west-3.compute.internal",
            "PrivateIpAddress": "172.16.2.233",
            "ProductCodes": null,
            "PublicDnsName": "ec2-15-200-141-132.eu-west-3.compute.amazonaws.com",
            "PublicIpAddress": "15.200.141.132",
            "RamdiskId": null,
            "RootDeviceName": "/dev/xvda",
            "RootDeviceType": "ebs",
            "SecurityGroups": [{
              "GroupId": "sg-0365dd28384f9ee30",
              "GroupName": "infrastructure-stack-NATSGAZ3-P76FG3XAC6LU"
            }],
            "SourceDestCheck": false,
            "SpotInstanceRequestId": null,
            "SriovNetSupport": null,
            "State": {
              "Code": 16,
              "Name": "running"
            },
            "StateReason": null,
            "StateTransitionReason": "",
            "SubnetId": "subnet-0526a5ce7456f54f3",
            "Tags": [{
              "Key": "aws:cloudformation:stack-id",
              "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
            }, {
              "Key": "Name",
              "Value": "infrastructure-stack-NI3"
            }, {
              "Key": "aws:cloudformation:logical-id",
              "Value": "NatInstanceAZ3"
            }, {
              "Key": "aws:cloudformation:stack-name",
              "Value": "infrastructure-stack"
            }],
            "VirtualizationType": "hvm",
            "VpcId": "vpc-0f123456789123456"
          }],
          "OwnerId": "123456789012",
          "RequesterId": "123456789123",
          "ReservationId": "r-01234561265e194967"
        }]
      }
    })
  },
  rebootInstance(data, cb, errorCb) {

  },
  startInstance(data, cb, errorCb) {

  },
  stopInstance(data, cb, errorCb) {

  },
  terminateInstance(data, cb, errorCb) {

  },
  getVPC(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "Vpcs": [{
          "CidrBlock": "172.31.0.0/16",
          "CidrBlockAssociationSet": [{
            "AssociationId": "vpc-cidr-assoc-651fe90d",
            "CidrBlock": "172.31.0.0/16",
            "CidrBlockState": {
              "State": "associated",
              "StatusMessage": null
            }
          }],
          "DhcpOptionsId": "dopt-bc9184d5",
          "InstanceTenancy": "default",
          "Ipv6CidrBlockAssociationSet": null,
          "IsDefault": true,
          "OwnerId": "123456789012",
          "State": "available",
          "Tags": null,
          "VpcId": "vpc-defabc12"
        }, {
          "CidrBlock": "172.16.0.0/20",
          "CidrBlockAssociationSet": [{
            "AssociationId": "vpc-cidr-assoc-0e3e1a398ce9efb96",
            "CidrBlock": "172.16.0.0/20",
            "CidrBlockState": {
              "State": "associated",
              "StatusMessage": null
            }
          }],
          "DhcpOptionsId": "dopt-bc9184d5",
          "InstanceTenancy": "default",
          "Ipv6CidrBlockAssociationSet": null,
          "IsDefault": false,
          "OwnerId": "123456789012",
          "State": "available",
          "Tags": [{
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }, {
            "Key": "Name",
            "Value": "infrastructure-stack-VPC"
          }, {
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "VPC"
          }],
          "VpcId": "vpc-123456756789123456"
        }]
      }
    })
  },
  getSubnets(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "Subnets": [{
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3a",
          "AvailabilityZoneId": "euw3-az1",
          "AvailableIpAddressCount": 251,
          "CidrBlock": "172.16.3.0/24",
          "DefaultForAz": false,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": false,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-03db70532e0f2be9b",
          "SubnetId": "subnet-03db70532e0f2be9b",
          "Tags": [{
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "Name",
            "Value": "infrastructure-stack-PrivateSubnetAZ1"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "PrivateSubnetAZ1"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3c",
          "AvailabilityZoneId": "euw3-az3",
          "AvailableIpAddressCount": 251,
          "CidrBlock": "172.16.5.0/24",
          "DefaultForAz": false,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": false,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-0cd523f1e71fbc4db",
          "SubnetId": "subnet-0cd523f1e71fbc4db",
          "Tags": [{
            "Key": "Name",
            "Value": "infrastructure-stack-PrivateSubnetAZ3"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "PrivateSubnetAZ3"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }, {
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3b",
          "AvailabilityZoneId": "euw3-az2",
          "AvailableIpAddressCount": 251,
          "CidrBlock": "172.16.4.0/24",
          "DefaultForAz": false,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": false,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-02a56340fbdd2f804",
          "SubnetId": "subnet-02a56340fbdd2f804",
          "Tags": [{
            "Key": "aws:cloudformation:logical-id",
            "Value": "PrivateSubnetAZ2"
          }, {
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "Name",
            "Value": "infrastructure-stack-PrivateSubnetAZ2"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3b",
          "AvailabilityZoneId": "euw3-az2",
          "AvailableIpAddressCount": 4091,
          "CidrBlock": "172.31.16.0/20",
          "DefaultForAz": true,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": true,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-3af8ba41",
          "SubnetId": "subnet-3af8ba41",
          "Tags": null,
          "VpcId": "vpc-defabc12"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3a",
          "AvailabilityZoneId": "euw3-az1",
          "AvailableIpAddressCount": 250,
          "CidrBlock": "172.16.0.0/24",
          "DefaultForAz": false,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": false,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-029edb9493a17af8e",
          "SubnetId": "subnet-029edb9493a17af8e",
          "Tags": [{
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "Name",
            "Value": "infrastructure-stack-PublicSubnetAZ1"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "PublicSubnetAZ1"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3a",
          "AvailabilityZoneId": "euw3-az1",
          "AvailableIpAddressCount": 4091,
          "CidrBlock": "172.31.0.0/20",
          "DefaultForAz": true,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": true,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-49b19a20",
          "SubnetId": "subnet-49b19a20",
          "Tags": null,
          "VpcId": "vpc-defabc12"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3c",
          "AvailabilityZoneId": "euw3-az3",
          "AvailableIpAddressCount": 4091,
          "CidrBlock": "172.31.32.0/20",
          "DefaultForAz": true,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": true,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-c304938e",
          "SubnetId": "subnet-c304938e",
          "Tags": null,
          "VpcId": "vpc-defabc12"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3b",
          "AvailabilityZoneId": "euw3-az2",
          "AvailableIpAddressCount": 250,
          "CidrBlock": "172.16.1.0/24",
          "DefaultForAz": false,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": false,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-003cf9832775e946a",
          "SubnetId": "subnet-003cf9832775e946a",
          "Tags": [{
            "Key": "Name",
            "Value": "infrastructure-stack-PublicSubnetAZ2"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "PublicSubnetAZ2"
          }, {
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "AssignIpv6AddressOnCreation": false,
          "AvailabilityZone": "eu-west-3c",
          "AvailabilityZoneId": "euw3-az3",
          "AvailableIpAddressCount": 250,
          "CidrBlock": "172.16.2.0/24",
          "DefaultForAz": false,
          "Ipv6CidrBlockAssociationSet": null,
          "MapPublicIpOnLaunch": false,
          "OutpostArn": null,
          "OwnerId": "123456789012",
          "State": "available",
          "SubnetArn": "arn:aws:ec2:eu-west-3:123456789012:subnet/subnet-0526a5ce7456f54f3",
          "SubnetId": "subnet-0526a5ce7456f54f3",
          "Tags": [{
            "Key": "Name",
            "Value": "infrastructure-stack-PublicSubnetAZ3"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "PublicSubnetAZ3"
          }, {
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }],
          "VpcId": "vpc-0f123456789123456"
        }]
      }
    })
  },
  getSecurityGroups(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "SecurityGroups": [{
          "Description": "test",
          "GroupId": "sg-00f86d3fff4dbb001",
          "GroupName": "test",
          "IpPermissions": null,
          "IpPermissionsEgress": [{
            "FromPort": 22,
            "IpProtocol": "tcp",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": 22,
            "UserIdGroupPairs": null
          }],
          "OwnerId": "123456789012",
          "Tags": null,
          "VpcId": "vpc-defabc12"
        }, {
          "Description": "SecurityGroup for NAT instances",
          "GroupId": "sg-024ff2d6cc39a7603",
          "GroupName": "infrastructure-stack-NATSGAZ2-1Y0N170OIEYSC",
          "IpPermissions": [{
            "FromPort": 0,
            "IpProtocol": "tcp",
            "IpRanges": [{
              "CidrIp": "172.16.4.0/24",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": 65535,
            "UserIdGroupPairs": null
          }, {
            "FromPort": -1,
            "IpProtocol": "icmp",
            "IpRanges": [{
              "CidrIp": "172.16.4.0/24",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": -1,
            "UserIdGroupPairs": null
          }],
          "IpPermissionsEgress": [{
            "FromPort": 0,
            "IpProtocol": "tcp",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": 65535,
            "UserIdGroupPairs": null
          }, {
            "FromPort": -1,
            "IpProtocol": "icmp",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": -1,
            "UserIdGroupPairs": null
          }],
          "OwnerId": "123456789012",
          "Tags": [{
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-8394-11ea-b4b5-0e3a535926a2"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "NATSGAZ2"
          }, {
            "Key": "Name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "Description": "SecurityGroup for NAT instances",
          "GroupId": "sg-0365dd28384f9ee30",
          "GroupName": "infrastructure-stack-NATSGAZ3-P76FG3XAC6LU",
          "IpPermissions": [{
            "FromPort": 0,
            "IpProtocol": "tcp",
            "IpRanges": [{
              "CidrIp": "172.16.5.0/24",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": 65535,
            "UserIdGroupPairs": null
          }, {
            "FromPort": -1,
            "IpProtocol": "icmp",
            "IpRanges": [{
              "CidrIp": "172.16.5.0/24",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": -1,
            "UserIdGroupPairs": null
          }],
          "IpPermissionsEgress": [{
            "FromPort": 0,
            "IpProtocol": "tcp",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": 65535,
            "UserIdGroupPairs": null
          }, {
            "FromPort": -1,
            "IpProtocol": "icmp",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": -1,
            "UserIdGroupPairs": null
          }],
          "OwnerId": "123456789012",
          "Tags": [{
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "NATSGAZ3"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-8394-11ea-b4b5-0e3a535926a2"
          }, {
            "Key": "Name",
            "Value": "infrastructure-stack"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "Description": "default VPC security group",
          "GroupId": "sg-052df4d310156e8d1",
          "GroupName": "default",
          "IpPermissions": [{
            "FromPort": null,
            "IpProtocol": "-1",
            "IpRanges": null,
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": null,
            "UserIdGroupPairs": [{
              "Description": null,
              "GroupId": "sg-052df4d310156e8d1",
              "GroupName": null,
              "PeeringStatus": null,
              "UserId": "123456789012",
              "VpcId": null,
              "VpcPeeringConnectionId": null
            }]
          }],
          "IpPermissionsEgress": [{
            "FromPort": null,
            "IpProtocol": "-1",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": null,
            "UserIdGroupPairs": null
          }],
          "OwnerId": "123456789012",
          "Tags": null,
          "VpcId": "vpc-0f123456789123456"
        }, {
          "Description": "SecurityGroup for NAT instances",
          "GroupId": "sg-0affb3de1f417703f",
          "GroupName": "infrastructure-stack-NATSGAZ1-1LHNIB2KP5V5E",
          "IpPermissions": [{
            "FromPort": 0,
            "IpProtocol": "tcp",
            "IpRanges": [{
              "CidrIp": "172.16.3.0/24",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": 65535,
            "UserIdGroupPairs": null
          }, {
            "FromPort": -1,
            "IpProtocol": "icmp",
            "IpRanges": [{
              "CidrIp": "172.16.3.0/24",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": -1,
            "UserIdGroupPairs": null
          }],
          "IpPermissionsEgress": [{
            "FromPort": 0,
            "IpProtocol": "tcp",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": 65535,
            "UserIdGroupPairs": null
          }, {
            "FromPort": -1,
            "IpProtocol": "icmp",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": -1,
            "UserIdGroupPairs": null
          }],
          "OwnerId": "123456789012",
          "Tags": [{
            "Key": "Name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "aws:cloudformation:stack-name",
            "Value": "infrastructure-stack"
          }, {
            "Key": "aws:cloudformation:stack-id",
            "Value": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-1234-1234-0e3a535926a2"
          }, {
            "Key": "aws:cloudformation:logical-id",
            "Value": "NATSGAZ1"
          }],
          "VpcId": "vpc-0f123456789123456"
        }, {
          "Description": "default VPC security group",
          "GroupId": "sg-2836ff44",
          "GroupName": "default",
          "IpPermissions": [{
            "FromPort": null,
            "IpProtocol": "-1",
            "IpRanges": null,
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": null,
            "UserIdGroupPairs": [{
              "Description": null,
              "GroupId": "sg-2836ff44",
              "GroupName": null,
              "PeeringStatus": null,
              "UserId": "123456789012",
              "VpcId": null,
              "VpcPeeringConnectionId": null
            }]
          }],
          "IpPermissionsEgress": [{
            "FromPort": null,
            "IpProtocol": "-1",
            "IpRanges": [{
              "CidrIp": "0.0.0.0/0",
              "Description": null
            }],
            "Ipv6Ranges": null,
            "PrefixListIds": null,
            "ToPort": null,
            "UserIdGroupPairs": null
          }],
          "OwnerId": "123456789012",
          "Tags": null,
          "VpcId": "vpc-defabc12"
        }]
      }
    })
  },
  getKeypairs(data, cb, errorCb) {
    cb({
      data: {
        "KeyPairs": [{
          "KeyFingerprint": "ab:cd:ef:01:23:45:67:89:0a:bc:de:f0:12:34:56:78:90:12:34:56",
          "KeyName": "ecs-keypair",
          "KeyPairId": "key-12345b3c723a262f8",
          "Tags": null
        }, {
          "KeyFingerprint": "ab:cd:ef:01:23:45:67:89:0a:bc:de:f0:12:34:56:78:90:12:34:56",
          "KeyName": "great-user",
          "KeyPairId": "key-1234553c82724704a",
          "Tags": null
        }]
      }
    })
  },
  createKeypair(data, cb, errorCb) {

  },
  deleteKeypair(data, cb, errorCb) {

  },
}