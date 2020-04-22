import axios from 'axios'

export default {
  getCertificates(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/acm/list`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  deleteCertificate(data, cb, errorCb) {
    axios.delete(`${data.serverPath}/service/acm?arn=${data.arn}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  importCertificate(data, cb, errorCb) {
    axios.put(`${data.serverPath}/service/acm/import`, data.formData)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}