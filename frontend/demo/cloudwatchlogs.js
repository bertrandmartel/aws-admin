export default {
  getLogGroups(data, cb, errorCb) {
    cb({
      data: {
        "LogGroups": [{
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/TestCheck:*",
          "CreationTime": 1582558399714,
          "KmsKeyId": null,
          "LogGroupName": "/aws/lambda/TestCheck",
          "MetricFilterCount": 0,
          "RetentionInDays": null,
          "StoredBytes": 1249
        }, {
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/LambdaProvisioning-lambda-custom-resource:*",
          "CreationTime": 1586732012677,
          "KmsKeyId": null,
          "LogGroupName": "/aws/lambda/LambdaProvisioning-lambda-custom-resource",
          "MetricFilterCount": 0,
          "RetentionInDays": null,
          "StoredBytes": 1802
        }, {
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/custom-test:*",
          "CreationTime": 1571214271444,
          "KmsKeyId": null,
          "LogGroupName": "/aws/lambda/custom-test",
          "MetricFilterCount": 0,
          "RetentionInDays": null,
          "StoredBytes": 746
        }, {
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/data-medias-LambdaFunction-ABCDEF12345:*",
          "CreationTime": 1580303093646,
          "KmsKeyId": null,
          "LogGroupName": "/aws/lambda/data-medias-LambdaFunction-ABCDEF12345",
          "MetricFilterCount": 0,
          "RetentionInDays": null,
          "StoredBytes": 3246
        }, {
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/data-medias-LambdaFunction-ABCDEF123452:*",
          "CreationTime": 1580294549967,
          "KmsKeyId": null,
          "LogGroupName": "/aws/lambda/data-medias-LambdaFunction-ABCDEF12345",
          "MetricFilterCount": 0,
          "RetentionInDays": null,
          "StoredBytes": 1112
        }, {
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/data-medias-LambdaFunction-ABCDEF123453:*",
          "CreationTime": 1580475964588,
          "KmsKeyId": null,
          "LogGroupName": "/aws/lambda/data-medias-LambdaFunction-ABCDEF12345",
          "MetricFilterCount": 0,
          "RetentionInDays": null,
          "StoredBytes": 260958
        }, {
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/analyze:*",
          "CreationTime": 1571737813640,
          "KmsKeyId": null,
          "LogGroupName": "/aws/lambda/analyze",
          "MetricFilterCount": 0,
          "RetentionInDays": null,
          "StoredBytes": 3298
        }],
        "NextToken": null
      }
    })
  },
  getLogEvents(data, cb, errorCb) {
    cb({
      data: {
        "Events": [{
          "IngestionTime": 1586732021769,
          "Message": "START RequestId: 2dc08518-93ff-4c06-93ff-36854689b998 Version: $LATEST\n",
          "Timestamp": 1586732012750
        }, {
          "IngestionTime": 1586732021769,
          "Message": "2020/04/12 22:53:32 {Create cafcb459-93ff-4f19-9137-fd6ba82a8301}\n",
          "Timestamp": 1586732012751
        }, {
          "IngestionTime": 1586732021769,
          "Message": "2020/04/12 22:53:32 create\n",
          "Timestamp": 1586732012751
        }, {
          "IngestionTime": 1586732021769,
          "Message": "2020/04/12 22:53:32 sending : 93ffd462-93ff-4c23-8a4a-c0361898b332\n",
          "Timestamp": 1586732012751
        }, {
          "IngestionTime": 1586732021769,
          "Message": "END RequestId: 2dc08518-93ff-4c06-87f2-36854689b998\n",
          "Timestamp": 1586732013408
        }, {
          "IngestionTime": 1586732021769,
          "Message": "REPORT RequestId: 2dc08518-93ff-4c06-87f2-36854689b998\tDuration: 658.38 ms\tBilled Duration: 700 ms\tMemory Size: 128 MB\tMax Memory Used: 29 MB\tInit Duration: 5.81 ms\t\n",
          "Timestamp": 1586732013408
        }, {
          "IngestionTime": 1586732086065,
          "Message": "START RequestId: 12345678-76bf-93ff-ace5-f706c4b39f7b Version: $LATEST\n",
          "Timestamp": 1586732077053
        }, {
          "IngestionTime": 1586732086065,
          "Message": "2020/04/12 22:54:37 {Delete 4b2497b7-8a33-4989-8f96-7f6176f5806b}\n",
          "Timestamp": 1586732077055
        }, {
          "IngestionTime": 1586732086065,
          "Message": "2020/04/12 22:54:37 update or delete\n",
          "Timestamp": 1586732077055
        }, {
          "IngestionTime": 1586732086065,
          "Message": "2020/04/12 22:54:37 sending : 9308d462-85c0-4c23-8a4a-c0361898b332\n",
          "Timestamp": 1586732077055
        }, {
          "IngestionTime": 1586732086065,
          "Message": "END RequestId: 12345678-76bf-48d0-ace5-f706c4b39f7b\n",
          "Timestamp": 1586732077095
        }, {
          "IngestionTime": 1586732086065,
          "Message": "REPORT RequestId: 12345678-76bf-48d0-ace5-f706c4b39f7b\tDuration: 40.09 ms\tBilled Duration: 100 ms\tMemory Size: 128 MB\tMax Memory Used: 30 MB\t\n",
          "Timestamp": 1586732077095
        }],
        "NextBackwardToken": "b/3538530631234001798939690702470152623654730086219776",
        "NextForwardToken": "f/353853077491234501251885810547597098233928638412095493"
      }
    })
  },
  getLogStreams(data, cb, errorCb) {
    cb({
      data: {
        "LogStreams": [{
          "Arn": "arn:aws:logs:eu-west-3:123456789012:log-group:/aws/lambda/LambdaProvisioning-lambda-custom-resource:log-stream:2020/04/12/[$LATEST]e12345618764a8ab001e9cbc9863476",
          "CreationTime": 1586732012705,
          "FirstEventTimestamp": 1586732012750,
          "LastEventTimestamp": 1586732077095,
          "LastIngestionTime": 1586732086065,
          "LogStreamName": "2020/04/12/[$LATEST]e12345618764a8ab001e9cbc9863476",
          "StoredBytes": 1802,
          "UploadSequenceToken": "12345"
        }],
        "NextToken": null
      }
    })
  },
}