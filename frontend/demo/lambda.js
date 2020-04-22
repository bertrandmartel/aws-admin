export default {
  getLambdaList(data, cb, errorCb) {
    cb({
      data: {
        "Functions": [{
          "CodeSha256": "qAB/w123424ihI03rc6r5EC0d123438OLT3i+MQ=",
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
          "FunctionName": "some-LambdaFunction-ABCDEF12345",
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
          "Role": "arn:aws:iam::123456789123:role/some-LambdaIAMRole-ABCDEF12345",
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
    cb({
      data: {
        "Code": {
          "Location": "https://awslambda-eu-west-3-tasks.s3.eu-west-3.amazonaws.com/snapshots/123456789012/some-LambdaFunction-LambdaFunction-ABCDEF12345-de8ddf69-1234-41b9-1234-48886d118ad0",
          "RepositoryType": "S3"
        },
        "Concurrency": null,
        "Configuration": {
          "CodeSha256": "qAB/sdqd1234sdfPf24ihI03rc6r5EB0dAsP4w38OLT3i+NQ=",
          "CodeSize": 479,
          "DeadLetterConfig": null,
          "Description": "Send a SQS message with the S3 Event",
          "Environment": {
            "Error": null,
            "Variables": {
              "AwsAccountId": "123456789012",
              "AwsRegion": "eu-west-3",
              "QueueName": "ProcessMediaQueue"
            }
          },
          "FunctionArn": "arn:aws:lambda:eu-west-3:123456789012:function:some-LambdaFunction-LambdaFunction-ABCDEF12345",
          "FunctionName": "some-LambdaFunction-LambdaFunction-ABCDEF12345",
          "Handler": "index.handler",
          "KMSKeyArn": null,
          "LastModified": "2020-01-31T12:57:26.902+0000",
          "LastUpdateStatus": "Successful",
          "LastUpdateStatusReason": null,
          "LastUpdateStatusReasonCode": null,
          "Layers": null,
          "MasterArn": null,
          "MemorySize": 128,
          "RevisionId": "7e00cfc1-12334-49bd-12334-fc5f6ad5795d",
          "Role": "arn:aws:iam::123456789012:role/some-LambdaFunction-LambdaIAMRole-ABCDEF12345",
          "Runtime": "nodejs12.x",
          "State": "Active",
          "StateReason": null,
          "StateReasonCode": null,
          "Timeout": 300,
          "TracingConfig": {
            "Mode": "PassThrough"
          },
          "Version": "$LATEST",
          "VpcConfig": null
        },
        "Tags": {
          "aws:cloudformation:logical-id": "LambdaFunction",
          "aws:cloudformation:stack-id": "arn:aws:cloudformation:eu-west-3:123456789012:stack/some-LambdaFunction/12346980-1234-1234-1234-06124ecbcb2e",
          "aws:cloudformation:stack-name": "some-LambdaFunction",
          "lambda:createdBy": "SAM"
        }
      }
    })
  },
}