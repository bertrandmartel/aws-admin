export default {
  getSecrets(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "SecretList": [{
          "ARN": "arn:aws:secretsmanager:eu-west-3:123456789123:secret:secret1",
          "DeletedDate": null,
          "Description": null,
          "KmsKeyId": null,
          "LastAccessedDate": "2020-04-12T00:00:00Z",
          "LastChangedDate": "2020-04-12T02:54:19Z",
          "LastRotatedDate": null,
          "Name": "testSecret1",
          "OwningService": null,
          "RotationEnabled": null,
          "RotationLambdaARN": null,
          "RotationRules": null,
          "SecretVersionsToStages": {
            "aefb1234-1234-1234-1234-12345678901": ["AWSCURRENT"]
          },
          "Tags": []
        }, {
          "ARN": "arn:aws:secretsmanager:eu-west-3:123456789123:secret:secret2",
          "DeletedDate": null,
          "Description": null,
          "KmsKeyId": null,
          "LastAccessedDate": "2020-04-10T00:00:00Z",
          "LastChangedDate": "2020-04-10T19:21:53Z",
          "LastRotatedDate": null,
          "Name": "testSecret2",
          "OwningService": null,
          "RotationEnabled": null,
          "RotationLambdaARN": null,
          "RotationRules": null,
          "SecretVersionsToStages": {
            "aefb1234-1234-1234-1234-12345678901": ["AWSCURRENT"]
          },
          "Tags": []
        }, {
          "ARN": "arn:aws:secretsmanager:eu-west-3:123456789123:secret:secret3",
          "DeletedDate": null,
          "Description": null,
          "KmsKeyId": null,
          "LastAccessedDate": "2020-04-12T00:00:00Z",
          "LastChangedDate": "2020-04-12T02:54:19Z",
          "LastRotatedDate": null,
          "Name": "secretUser3",
          "OwningService": null,
          "RotationEnabled": null,
          "RotationLambdaARN": null,
          "RotationRules": null,
          "SecretVersionsToStages": {
            "aefb1234-1234-1234-1234-12345678901": ["AWSCURRENT"]
          },
          "Tags": []
        }, {
          "ARN": "arn:aws:secretsmanager:eu-west-3:123456789123:secret:test-secret",
          "DeletedDate": null,
          "Description": null,
          "KmsKeyId": null,
          "LastAccessedDate": "2020-04-11T00:00:00Z",
          "LastChangedDate": "2020-04-11T01:25:32Z",
          "LastRotatedDate": null,
          "Name": "test-secret",
          "OwningService": null,
          "RotationEnabled": null,
          "RotationLambdaARN": null,
          "RotationRules": null,
          "SecretVersionsToStages": {
            "aefb1234-1234-1234-1234-12345678901": ["AWSCURRENT"]
          },
          "Tags": null
        }]
      }
    })
  },
  createSecret(data, cb, errorCb) {

  },
  deleteSecret(data, cb, errorCb) {

  },
  getSecretValue(data, cb, errorCb) {

  },
}