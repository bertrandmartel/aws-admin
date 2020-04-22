export default {
  getLambdaList(data, cb, errorCb) {
    cb({
      data: {
        "Functions": [{
          "CodeSha256": "qAB/wREvgIPf24ihI03rc6r5EC0dAsM4z38OLT3i+MQ=",
          "CodeSize": 479,
          "DeadLetterConfig": null,
          "Description": "Send a SQS message with the S3 Event",
          "Environment": {
            "Error": null,
            "Variables": {
              "AwsAccountId": "123456789123",
              "AwsRegion": "eu-west-3",
              "QueueName": "ProcessMediaQueue"
            }
          },
          "FunctionArn": "arn:aws:lambda:eu-west-3:123456789123:function:data-medias-LambdaFunction-ABCDEF12345",
          "FunctionName": "labinnovation-wordpress-data-medias-LambdaFunction-ABCDEF12345",
          "Handler": "index.handler",
          "KMSKeyArn": null,
          "LastModified": "2020-01-31T12:57:26.902+0000",
          "LastUpdateStatus": null,
          "LastUpdateStatusReason": null,
          "LastUpdateStatusReasonCode": null,
          "Layers": null,
          "MasterArn": null,
          "MemorySize": 128,
          "RevisionId": "7e00cfc1-1234-1234-1234-fc5f6ad5795d",
          "Role": "arn:aws:iam::123456789123:role/labinnovation-wordpress-data-medias-LambdaIAMRole-ABCDEF12345",
          "Runtime": "nodejs12.x",
          "State": null,
          "StateReason": null,
          "StateReasonCode": null,
          "Timeout": 300,
          "TracingConfig": {
            "Mode": "PassThrough"
          },
          "Version": "$LATEST",
          "VpcConfig": null
        }],
        "NextMarker": null
      }
    })
  },
  getFunction(data, cb, errorCb) {

  },
}