import axios from 'axios'

export default {
  getLambdaList(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/lambda`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getFunction(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/lambda/function?name=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}