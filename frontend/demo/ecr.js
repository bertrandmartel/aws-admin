export default {
  getRepositories(data, cb, errorCb) {
    cb({
      data: {
        "NextToken": null,
        "Repositories": [{
          "CreatedAt": "2020-01-14T17:28:54Z",
          "ImageScanningConfiguration": {
            "ScanOnPush": false
          },
          "ImageTagMutability": "MUTABLE",
          "RegistryId": "123456789012",
          "RepositoryArn": "arn:aws:ecr:eu-west-3:123456789012:repository/test-extraction",
          "RepositoryName": "test-extraction",
          "RepositoryUri": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/test-extraction"
        }, {
          "CreatedAt": "2019-10-17T08:50:45Z",
          "ImageScanningConfiguration": {
            "ScanOnPush": false
          },
          "ImageTagMutability": "MUTABLE",
          "RegistryId": "123456789012",
          "RepositoryArn": "arn:aws:ecr:eu-west-3:123456789012:repository/alpine-docker",
          "RepositoryName": "alpine-docker",
          "RepositoryUri": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/alpine-docker"
        }, {
          "CreatedAt": "2020-03-13T12:39:31Z",
          "ImageScanningConfiguration": {
            "ScanOnPush": false
          },
          "ImageTagMutability": "MUTABLE",
          "RegistryId": "123456789012",
          "RepositoryArn": "arn:aws:ecr:eu-west-3:123456789012:repository/alpine-nginx",
          "RepositoryName": "alpine-nginx",
          "RepositoryUri": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/alpine-nginx"
        }, {
          "CreatedAt": "2020-03-06T17:44:07Z",
          "ImageScanningConfiguration": {
            "ScanOnPush": false
          },
          "ImageTagMutability": "MUTABLE",
          "RegistryId": "123456789012",
          "RepositoryArn": "arn:aws:ecr:eu-west-3:123456789012:repository/custom-image",
          "RepositoryName": "custom-image",
          "RepositoryUri": "123456789012.dkr.ecr.eu-west-3.amazonaws.com/custom-image"
        }]
      }
    })
  },
  getImages(data, cb, errorCb) {
    cb({
      data: {
      "ImageDetails": [{
        "ImageDigest": "sha256:da49f6ffc39aa2732b92f3a2509e4484e3bae41c5fb6a2f81d7ad0633c019b98",
        "ImagePushedAt": "2020-03-13T16:57:11Z",
        "ImageScanFindingsSummary": null,
        "ImageScanStatus": null,
        "ImageSizeInBytes": 86481289,
        "ImageTags": ["latest"],
        "RegistryId": "123456789012",
        "RepositoryName": "test-extraction"
      }, {
        "ImageDigest": "sha256:3a18a24d863055b83d4eb069472ba62069aac281e8933ee293dd791fd31d7cbe",
        "ImagePushedAt": "2020-03-13T14:08:17Z",
        "ImageScanFindingsSummary": null,
        "ImageScanStatus": null,
        "ImageSizeInBytes": 80137164,
        "ImageTags": null,
        "RegistryId": "123456789012",
        "RepositoryName": "test-extraction"
      }, {
        "ImageDigest": "sha256:12d6a7e7f406dff9b542bdb53e8db431c8faeecdeb7e8ece824b7d1153675fb0",
        "ImagePushedAt": "2020-03-13T12:42:16Z",
        "ImageScanFindingsSummary": null,
        "ImageScanStatus": null,
        "ImageSizeInBytes": 78965538,
        "ImageTags": null,
        "RegistryId": "123456789012",
        "RepositoryName": "test-extraction"
      }, {
        "ImageDigest": "sha256:5e2f5e1ac53302c6ab13a20ca603465bc4ce1d5042f7484c3d0ef5faa8505a6c",
        "ImagePushedAt": "2020-03-13T13:07:06Z",
        "ImageScanFindingsSummary": null,
        "ImageScanStatus": null,
        "ImageSizeInBytes": 78994721,
        "ImageTags": null,
        "RegistryId": "123456789012",
        "RepositoryName": "test-extraction"
      }, {
        "ImageDigest": "sha256:acd62331f0a6615e7aeae34d6f4e3be7de5d6848cf1e50d336c58085cc0b8dcc",
        "ImagePushedAt": "2020-03-13T13:40:15Z",
        "ImageScanFindingsSummary": null,
        "ImageScanStatus": null,
        "ImageSizeInBytes": 80070397,
        "ImageTags": null,
        "RegistryId": "123456789012",
        "RepositoryName": "test-extraction"
      }],
      "NextToken": null
    }
    })
  },
  deleteRepository(data, cb, errorCb) {

  },
  createRepository(data, cb, errorCb) {

  },
}