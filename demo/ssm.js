export default {
  getInstances(data, cb, errorCb){
    cb({
      data: {
        "InstanceInformationList": [{
          "ActivationId": null,
          "AgentVersion": "2.3.978.0",
          "AssociationOverview": {
            "DetailedStatus": "Success",
            "InstanceAssociationStatusAggregatedCount": {
              "Success": 3
            }
          },
          "AssociationStatus": "Success",
          "ComputerName": "ip-172-16-1-207.eu-west-3.compute.internal",
          "IPAddress": "172.16.1.207",
          "IamRole": null,
          "InstanceId": "i-052fe68488ebab7c5",
          "IsLatestVersion": true,
          "LastAssociationExecutionDate": "2020-04-21T08:29:00Z",
          "LastPingDateTime": "2020-04-21T08:28:15Z",
          "LastSuccessfulAssociationExecutionDate": "2020-04-21T08:29:00Z",
          "Name": "infrastructure-stack-NI2",
          "PingStatus": "Online",
          "PlatformName": "Amazon Linux AMI",
          "PlatformType": "Linux",
          "PlatformVersion": "2018.03",
          "RegistrationDate": null,
          "ResourceType": "EC2Instance"
        }, {
          "ActivationId": null,
          "AgentVersion": "2.3.978.0",
          "AssociationOverview": {
            "DetailedStatus": "Success",
            "InstanceAssociationStatusAggregatedCount": {
              "Success": 3
            }
          },
          "AssociationStatus": "Success",
          "ComputerName": "ip-172-16-2-233.eu-west-3.compute.internal",
          "IPAddress": "172.16.2.233",
          "IamRole": null,
          "InstanceId": "i-0b3a05baa4cc60486",
          "IsLatestVersion": true,
          "LastAssociationExecutionDate": "2020-04-21T07:59:02Z",
          "LastPingDateTime": "2020-04-21T08:27:26Z",
          "LastSuccessfulAssociationExecutionDate": "2020-04-21T07:59:02Z",
          "Name": "infrastructure-stack-NI3",
          "PingStatus": "Online",
          "PlatformName": "Amazon Linux AMI",
          "PlatformType": "Linux",
          "PlatformVersion": "2018.03",
          "RegistrationDate": null,
          "ResourceType": "EC2Instance"
        }, {
          "ActivationId": null,
          "AgentVersion": "2.3.978.0",
          "AssociationOverview": {
            "DetailedStatus": "Success",
            "InstanceAssociationStatusAggregatedCount": {
              "Success": 3
            }
          },
          "AssociationStatus": "Success",
          "ComputerName": "ip-172-16-0-254.eu-west-3.compute.internal",
          "IPAddress": "172.16.0.254",
          "IamRole": null,
          "InstanceId": "i-0ac968a3e377106a9",
          "IsLatestVersion": true,
          "LastAssociationExecutionDate": "2020-04-21T08:02:18Z",
          "LastPingDateTime": "2020-04-21T08:29:06Z",
          "LastSuccessfulAssociationExecutionDate": "2020-04-21T08:02:18Z",
          "Name": "infrastructure-stack-NI1",
          "PingStatus": "Online",
          "PlatformName": "Amazon Linux AMI",
          "PlatformType": "Linux",
          "PlatformVersion": "2018.03",
          "RegistrationDate": null,
          "ResourceType": "EC2Instance"
        }],
        "NextToken": null
      }
    })
  },
  startSession(data, cb, errorCb){
    cb({
      data: {
        "SessionId":"someuser-01234567890012345",
        "StreamUrl":"wss://ssmmessages.eu-west-3.amazonaws.com/v1/data-channel/someuser-01234567890012345?role=publish_subscribe",
        "TokenValue":"some_super_long_token"
      }
    })
  },
}