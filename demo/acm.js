export default {
  getCertificates(data, cb, errorCb) {
    cb({
      data: {
        "CertificateSummaryList": [{
          "CertificateArn": "arn:aws:acm:eu-west-3:123456789012:certificate/12345678-1234-1234-1234-123456789090",
          "DomainName": "test.example.fr"
        }],
        "NextToken": null
      }
    })
  },
  deleteCertificate(data, cb, errorCb) {

  },
  importCertificate(data, cb, errorCb) {

  },
}