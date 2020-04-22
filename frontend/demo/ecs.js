export default {
  getClusters(data, cb, errorCb) {
    cb({
      data: {
        "Clusters": [{
          "ActiveServicesCount": 1,
          "Attachments": null,
          "AttachmentsStatus": null,
          "CapacityProviders": [],
          "ClusterArn": "arn:aws:ecs:eu-west-3:123456789012:cluster/main-cluster",
          "ClusterName": "main-cluster",
          "DefaultCapacityProviderStrategy": [],
          "PendingTasksCount": 0,
          "RegisteredContainerInstancesCount": 3,
          "RunningTasksCount": 3,
          "Settings": [{
            "Name": "containerInsights",
            "Value": "disabled"
          }],
          "Statistics": [],
          "Status": "ACTIVE",
          "Tags": []
        }],
        "Failures": []
      }
    })
  },
  getServices(data, cb, errorCb) {
    cb({
      data: {
        "Failures": [],
        "Services": [{
          "CapacityProviderStrategy": null,
          "ClusterArn": "arn:aws:ecs:eu-west-3:123456789012:cluster/main-cluster",
          "CreatedAt": "2020-02-10T14:14:51Z",
          "CreatedBy": null,
          "DeploymentConfiguration": {
            "MaximumPercent": 200,
            "MinimumHealthyPercent": 0
          },
          "DeploymentController": null,
          "Deployments": [{
            "CapacityProviderStrategy": null,
            "CreatedAt": "2020-04-20T18:21:31Z",
            "DesiredCount": 3,
            "Id": "ecs-svc/12345677284982323",
            "LaunchType": "EC2",
            "NetworkConfiguration": null,
            "PendingCount": 0,
            "PlatformVersion": null,
            "RunningCount": 3,
            "Status": "PRIMARY",
            "TaskDefinition": "arn:aws:ecs:eu-west-3:123456789012:task-definition/ecs-project:10",
            "UpdatedAt": "2020-04-20T18:22:03Z"
          }],
          "DesiredCount": 3,
          "EnableECSManagedTags": false,
          "Events": [{
            "CreatedAt": "2020-04-21T06:28:08Z",
            "Id": "8d752829-1415-1234-b7e2-390065c7ebea",
            "Message": "(service ecs-project-WebService-ABCDEFGH) has reached a steady state."
          }, {
            "CreatedAt": "2020-04-21T00:27:45Z",
            "Id": "1f348bb3-4266-1234-805a-2cf9035a1153",
            "Message": "(service ecs-project-WebService-ABCDEFGH) has reached a steady state."
          }, {
            "CreatedAt": "2020-04-20T18:27:02Z",
            "Id": "9ce84894-cc99-1234-a35c-3d646e43e94a",
            "Message": "(service ecs-project-WebService-ABCDEFGH) has reached a steady state."
          }, {
            "CreatedAt": "2020-04-20T18:26:43Z",
            "Id": "71b82856-13a7-1234-b310-4856b1f1025c",
            "Message": "(service ecs-project-WebService-ABCDEFGH) has stopped 3 running tasks: (task a3138a45-1234-1234-1234-4485547790ea) (task 717b9caa-1234-1234-1234-f53d71ace85c) (task 529ab455-1234-1234-1234-2bb5cfea4366)."
          }, {
            "CreatedAt": "2020-04-20T18:21:51Z",
            "Id": "e62b15f7-7a8b-1234-8a31-fbe3741b147c",
            "Message": "(service ecs-project-WebService-ABCDEFGH) registered 3 targets in (target-group arn:aws:elasticloadbalancing:eu-west-3:123456789012:targetgroup/BacademieTargetGroup/e020ee5418da9b3a)"
          }, {
            "CreatedAt": "2020-04-20T18:21:41Z",
            "Id": "6a9cacb9-5caf-1234-8b62-29be5f677134",
            "Message": "(service ecs-projectWebService-ABCDEFGH) has started 3 tasks: (task 37cb4374-1234-1234-1234-4ef73720166b) (task 5325d4d9-1234-1234-1234-4ef471af7f54) (task 027b78b8-1234-1234-1234-e9bae9a96a45)."
          }, {
            "CreatedAt": "2020-04-20T18:21:41Z",
            "Id": "5f71fc79-c1d5-1234-994e-1c01f9b059cd",
            "Message": "(service ecs-project-WebService-ABCDEFGH) has begun draining connections on 3 tasks."
          }, {
            "CreatedAt": "2020-04-20T18:21:41Z",
            "Id": "63577e15-3f1d-1234-be68-e82ba8b334b6",
            "Message": "(service ecs-project-WebService-ABCDEFGH) deregistered 3 targets in (target-group arn:aws:elasticloadbalancing:eu-west-3:123456789012:targetgroup/BacademieTargetGroup/e020ee5418da9b3a)"
          }, {
            "CreatedAt": "2020-04-20T14:17:20Z",
            "Id": "857b7320-ccfe-1234-a6d5-4ec36f015d8f",
            "Message": "(service ecs-project-WebService-ABCDEFGH) has reached a steady state."
          }, {
            "CreatedAt": "2020-04-20T08:16:52Z",
            "Id": "2c0d417e-2db2-1234-a0c5-f4f77da910dc",
            "Message": "(service ecs-project-WebService-ABCDEFGH) has reached a steady state."
          }],
          "HealthCheckGracePeriodSeconds": 0,
          "LaunchType": "EC2",
          "LoadBalancers": [{
            "ContainerName": "test-extraction",
            "ContainerPort": 3000,
            "LoadBalancerName": null,
            "TargetGroupArn": "arn:aws:elasticloadbalancing:eu-west-3:123456789012:targetgroup/BacademieTargetGroup/e020ee5418da9b3a"
          }],
          "NetworkConfiguration": null,
          "PendingCount": 0,
          "PlacementConstraints": [],
          "PlacementStrategy": [],
          "PlatformVersion": null,
          "PropagateTags": "NONE",
          "RoleArn": "arn:aws:iam::123456789012:role/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS",
          "RunningCount": 3,
          "SchedulingStrategy": "REPLICA",
          "ServiceArn": "arn:aws:ecs:eu-west-3:123456789012:service/ecs-project-WebService-ABCDEFGH",
          "ServiceName": "ecs-project-WebService-ABCDEFGH",
          "ServiceRegistries": [],
          "Status": "ACTIVE",
          "Tags": null,
          "TaskDefinition": "arn:aws:ecs:eu-west-3:123456789012:task-definition/ecs-project:10",
          "TaskSets": null
        }]
      }
    })
  },
  getTasks(data, cb, errorCb) {
    cb({
      data: {
        "Failures": [],
        "Tasks": [{
          "Attachments": [],
          "Attributes": null,
          "AvailabilityZone": "eu-west-3b",
          "CapacityProviderName": null,
          "ClusterArn": "arn:aws:ecs:eu-west-3:123456789012:cluster/main-cluster",
          "Connectivity": "CONNECTED",
          "ConnectivityAt": "2020-04-20T18:21:41Z",
          "ContainerInstanceArn": "arn:aws:ecs:eu-west-3:123456789012:container-instance/b20e51c4-1234-1234-1234-38aec388cc71",
          "Containers": [{
            "ContainerArn": "arn:aws:ecs:eu-west-3:123456789012:container/dcc07c23-1234-1234-1234-0248e49159bb",
            "Cpu": "256",
            "ExitCode": null,
            "GpuIds": null,
            "HealthStatus": "UNKNOWN",
            "Image": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/test-extraction:latest",
            "ImageDigest": "sha256:1fc09bb0338875ff015c600e1f10187b9f3eb36555f31e695144b4cffb08d57a",
            "LastStatus": "RUNNING",
            "Memory": "300",
            "MemoryReservation": null,
            "Name": "test-extraction",
            "NetworkBindings": [{
              "BindIP": "0.0.0.0",
              "ContainerPort": 3000,
              "HostPort": 32784,
              "Protocol": "tcp"
            }],
            "NetworkInterfaces": [],
            "Reason": null,
            "RuntimeId": "1234f8edd6486d7f7cd6f2805d0612345a933939de4ec471a742ea383558f7d",
            "TaskArn": "arn:aws:ecs:eu-west-3:123456789012:task/027b78b8-1234-1234-1234-e9bae9a96a45"
          }],
          "Cpu": "256",
          "CreatedAt": "2020-04-20T18:21:41Z",
          "DesiredStatus": "RUNNING",
          "ExecutionStoppedAt": null,
          "Group": "service:ecs-project-WebService-ABCDEFGH",
          "HealthStatus": "UNKNOWN",
          "InferenceAccelerators": null,
          "LastStatus": "RUNNING",
          "LaunchType": "EC2",
          "Memory": "300",
          "Overrides": {
            "ContainerOverrides": [{
              "Command": null,
              "Cpu": null,
              "Environment": null,
              "Memory": null,
              "MemoryReservation": null,
              "Name": "test-extraction",
              "ResourceRequirements": null
            }],
            "Cpu": null,
            "ExecutionRoleArn": null,
            "InferenceAcceleratorOverrides": [],
            "Memory": null,
            "TaskRoleArn": null
          },
          "PlatformVersion": null,
          "PullStartedAt": "2020-04-20T18:21:41Z",
          "PullStoppedAt": "2020-04-20T18:21:41Z",
          "StartedAt": "2020-04-20T18:21:42Z",
          "StartedBy": "ecs-svc/712342311234562323",
          "StopCode": null,
          "StoppedAt": null,
          "StoppedReason": null,
          "StoppingAt": null,
          "Tags": [],
          "TaskArn": "arn:aws:ecs:eu-west-3:123456789012:task/027b78b8-1234-1234-1234-e9bae9a96a45",
          "TaskDefinitionArn": "arn:aws:ecs:eu-west-3:123456789012:task-definition/test-extraction:10",
          "Version": 2
        }, {
          "Attachments": [],
          "Attributes": null,
          "AvailabilityZone": "eu-west-3a",
          "CapacityProviderName": null,
          "ClusterArn": "arn:aws:ecs:eu-west-3:123456789012:cluster/main-cluster",
          "Connectivity": "CONNECTED",
          "ConnectivityAt": "2020-04-20T18:21:41Z",
          "ContainerInstanceArn": "arn:aws:ecs:eu-west-3:123456789012:container-instance/0df4dd25-1234-1234-1234-95f19dede1f5",
          "Containers": [{
            "ContainerArn": "arn:aws:ecs:eu-west-3:123456789012:container/ae30532b-1234-1234-1234-5c9c48fa91b5",
            "Cpu": "256",
            "ExitCode": null,
            "GpuIds": null,
            "HealthStatus": "UNKNOWN",
            "Image": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/test-extraction:latest",
            "ImageDigest": "sha256:1fc09bb0338875ff015c600e1f10187b9f3eb36555f31e695144b4cffb08d57a",
            "LastStatus": "RUNNING",
            "Memory": "300",
            "MemoryReservation": null,
            "Name": "test-extraction",
            "NetworkBindings": [{
              "BindIP": "0.0.0.0",
              "ContainerPort": 3000,
              "HostPort": 32784,
              "Protocol": "tcp"
            }],
            "NetworkInterfaces": [],
            "Reason": null,
            "RuntimeId": "b91c01b283e8720834778dec7bdcf6ed796f80cbee47b86e12915089c26b3f57",
            "TaskArn": "arn:aws:ecs:eu-west-3:123456789012:task/37cb4374-fc04-1234-9819-4ef73720166b"
          }],
          "Cpu": "256",
          "CreatedAt": "2020-04-20T18:21:41Z",
          "DesiredStatus": "RUNNING",
          "ExecutionStoppedAt": null,
          "Group": "service:ecs-project-WebService-ABCDEFGH",
          "HealthStatus": "UNKNOWN",
          "InferenceAccelerators": null,
          "LastStatus": "RUNNING",
          "LaunchType": "EC2",
          "Memory": "300",
          "Overrides": {
            "ContainerOverrides": [{
              "Command": null,
              "Cpu": null,
              "Environment": null,
              "Memory": null,
              "MemoryReservation": null,
              "Name": "test-extraction",
              "ResourceRequirements": null
            }],
            "Cpu": null,
            "ExecutionRoleArn": null,
            "InferenceAcceleratorOverrides": [],
            "Memory": null,
            "TaskRoleArn": null
          },
          "PlatformVersion": null,
          "PullStartedAt": "2020-04-20T18:21:41Z",
          "PullStoppedAt": "2020-04-20T18:21:41Z",
          "StartedAt": "2020-04-20T18:21:42Z",
          "StartedBy": "ecs-svc/7803223177284982323",
          "StopCode": null,
          "StoppedAt": null,
          "StoppedReason": null,
          "StoppingAt": null,
          "Tags": [],
          "TaskArn": "arn:aws:ecs:eu-west-3:123456789012:task/37cb4374-1234-4298-9819-4ef73720166b",
          "TaskDefinitionArn": "arn:aws:ecs:eu-west-3:123456789012:task-definition/test-extraction:10",
          "Version": 2
        }, {
          "Attachments": [],
          "Attributes": null,
          "AvailabilityZone": "eu-west-3c",
          "CapacityProviderName": null,
          "ClusterArn": "arn:aws:ecs:eu-west-3:123456789012:cluster/main-cluster",
          "Connectivity": "CONNECTED",
          "ConnectivityAt": "2020-04-20T18:21:41Z",
          "ContainerInstanceArn": "arn:aws:ecs:eu-west-3:123456789012:container-instance/1fb6aab1-843c-4e77-a1cf-7fb425d64f4c",
          "Containers": [{
            "ContainerArn": "arn:aws:ecs:eu-west-3:123456789012:container/1d246011-1234-1234-1234-056ba2e7d15e",
            "Cpu": "256",
            "ExitCode": null,
            "GpuIds": null,
            "HealthStatus": "UNKNOWN",
            "Image": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/test-extraction:latest",
            "ImageDigest": "sha256:1fc09bb0338875ff015c600e1f10187b9f3eb36555f31e695144b4cffb08d57a",
            "LastStatus": "RUNNING",
            "Memory": "300",
            "MemoryReservation": null,
            "Name": "test-extraction",
            "NetworkBindings": [{
              "BindIP": "0.0.0.0",
              "ContainerPort": 3000,
              "HostPort": 32784,
              "Protocol": "tcp"
            }],
            "NetworkInterfaces": [],
            "Reason": null,
            "RuntimeId": "5e362c8f972b9daed51622cfa3b219768088f466e25da567115e210b9f7dfb09",
            "TaskArn": "arn:aws:ecs:eu-west-3:123456789012:task/5325d4d9-1234-1234-1234-4ef471af7f54"
          }],
          "Cpu": "256",
          "CreatedAt": "2020-04-20T18:21:41Z",
          "DesiredStatus": "RUNNING",
          "ExecutionStoppedAt": null,
          "Group": "service:ecs-project-WebService-ABCDEFGH",
          "HealthStatus": "UNKNOWN",
          "InferenceAccelerators": null,
          "LastStatus": "RUNNING",
          "LaunchType": "EC2",
          "Memory": "300",
          "Overrides": {
            "ContainerOverrides": [{
              "Command": null,
              "Cpu": null,
              "Environment": null,
              "Memory": null,
              "MemoryReservation": null,
              "Name": "test-extraction",
              "ResourceRequirements": null
            }],
            "Cpu": null,
            "ExecutionRoleArn": null,
            "InferenceAcceleratorOverrides": [],
            "Memory": null,
            "TaskRoleArn": null
          },
          "PlatformVersion": null,
          "PullStartedAt": "2020-04-20T18:21:42Z",
          "PullStoppedAt": "2020-04-20T18:21:42Z",
          "StartedAt": "2020-04-20T18:21:43Z",
          "StartedBy": "ecs-svc/7803223177284982323",
          "StopCode": null,
          "StoppedAt": null,
          "StoppedReason": null,
          "StoppingAt": null,
          "Tags": [],
          "TaskArn": "arn:aws:ecs:eu-west-3:123456789012:task/5325d4d9-1234-1234-1234-4ef471af7f54",
          "TaskDefinitionArn": "arn:aws:ecs:eu-west-3:123456789012:task-definition/test-extraction:10",
          "Version": 2
        }]
      }
    })
  },
  forceUpdate(data, cb, errorCb) {

  },
}


