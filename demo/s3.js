export default {
  getBuckets(data, cb, errorCb) {
    cb({
      data: {
        "Buckets": [{
          "CreationDate": "2020-03-13T10:15:25Z",
          "Name": "howther"
        }, {
          "CreationDate": "2020-03-26T15:22:57Z",
          "Name": "watcanvas"
        }, {
          "CreationDate": "2020-04-20T20:24:01Z",
          "Name": "timelect"
        }, {
          "CreationDate": "2020-03-02T14:53:35Z",
          "Name": "runlog"
        }, {
          "CreationDate": "2020-03-02T14:53:51Z",
          "Name": "jcart"
        }],
        "Owner": {
          "DisplayName": null,
          "ID": "1234567891234567890123456708"
        }
      }
    })
  },
  getObjects(data, cb, errorCb) {
    cb({
      data: {
        "CommonPrefixes": null,
        "Contents": [{
          "ETag": "\"12341165cd5ccef06177526834d0ed\"",
          "Key": "test.json",
          "LastModified": "2020-03-09T19:01:21Z",
          "Owner": {
            "DisplayName": null,
            "ID": "1234567891234567890123456708"
          },
          "Size": 2246,
          "StorageClass": "STANDARD"
        }, {
          "ETag": "\"1234fea7e7f459faa76f616a339575\"",
          "Key": "test2.json",
          "LastModified": "2020-03-09T19:01:21Z",
          "Owner": {
            "DisplayName": null,
            "ID": "1234567891234567890123456708"
          },
          "Size": 6535,
          "StorageClass": "STANDARD"
        }, {
          "ETag": "\"1234044198f710884839dbd62ea3b22\"",
          "Key": "test3.json",
          "LastModified": "2020-03-09T19:01:21Z",
          "Owner": {
            "DisplayName": null,
            "ID": "1234567891234567890123456708"
          },
          "Size": 193,
          "StorageClass": "STANDARD"
        }, {
          "ETag": "\"12348ed623350238c40ca4c583354f\"",
          "Key": "test4.json",
          "LastModified": "2020-03-09T19:01:21Z",
          "Owner": {
            "DisplayName": null,
            "ID": "1234567891234567890123456708"
          },
          "Size": 747,
          "StorageClass": "STANDARD"
        }],
        "Delimiter": null,
        "EncodingType": null,
        "IsTruncated": false,
        "Marker": "",
        "MaxKeys": 1000,
        "Name": "howther",
        "NextMarker": null,
        "Prefix": ""
      }
    })
  },
  deleteObject(data, cb, errorCb) {

  },
  deleteBucket(data, cb, errorCb) {

  },
  createBucket(data, cb, errorCb) {

  },
  uploadObject(data, cb, errorCb) {

  },
  downloadObject(data) {
    
  },
}