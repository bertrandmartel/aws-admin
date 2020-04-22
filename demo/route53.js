export default {
  getHostZones(data, cb, errorCb) {
    cb({
      data: {
        "HostedZones": [{
          "CallerReference": "ABCDEFGH-12345-12345-12345-12345",
          "Config": {
            "Comment": null,
            "PrivateZone": false
          },
          "Id": "/hostedzone/Z3X12345678",
          "LinkedService": null,
          "Name": "example.fr.",
          "ResourceRecordSetCount": 2
        }],
        "IsTruncated": false,
        "Marker": null,
        "MaxItems": "100",
        "NextMarker": null
      }
    })
  },
  getRecordSets(data, cb, errorCb) {
    cb({
      data: {
        "IsTruncated": false,
        "MaxItems": "100",
        "NextRecordIdentifier": null,
        "NextRecordName": null,
        "NextRecordType": null,
        "ResourceRecordSets": [{
          "AliasTarget": null,
          "Failover": null,
          "GeoLocation": null,
          "HealthCheckId": null,
          "MultiValueAnswer": null,
          "Name": "example.fr.",
          "Region": null,
          "ResourceRecords": [{
            "Value": "ns-1234.awsdns-11.net."
          }, {
            "Value": "ns-1234.awsdns-12.org."
          }, {
            "Value": "ns-1234.awsdns-13.co.uk."
          }, {
            "Value": "ns-1234.awsdns-14.com."
          }],
          "SetIdentifier": null,
          "TTL": 172800,
          "TrafficPolicyInstanceId": null,
          "Type": "NS",
          "Weight": null
        }, {
          "AliasTarget": null,
          "Failover": null,
          "GeoLocation": null,
          "HealthCheckId": null,
          "MultiValueAnswer": null,
          "Name": "example.fr.",
          "Region": null,
          "ResourceRecords": [{
            "Value": "ns-1234.awsdns-12.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"
          }],
          "SetIdentifier": null,
          "TTL": 900,
          "TrafficPolicyInstanceId": null,
          "Type": "SOA",
          "Weight": null
        }]
      }
    })
  },
  deleteRecordSet(data, cb, errorCb) {

  },
  createRecordSet(data, cb, errorCb) {

  },
}