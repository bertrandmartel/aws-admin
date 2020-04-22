export default {
  getStacks(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "StackSummaries": [{
          "CreationTime": "2020-04-21T05:53:53.473Z",
          "DeletionTime": null,
          "DriftInformation": {
            "LastCheckTimestamp": null,
            "StackDriftStatus": "NOT_CHECKED"
          },
          "LastUpdatedTime": null,
          "ParentId": null,
          "RootId": null,
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "StackStatus": "CREATE_COMPLETE",
          "StackStatusReason": null,
          "TemplateDescription": "NAT instances infrastructure stack"
        }]
      }
    })
  },
  getEvents(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": "13FxLgMfMXSYYng9DW1idGmQ37QDYc55W0VTe6bFs1qliHKe8/J5OxsL8OvZzHebp2OAzM9RVgpTCbwm0G3eTxK5fcfOwRGEN90kLQu3T7+aXBZOSPqjCD7/26uKThz82k3Wf9NOMHdgbrnac+OvYeASzCybxppaFKWGRP6iutl58pQMTy0/T8q+3pUpyFhe2ra6Ccggul6g2VVzqHvZ8TGyW11v7bxPdArqNGsIRwzWhPzvJCHVhEW73nh8ui28lHdVvuNVeoy6YS+ca8VgxfoecmuvtVOpcXiipq1z+owwsHoDPcmFa8r1qD5OV8v9DRYqUODxYL+qgGuh2x0vMHRwupn80BkXlVPAAjLwnZJevuAUEmvLLRdtRVpiAlyKE9xi0dDu9+I7hgTL2c88CxJwj1dy4L2zaEFlYVAbyQxptaTr95Mf15InhiAWu+nv91z+wTg9oTVp2183yJ2Q7O3bUZX8tPQNVp1OZpikrTrlsmmRTt6pi0CaRX1rvG4eCz+Gq3YB1aNRbDWLJenzPvpqCZptuzYnLNxu66esKPPwftJnDg8r0DAb0suGALXPvTi4DfbNhKhcqHHNQZ5JD1iVhfXB/970Q7zdGBC3BOpzFluJqdnxeEKe0WDui5R+JO86mxa2h9zy4Ee4pp+vCvCTfEwvnkrGoBG0YWkrK3yuR7cAag7A3MCUA09n7JqdEaQqGNrGNm/TNo8ghcNG26xvUQBCOZsAYd54bIEk/MGYHXMPWim5BeXTl9G7dAZN|eOYT/jBTR4qJ9aI5TST9Wg==|1|6b3ff40a3df3b3c092c982f517fdb113a9cd9d8bd535ba55e5285a811a932b8b",
        "StackEvents": [{
          "ClientRequestToken": null,
          "EventId": "71b27cf0-8395-11ea-9fc0-0afbf782ac3a",
          "LogicalResourceId": "infrastructure-stack",
          "PhysicalResourceId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "ResourceProperties": null,
          "ResourceStatus": "CREATE_COMPLETE",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::CloudFormation::Stack",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:46.901Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "EIP1-CREATE_COMPLETE-2020-04-21T06:00:43.909Z",
          "LogicalResourceId": "EIP1",
          "PhysicalResourceId": "15.236.125.223",
          "ResourceProperties": "{\"InstanceId\":\"i-0ac968a3e377106a9\",\"Domain\":\"vpc\",\"Tags\":[{\"Value\":\"infrastructure-stack-ExternalEIP1\",\"Key\":\"Name\"}]}",
          "ResourceStatus": "CREATE_COMPLETE",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::EIP",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:43.909Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "RoutePrivIGWAZ1-CREATE_COMPLETE-2020-04-21T06:00:28.197Z",
          "LogicalResourceId": "RoutePrivIGWAZ1",
          "PhysicalResourceId": "infra-Route-HUBGXRIBOOLM",
          "ResourceProperties": "{\"RouteTableId\":\"rtb-0768ceef5c252c800\",\"InstanceId\":\"i-0ac968a3e377106a9\",\"DestinationCidrBlock\":\"0.0.0.0/0\"}",
          "ResourceStatus": "CREATE_COMPLETE",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::Route",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:28.197Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "RoutePrivIGWAZ1-CREATE_IN_PROGRESS-2020-04-21T06:00:12.908Z",
          "LogicalResourceId": "RoutePrivIGWAZ1",
          "PhysicalResourceId": "infra-Route-HUBGXRIBOOLM",
          "ResourceProperties": "{\"RouteTableId\":\"rtb-0768ceef5c252c800\",\"InstanceId\":\"i-0ac968a3e377106a9\",\"DestinationCidrBlock\":\"0.0.0.0/0\"}",
          "ResourceStatus": "CREATE_IN_PROGRESS",
          "ResourceStatusReason": "Resource creation Initiated",
          "ResourceType": "AWS::EC2::Route",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:12.908Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "EIP1-CREATE_IN_PROGRESS-2020-04-21T06:00:12.775Z",
          "LogicalResourceId": "EIP1",
          "PhysicalResourceId": "15.236.125.223",
          "ResourceProperties": "{\"InstanceId\":\"i-0ac968a3e377106a9\",\"Domain\":\"vpc\",\"Tags\":[{\"Value\":\"infrastructure-stack-ExternalEIP1\",\"Key\":\"Name\"}]}",
          "ResourceStatus": "CREATE_IN_PROGRESS",
          "ResourceStatusReason": "Resource creation Initiated",
          "ResourceType": "AWS::EC2::EIP",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:12.775Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "EIP1-CREATE_IN_PROGRESS-2020-04-21T06:00:12.441Z",
          "LogicalResourceId": "EIP1",
          "PhysicalResourceId": "",
          "ResourceProperties": "{\"InstanceId\":\"i-0ac968a3e377106a9\",\"Domain\":\"vpc\",\"Tags\":[{\"Value\":\"infrastructure-stack-ExternalEIP1\",\"Key\":\"Name\"}]}",
          "ResourceStatus": "CREATE_IN_PROGRESS",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::EIP",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:12.441Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "RoutePrivIGWAZ1-CREATE_IN_PROGRESS-2020-04-21T06:00:12.437Z",
          "LogicalResourceId": "RoutePrivIGWAZ1",
          "PhysicalResourceId": "",
          "ResourceProperties": "{\"RouteTableId\":\"rtb-0768ceef5c252c800\",\"InstanceId\":\"i-0ac968a3e377106a9\",\"DestinationCidrBlock\":\"0.0.0.0/0\"}",
          "ResourceStatus": "CREATE_IN_PROGRESS",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::Route",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:12.437Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "NatInstanceAZ1-CREATE_COMPLETE-2020-04-21T06:00:10.890Z",
          "LogicalResourceId": "NatInstanceAZ1",
          "PhysicalResourceId": "i-0ac968a3e377106a9",
          "ResourceProperties": "{\"SourceDestCheck\":\"false\",\"NetworkInterfaces\":[{\"DeviceIndex\":\"0\",\"SubnetId\":\"subnet-029edb9493a17af8e\",\"GroupSet\":[\"sg-0affb3de1f417703f\"],\"AssociatePublicIpAddress\":\"false\",\"DeleteOnTermination\":\"true\"}],\"ImageId\":\"ami-0050bb60cea70c5b3\",\"IamInstanceProfile\":\"infrastructure-stack-InstanceProfile-1CO0CQG5R5UP\",\"InstanceType\":\"t2.micro\",\"Tags\":[{\"Value\":\"infrastructure-stack-NI1\",\"Key\":\"Name\"}]}",
          "ResourceStatus": "CREATE_COMPLETE",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::Instance",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T06:00:10.89Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "EIP3-CREATE_COMPLETE-2020-04-21T05:57:22.349Z",
          "LogicalResourceId": "EIP3",
          "PhysicalResourceId": "15.188.141.132",
          "ResourceProperties": "{\"InstanceId\":\"i-0b3a05baa4cc60486\",\"Domain\":\"vpc\",\"Tags\":[{\"Value\":\"infrastructure-stack-ExternalEIP3\",\"Key\":\"Name\"}]}",
          "ResourceStatus": "CREATE_COMPLETE",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::EIP",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T05:57:22.349Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "EIP2-CREATE_COMPLETE-2020-04-21T05:57:22.158Z",
          "LogicalResourceId": "EIP2",
          "PhysicalResourceId": "15.188.58.41",
          "ResourceProperties": "{\"InstanceId\":\"i-052fe68488ebab7c5\",\"Domain\":\"vpc\",\"Tags\":[{\"Value\":\"infrastructure-stack-ExternalEIP2\",\"Key\":\"Name\"}]}",
          "ResourceStatus": "CREATE_COMPLETE",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::EIP",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T05:57:22.158Z"
        }, {
          "ClientRequestToken": null,
          "EventId": "RoutePrivIGWAZ3-CREATE_COMPLETE-2020-04-21T05:57:07.010Z",
          "LogicalResourceId": "RoutePrivIGWAZ3",
          "PhysicalResourceId": "infra-Route-1PRBC4G4YR075",
          "ResourceProperties": "{\"RouteTableId\":\"rtb-0d02df0bb88b95fcf\",\"InstanceId\":\"i-0b3a05baa4cc60486\",\"DestinationCidrBlock\":\"0.0.0.0/0\"}",
          "ResourceStatus": "CREATE_COMPLETE",
          "ResourceStatusReason": null,
          "ResourceType": "AWS::EC2::Route",
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "Timestamp": "2020-04-21T05:57:07.01Z"
        }]
      }
    })
  },
  getTemplate(data, cb, errorCb) {
    cb({
      data: {
        "StagesAvailable": ["Original", "Processed"],
        "TemplateBody": "AWSTemplateFormatVersion: '2010-09-09'\nDescription: 'NAT instances infrastructure stack'\nMetadata:\n  Author:\n    Name: Bertrand Martel\nParameters:\n  VpcCidr:\n    Description: Cidr block for VPC\n    Type: 'String'\n    Default: \"172.16.0.0/20\"\n  PublicSubnet1Cidr: \n    Description: Cidr block for Public Subnet1 (AZ1)\n    Type: 'String'\n    Default: \"172.16.0.0/24\"\n  PublicSubnet2Cidr: \n    Description: Cidr block for Public Subnet2 (AZ2)\n    Type: 'String'\n    Default: \"172.16.1.0/24\"\n  PublicSubnet3Cidr: \n    Description: Cidr block for Public Subnet3 (AZ3)\n    Type: 'String'\n    Default: \"172.16.2.0/24\"\n  PrivateSubnet1Cidr: \n    Description: Cidr block for Private Subnet1 (AZ1)\n    Type: 'String'\n    Default: \"172.16.3.0/24\"\n  PrivateSubnet2Cidr: \n    Description: Cidr block for Private Subnet2 (AZ2)\n    Type: 'String'\n    Default: \"172.16.4.0/24\"\n  PrivateSubnet3Cidr: \n    Description: Cidr block for Private Subnet3 (AZ3)\n    Type: 'String'\n    Default: \"172.16.5.0/24\"\n  NatInstanceType:\n    Description: NAT EC2 instance type\n    Type: String\n    Default: t2.micro\n    AllowedValues:\n    - t2.micro\n    - t2.small\n    - t2.medium\n    - t2.large\n    - m3.medium\n    - m3.large\n    - m3.xlarge\n    - m3.2xlarge\n    - m4.large\n    - m4.xlarge\n    - m4.2xlarge\n    - m4.4xlarge\n    - m4.10xlarge\n    - c4.large\n    - c4.xlarge\n    - c4.2xlarge\n    - c4.4xlarge\n    - c4.8xlarge\n    - c3.large\n    - c3.xlarge\n    - c3.2xlarge\n    - c3.4xlarge\n    - c3.8xlarge\n    - r3.large\n    - r3.xlarge\n    - r3.2xlarge\n    - r3.4xlarge\n    - r3.8xlarge\n    - i2.xlarge\n    - i2.2xlarge\n    - i2.4xlarge\n    - i2.8xlarge\nMappings:\n  AWSRegionNatAMI:\n    eu-west-3:\n      ID: ami-0050bb60cea70c5b3\nResources:\n  VPC:\n    Type: AWS::EC2::VPC\n    Properties: \n      CidrBlock: !Ref VpcCidr\n      EnableDnsSupport: True\n      EnableDnsHostnames: True\n      InstanceTenancy: 'default'\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-VPC\"\n###### Elastic IPs (one per AZ)#######\n  EIP1:\n    Type: AWS::EC2::EIP\n    Properties:\n      Domain: vpc\n      InstanceId: !Ref NatInstanceAZ1\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-ExternalEIP1\"\n  EIP2:\n    Type: AWS::EC2::EIP\n    Properties:\n      Domain: vpc\n      InstanceId: !Ref NatInstanceAZ2\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-ExternalEIP2\"\n  EIP3:\n    Type: AWS::EC2::EIP\n    Properties:\n      Domain: vpc\n      InstanceId: !Ref NatInstanceAZ3\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-ExternalEIP3\"\n\n###### Nat Instance (one per AZ) #######\n  NatInstanceAZ1:\n    Type: 'AWS::EC2::Instance'\n    DependsOn: AttachIGW\n    Properties:\n      ImageId:\n        Fn::FindInMap:\n        - AWSRegionNatAMI\n        - Ref: AWS::Region\n        - ID\n      InstanceType: !Ref NatInstanceType\n      IamInstanceProfile: !Ref InstanceProfile\n      SourceDestCheck: false\n      NetworkInterfaces:\n      - AssociatePublicIpAddress: false\n        DeviceIndex: 0\n        DeleteOnTermination: true\n        SubnetId: !Ref PublicSubnetAZ1\n        GroupSet:\n        - !Ref NATSGAZ1\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-NI1\"\n  NatInstanceAZ2:\n    Type: 'AWS::EC2::Instance'\n    DependsOn: AttachIGW\n    Properties:\n      ImageId:\n        Fn::FindInMap:\n        - AWSRegionNatAMI\n        - Ref: AWS::Region\n        - ID\n      InstanceType: !Ref NatInstanceType\n      IamInstanceProfile: !Ref InstanceProfile\n      SourceDestCheck: false\n      NetworkInterfaces:\n      - AssociatePublicIpAddress: false\n        DeviceIndex: 0\n        DeleteOnTermination: true\n        SubnetId: !Ref PublicSubnetAZ2\n        GroupSet:\n        - !Ref NATSGAZ2\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-NI2\"\n  NatInstanceAZ3:\n    Type: 'AWS::EC2::Instance'\n    DependsOn: AttachIGW\n    Properties:\n      ImageId:\n        Fn::FindInMap:\n        - AWSRegionNatAMI\n        - Ref: AWS::Region\n        - ID\n      InstanceType: !Ref NatInstanceType\n      IamInstanceProfile: !Ref InstanceProfile\n      SourceDestCheck: false\n      NetworkInterfaces:\n      - AssociatePublicIpAddress: false\n        DeviceIndex: 0\n        DeleteOnTermination: true\n        SubnetId: !Ref PublicSubnetAZ3\n        GroupSet:\n        - !Ref NATSGAZ3\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-NI3\"\n  NATSGAZ1:\n    Type: AWS::EC2::SecurityGroup\n    Properties:\n      GroupDescription: SecurityGroup for NAT instances\n      VpcId: !Ref VPC\n      SecurityGroupIngress:\n      - CidrIp: !Ref PrivateSubnet1Cidr\n        IpProtocol: \"tcp\"\n        FromPort: '0'\n        ToPort: '65535'\n      - CidrIp: !Ref PrivateSubnet1Cidr\n        IpProtocol: \"icmp\"\n        FromPort: '-1'\n        ToPort: '-1'\n      SecurityGroupEgress:\n      - CidrIp: '0.0.0.0/0'\n        IpProtocol: \"icmp\"\n        FromPort: '-1'\n        ToPort: '-1'\n      - CidrIp: '0.0.0.0/0'\n        IpProtocol: \"tcp\"\n        FromPort: '0'\n        ToPort: '65535'\n      Tags:\n      - Key: Name\n        Value: !Sub \"${AWS::StackName}\"\n  NATSGAZ2:\n    Type: AWS::EC2::SecurityGroup\n    Properties:\n      GroupDescription: SecurityGroup for NAT instances\n      VpcId: !Ref VPC\n      SecurityGroupIngress:\n      - CidrIp: !Ref PrivateSubnet2Cidr\n        IpProtocol: \"tcp\"\n        FromPort: '0'\n        ToPort: '65535'\n      - CidrIp: !Ref PrivateSubnet2Cidr\n        IpProtocol: \"icmp\"\n        FromPort: '-1'\n        ToPort: '-1'\n      SecurityGroupEgress:\n      - CidrIp: '0.0.0.0/0'\n        IpProtocol: \"icmp\"\n        FromPort: '-1'\n        ToPort: '-1'\n      - CidrIp: '0.0.0.0/0'\n        IpProtocol: \"tcp\"\n        FromPort: '0'\n        ToPort: '65535'\n      Tags:\n      - Key: Name\n        Value: !Sub \"${AWS::StackName}\"\n  NATSGAZ3:\n    Type: AWS::EC2::SecurityGroup\n    Properties:\n      GroupDescription: SecurityGroup for NAT instances\n      VpcId: !Ref VPC\n      SecurityGroupIngress:\n      - CidrIp: !Ref PrivateSubnet3Cidr\n        IpProtocol: \"tcp\"\n        FromPort: '0'\n        ToPort: '65535'\n      - CidrIp: !Ref PrivateSubnet3Cidr\n        IpProtocol: \"icmp\"\n        FromPort: '-1'\n        ToPort: '-1'\n      SecurityGroupEgress:\n      - CidrIp: '0.0.0.0/0'\n        IpProtocol: \"icmp\"\n        FromPort: '-1'\n        ToPort: '-1'\n      - CidrIp: '0.0.0.0/0'\n        IpProtocol: \"tcp\"\n        FromPort: '0'\n        ToPort: '65535'\n      Tags:\n      - Key: Name\n        Value: !Sub \"${AWS::StackName}\"\n  InstanceProfile:\n    Type: AWS::IAM::InstanceProfile\n    Properties:\n      Roles:\n      - !Ref InstanceRole\n  InstanceRole:\n    Type: AWS::IAM::Role\n    Properties:\n      AssumeRolePolicyDocument:\n        Statement:\n        - Effect: Allow\n          Principal:\n            Service:\n            - ec2.amazonaws.com\n          Action:\n          - sts:AssumeRole\n      ManagedPolicyArns:\n      - arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}\"\n###### Internet Gateway (IGW) - attached to VPC#######\n  IGW:\n    Type: AWS::EC2::InternetGateway\n    Properties:\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-IGW\"\n  AttachIGW:\n    Type: AWS::EC2::VPCGatewayAttachment\n    Properties:\n      VpcId:\n        !Ref VPC\n      InternetGatewayId: \n        !Ref IGW\n##### Public Route table of routing public subnet to IGW ######\n  PublicSubnetRoute: \n    Type: AWS::EC2::Route\n    DependsOn: AttachIGW\n    Properties:\n        RouteTableId : !Ref PublicRouteTable\n        DestinationCidrBlock : '0.0.0.0/0'\n        GatewayId : !Ref IGW\n  PublicRouteTable:\n    Type: AWS::EC2::RouteTable\n    Properties:\n      VpcId: !Ref VPC\n\n###### PUBLIC SUBNET 1 (AZ1) - routed to IGW #######\n  PublicSubnetAZ1:\n    Type: AWS::EC2::Subnet\n    Properties:\n      VpcId:\n        !Ref VPC\n      CidrBlock: !Ref PublicSubnet1Cidr\n      AvailabilityZone: !Select \n        - 0\n        - Fn::GetAZs: !Ref 'AWS::Region'\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-PublicSubnetAZ1\"\n  SubnetRouteTableAssociationPubAZ1: \n      Type : AWS::EC2::SubnetRouteTableAssociation\n      Properties:\n          SubnetId : !Ref PublicSubnetAZ1 \n          RouteTableId : !Ref PublicRouteTable  \n\n###### PUBLIC SUBNET 2 (AZ2) - routed to IGW #######\n  PublicSubnetAZ2:\n    Type: AWS::EC2::Subnet\n    Properties:\n      VpcId:\n        !Ref VPC\n      CidrBlock: !Ref PublicSubnet2Cidr\n      AvailabilityZone: !Select \n        - 1\n        - Fn::GetAZs: !Ref 'AWS::Region'\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-PublicSubnetAZ2\"\n  SubnetRouteTableAssociationPubAZ2: \n      Type : AWS::EC2::SubnetRouteTableAssociation\n      Properties:\n          SubnetId : !Ref PublicSubnetAZ2 \n          RouteTableId : !Ref PublicRouteTable  \n\n###### PUBLIC SUBNET 3 (AZ3) - routed to IGW #######\n  PublicSubnetAZ3:\n    Type: AWS::EC2::Subnet\n    Properties:\n      VpcId:\n        !Ref VPC\n      CidrBlock: !Ref PublicSubnet3Cidr\n      AvailabilityZone: !Select \n        - 2\n        - Fn::GetAZs: !Ref 'AWS::Region'\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-PublicSubnetAZ3\"\n  SubnetRouteTableAssociationPubAZ3: \n      Type : AWS::EC2::SubnetRouteTableAssociation\n      Properties:\n          SubnetId : !Ref PublicSubnetAZ3\n          RouteTableId : !Ref PublicRouteTable\n\n###### PRIVATE SUBNET 1 (AZ1) - routed to Nat Instance #######\n  PrivateSubnetAZ1:\n    Type: AWS::EC2::Subnet\n    Properties:\n      VpcId: !Ref VPC\n      CidrBlock: !Ref PrivateSubnet1Cidr\n      AvailabilityZone: !Select \n                - 0\n                - Fn::GetAZs: !Ref 'AWS::Region'\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-PrivateSubnetAZ1\"\n  RouteTablePrivateSubnetAZ1:\n    Type: AWS::EC2::RouteTable\n    Properties:\n      VpcId: !Ref VPC\n  RoutePrivIGWAZ1: \n    Type : AWS::EC2::Route\n    DependsOn: NatInstanceAZ1\n    Properties:\n        RouteTableId : !Ref RouteTablePrivateSubnetAZ1\n        DestinationCidrBlock : '0.0.0.0/0'\n        InstanceId : !Ref NatInstanceAZ1\n  SubnetRouteTableAssociationPrivAZ1: \n      Type : AWS::EC2::SubnetRouteTableAssociation\n      Properties:\n          SubnetId : !Ref PrivateSubnetAZ1 \n          RouteTableId : !Ref RouteTablePrivateSubnetAZ1\n\n###### PRIVATE SUBNET 2 (AZ2) - routed to Nat Instance #######\n  PrivateSubnetAZ2:\n    Type: AWS::EC2::Subnet\n    Properties:\n      VpcId:\n        !Ref VPC\n      CidrBlock: !Ref PrivateSubnet2Cidr\n      AvailabilityZone: !Select \n                - 1\n                - Fn::GetAZs: !Ref 'AWS::Region'\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-PrivateSubnetAZ2\"\n  RouteTablePrivateSubnetAZ2:\n    Type: AWS::EC2::RouteTable\n    Properties:\n      VpcId: !Ref VPC\n  RoutePrivIGWAZ2: \n    Type : AWS::EC2::Route\n    DependsOn: NatInstanceAZ2\n    Properties:\n        RouteTableId : !Ref RouteTablePrivateSubnetAZ2\n        DestinationCidrBlock : '0.0.0.0/0'\n        InstanceId : !Ref NatInstanceAZ2\n  SubnetRouteTableAssociationPrivAZ2: \n      Type : AWS::EC2::SubnetRouteTableAssociation\n      Properties:\n          SubnetId : !Ref PrivateSubnetAZ2 \n          RouteTableId : !Ref RouteTablePrivateSubnetAZ2\n\n###### PRIVATE SUBNET 3 (AZ3) - routed to Nat Instance #######\n  PrivateSubnetAZ3:\n    Type: AWS::EC2::Subnet\n    Properties:\n      VpcId:\n        !Ref VPC\n      CidrBlock: !Ref PrivateSubnet3Cidr\n      AvailabilityZone: !Select \n                - 2\n                - Fn::GetAZs: !Ref 'AWS::Region'\n      Tags:\n        - Key: Name\n          Value: !Sub \"${AWS::StackName}-PrivateSubnetAZ3\"\n  RouteTablePrivateSubnetAZ3:\n    Type: AWS::EC2::RouteTable\n    Properties:\n      VpcId: !Ref VPC\n  RoutePrivIGWAZ3: \n    Type : AWS::EC2::Route\n    DependsOn: NatInstanceAZ3\n    Properties:\n        RouteTableId : !Ref RouteTablePrivateSubnetAZ3\n        DestinationCidrBlock : '0.0.0.0/0'\n        InstanceId : !Ref NatInstanceAZ3\n  SubnetRouteTableAssociationPrivAZ3: \n      Type : AWS::EC2::SubnetRouteTableAssociation\n      Properties:\n          SubnetId : !Ref PrivateSubnetAZ3\n          RouteTableId : !Ref RouteTablePrivateSubnetAZ3\nOutputs:\n  VpcId:\n    Description: Id of the newly created VPC\n    Value: !Ref VPC\n    Export:\n      Name: !Sub \"VPC-${AWS::StackName}\"\n  PublicSubnetAZ1:\n    Description: Id of Subnet Pub AZ1\n    Value: !Ref PublicSubnetAZ1\n    Export:\n      Name: !Sub \"PublicSubnetAZ1-${AWS::StackName}\"\n  PublicSubnetAZ2:\n    Description: Id of Subnet Pub AZ2\n    Value: !Ref PublicSubnetAZ2\n    Export:\n      Name: !Sub \"PublicSubnetAZ2-${AWS::StackName}\"\n  PublicSubnetAZ3:\n    Description: Id of Subnet Pub AZ3\n    Value: !Ref PublicSubnetAZ3\n    Export:\n      Name: !Sub \"PublicSubnetAZ3-${AWS::StackName}\"\n  PrivateSubnetAZ1:\n    Description: Id of Subnet Priv AZ1\n    Value: !Ref PrivateSubnetAZ1\n    Export:\n      Name: !Sub \"PrivateSubnetAZ1-${AWS::StackName}\"\n  PrivateSubnetAZ2:\n    Description: Id of Subnet Priv AZ2\n    Value: !Ref PrivateSubnetAZ2\n    Export:\n      Name: !Sub \"PrivateSubnetAZ2-${AWS::StackName}\"\n  PrivateSubnetAZ3:\n    Description: Id of Subnet Priv AZ3\n    Value: !Ref PrivateSubnetAZ3\n    Export:\n      Name: !Sub \"PrivateSubnetAZ3-${AWS::StackName}\"\n  EIP1Address:\n    Value: !Ref EIP1\n    Export:\n      Name: !Sub \"EIP1Address-${AWS::StackName}\"\n  EIP1AllocationId:\n    Value: !GetAtt EIP1.AllocationId\n    Export:\n      Name: !Sub \"EIP1AllocationId-${AWS::StackName}\"\n  EIP2Address:\n    Value: !Ref EIP2\n    Export:\n      Name: !Sub \"EIP2Address-${AWS::StackName}\"\n  EIP2AllocationId:\n    Value: !GetAtt EIP2.AllocationId\n    Export:\n      Name: !Sub \"EIP2AllocationId-${AWS::StackName}\"\n  EIP3Address:\n    Value: !Ref EIP3\n    Export:\n      Name: !Sub \"EIP3Address-${AWS::StackName}\"\n  EIP3AllocationId:\n    Value: !GetAtt EIP3.AllocationId\n    Export:\n      Name: !Sub \"EIP3AllocationId-${AWS::StackName}\""
      }
    })
  },
  getDescription(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "Stacks": [{
          "Capabilities": ["CAPABILITY_IAM", "CAPABILITY_AUTO_EXPAND"],
          "ChangeSetId": null,
          "CreationTime": "2020-04-21T05:53:53.473Z",
          "DeletionTime": null,
          "Description": "NAT instances infrastructure stack",
          "DisableRollback": false,
          "DriftInformation": {
            "LastCheckTimestamp": null,
            "StackDriftStatus": "NOT_CHECKED"
          },
          "EnableTerminationProtection": false,
          "LastUpdatedTime": null,
          "NotificationARNs": null,
          "Outputs": [{
            "Description": "Id of Subnet Pub AZ1",
            "ExportName": "PublicSubnetAZ1-infrastructure-stack",
            "OutputKey": "PublicSubnetAZ1",
            "OutputValue": "subnet-030fcb9493a17af8e"
          }, {
            "Description": "Id of Subnet Pub AZ2",
            "ExportName": "PublicSubnetAZ2-infrastructure-stack",
            "OutputKey": "PublicSubnetAZ2",
            "OutputValue": "subnet-004da0932775e946a"
          }, {
            "Description": null,
            "ExportName": "EIP1AllocationId-infrastructure-stack",
            "OutputKey": "EIP1AllocationId",
            "OutputValue": "eipalloc-0a46647256db181f0"
          }, {
            "Description": null,
            "ExportName": "EIP2AllocationId-infrastructure-stack",
            "OutputKey": "EIP2AllocationId",
            "OutputValue": "eipalloc-08d6beca833f2b40e"
          }, {
            "Description": "Id of Subnet Pub AZ3",
            "ExportName": "PublicSubnetAZ3-infrastructure-stack",
            "OutputKey": "PublicSubnetAZ3",
            "OutputValue": "subnet-0637b5ce7456f54f3"
          }, {
            "Description": null,
            "ExportName": "EIP3Address-infrastructure-stack",
            "OutputKey": "EIP3Address",
            "OutputValue": "15.200.141.132"
          }, {
            "Description": null,
            "ExportName": "EIP3AllocationId-infrastructure-stack",
            "OutputKey": "EIP3AllocationId",
            "OutputValue": "eipalloc-0c7fead592eb2728b"
          }, {
            "Description": null,
            "ExportName": "EIP2Address-infrastructure-stack",
            "OutputKey": "EIP2Address",
            "OutputValue": "15.200.58.41"
          }, {
            "Description": null,
            "ExportName": "EIP1Address-infrastructure-stack",
            "OutputKey": "EIP1Address",
            "OutputValue": "15.200.125.223"
          }, {
            "Description": "Id of the newly created VPC",
            "ExportName": "VPC-infrastructure-stack",
            "OutputKey": "VpcId",
            "OutputValue": "vpc-0f671642ca72cedb5"
          }, {
            "Description": "Id of Subnet Priv AZ3",
            "ExportName": "PrivateSubnetAZ3-infrastructure-stack",
            "OutputKey": "PrivateSubnetAZ3",
            "OutputValue": "subnet-0de633f1e71fbc4db"
          }, {
            "Description": "Id of Subnet Priv AZ2",
            "ExportName": "PrivateSubnetAZ2-infrastructure-stack",
            "OutputKey": "PrivateSubnetAZ2",
            "OutputValue": "subnet-03b67340fbdd2f804"
          }, {
            "Description": "Id of Subnet Priv AZ1",
            "ExportName": "PrivateSubnetAZ1-infrastructure-stack",
            "OutputKey": "PrivateSubnetAZ1",
            "OutputValue": "subnet-04cc80532e0f2be9b"
          }],
          "Parameters": [{
            "ParameterKey": "PrivateSubnet1Cidr",
            "ParameterValue": "172.16.3.0/24",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }, {
            "ParameterKey": "PublicSubnet3Cidr",
            "ParameterValue": "172.16.2.0/24",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }, {
            "ParameterKey": "PublicSubnet2Cidr",
            "ParameterValue": "172.16.1.0/24",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }, {
            "ParameterKey": "VpcCidr",
            "ParameterValue": "172.16.0.0/20",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }, {
            "ParameterKey": "PrivateSubnet2Cidr",
            "ParameterValue": "172.16.4.0/24",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }, {
            "ParameterKey": "PrivateSubnet3Cidr",
            "ParameterValue": "172.16.5.0/24",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }, {
            "ParameterKey": "NatInstanceType",
            "ParameterValue": "t2.micro",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }, {
            "ParameterKey": "PublicSubnet1Cidr",
            "ParameterValue": "172.16.0.0/24",
            "ResolvedValue": null,
            "UsePreviousValue": null
          }],
          "ParentId": null,
          "RoleARN": null,
          "RollbackConfiguration": {
            "MonitoringTimeInMinutes": null,
            "RollbackTriggers": null
          },
          "RootId": null,
          "StackId": "arn:aws:cloudformation:eu-west-3:123456789012:stack/infrastructure-stack/7b225ef0-1234-11ea-b4b5-0e3a535926a2",
          "StackName": "infrastructure-stack",
          "StackStatus": "CREATE_COMPLETE",
          "StackStatusReason": null,
          "Tags": null,
          "TimeoutInMinutes": null
        }]
      }
    })
  },
  createStack(data, cb, errorCb) {

  },
  deleteStack(data, cb, errorCb) {

  },
  updateTerminationProtection(data, cb, errorCb) {

  },
  updateStack(data, cb, errorCb) {
    
  },
}