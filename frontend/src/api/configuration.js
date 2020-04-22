import axios from 'axios'

export default {
  setConfiguration(data, cb, errorCb) {
    axios.post(`${data.serverPath}/configuration`, data.payload)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}