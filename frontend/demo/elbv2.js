export default {
  getLoadBalancers(data, cb, errorCb) {
    cb({
      data: {
        "LoadBalancers": [{
          "AvailabilityZones": [{
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-01234567890123456",
            "ZoneName": "eu-west-3c"
          }, {
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-09abcdef023457323",
            "ZoneName": "eu-west-3b"
          }, {
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-0abcdef0223552232",
            "ZoneName": "eu-west-3a"
          }],
          "CanonicalHostedZoneId": "Z4123456789012",
          "CreatedTime": "2019-09-27T14:30:09.11Z",
          "DNSName": "some-wordpress-1469068865.eu-west-3.elb.amazonaws.com",
          "IpAddressType": "ipv4",
          "LoadBalancerArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:loadbalancer/app/some-wordpress/0b4530a235b2298e",
          "LoadBalancerName": "some-wordpress",
          "Scheme": "internet-facing",
          "SecurityGroups": ["sg-054d148f867b66a74"],
          "State": {
            "Code": "active",
            "Reason": null
          },
          "Type": "application",
          "VpcId": "vpc-12345678123456123"
        }, {
          "AvailabilityZones": [{
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-01234567890123456",
            "ZoneName": "eu-west-3c"
          }, {
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-09abcdef023457323",
            "ZoneName": "eu-west-3b"
          }, {
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-0abcdef0223552232",
            "ZoneName": "eu-west-3a"
          }],
          "CanonicalHostedZoneId": "Z4123456789012",
          "CreatedTime": "2019-10-28T13:03:13.31Z",
          "DNSName": "some-alb-12345676.eu-west-3.elb.amazonaws.com",
          "IpAddressType": "ipv4",
          "LoadBalancerArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:loadbalancer/app/some-alb/409d1e3a73d1a418",
          "LoadBalancerName": "some-alb",
          "Scheme": "internet-facing",
          "SecurityGroups": ["sg-00680c9a65146752f"],
          "State": {
            "Code": "active",
            "Reason": null
          },
          "Type": "application",
          "VpcId": "vpc-12345678123456123"
        }, {
          "AvailabilityZones": [{
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-01234567890123456",
            "ZoneName": "eu-west-3c"
          }, {
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-09abcdef023457323",
            "ZoneName": "eu-west-3b"
          }, {
            "LoadBalancerAddresses": null,
            "SubnetId": "subnet-0abcdef0223552232",
            "ZoneName": "eu-west-3a"
          }],
          "CanonicalHostedZoneId": "Z4123456789012",
          "CreatedTime": "2020-01-24T10:01:54.17Z",
          "DNSName": "test-alb-HABCD0123457-165028184.eu-west-3.elb.amazonaws.com",
          "IpAddressType": "ipv4",
          "LoadBalancerArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:loadbalancer/app/test-alb-123457/ae04a3291ea2b79c",
          "LoadBalancerName": "test-alb-HABCD0123457",
          "Scheme": "internet-facing",
          "SecurityGroups": ["sg-064c93dfc6d702347"],
          "State": {
            "Code": "active",
            "Reason": null
          },
          "Type": "application",
          "VpcId": "vpc-12345678123456123"
        }],
        "NextMarker": null
      }
    })
  },
  getTargetGroups(data, cb, errorCb) {
    cb({
      data: {
        "NextMarker": null,
        "TargetGroups": [{
          "HealthCheckEnabled": true,
          "HealthCheckIntervalSeconds": 10,
          "HealthCheckPath": "/",
          "HealthCheckPort": "traffic-port",
          "HealthCheckProtocol": "HTTP",
          "HealthCheckTimeoutSeconds": 5,
          "HealthyThresholdCount": 2,
          "LoadBalancerArns": ["arn:aws:elasticloadbalancing:eu-west-3:123456789012:loadbalancer/app/ecs-infra-ALB/12345e57759a20f"],
          "Matcher": {
            "HttpCode": "200-399"
          },
          "Port": 80,
          "Protocol": "HTTP",
          "TargetGroupArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:targetgroup/BacademieTargetGroup/1234518da9b3a",
          "TargetGroupName": "SomeTargetGroup",
          "TargetType": "instance",
          "UnhealthyThresholdCount": 2,
          "VpcId": "vpc-0ff123456677887da"
        }, {
          "HealthCheckEnabled": true,
          "HealthCheckIntervalSeconds": 10,
          "HealthCheckPath": "/",
          "HealthCheckPort": "traffic-port",
          "HealthCheckProtocol": "HTTP",
          "HealthCheckTimeoutSeconds": 5,
          "HealthyThresholdCount": 2,
          "LoadBalancerArns": null,
          "Matcher": {
            "HttpCode": "200-399"
          },
          "Port": 80,
          "Protocol": "HTTP",
          "TargetGroupArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:targetgroup/Default80TargetGroup/1234549117674f9",
          "TargetGroupName": "Default80TargetGroup",
          "TargetType": "instance",
          "UnhealthyThresholdCount": 2,
          "VpcId": "vpc-0ff123456677887da"
        }, {
          "HealthCheckEnabled": true,
          "HealthCheckIntervalSeconds": 10,
          "HealthCheckPath": "/",
          "HealthCheckPort": "traffic-port",
          "HealthCheckProtocol": "HTTP",
          "HealthCheckTimeoutSeconds": 5,
          "HealthyThresholdCount": 2,
          "LoadBalancerArns": ["arn:aws:elasticloadbalancing:eu-west-3:123456789012:loadbalancer/app/ALB/12345b6c0b28c48b"],
          "Matcher": {
            "HttpCode": "200-399"
          },
          "Port": 80,
          "Protocol": "HTTP",
          "TargetGroupArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:targetgroup/DefaultTargetGroup/12345fd69b586b",
          "TargetGroupName": "DefaultStackTargetGroup",
          "TargetType": "instance",
          "UnhealthyThresholdCount": 2,
          "VpcId": "vpc-0ff123456677887da"
        }, {
          "HealthCheckEnabled": true,
          "HealthCheckIntervalSeconds": 10,
          "HealthCheckPath": "/",
          "HealthCheckPort": "traffic-port",
          "HealthCheckProtocol": "HTTP",
          "HealthCheckTimeoutSeconds": 5,
          "HealthyThresholdCount": 2,
          "LoadBalancerArns": ["arn:aws:elasticloadbalancing:eu-west-3:123456789012:loadbalancer/app/ecs-infra-ALB/123454e57759a20f"],
          "Matcher": {
            "HttpCode": "200"
          },
          "Port": 80,
          "Protocol": "HTTP",
          "TargetGroupArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:targetgroup/DefaultTargetGroup/12345f4f3541940",
          "TargetGroupName": "DefaultTargetGroup",
          "TargetType": "instance",
          "UnhealthyThresholdCount": 2,
          "VpcId": "vpc-0ff123456677887da"
        }]
      }
    })
  },
}