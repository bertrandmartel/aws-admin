import axios from 'axios'

export default {
  getSecrets(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/secretsmanager`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  createSecret(data, cb, errorCb) {
    axios.post(`${data.serverPath}/service/secretsmanager`, data.formData)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  deleteSecret(data, cb, errorCb) {
    axios.delete(`${data.serverPath}/service/secretsmanager?arn=${data.arn}&forceDelete=${data.forceDelete}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getSecretValue(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/secretsmanager/value?arn=${data.arn}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}