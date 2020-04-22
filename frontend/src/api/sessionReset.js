import axios from 'axios'

export default {
  reset(data, cb, errorCb) {
    axios.post(`${data.serverPath}/session_reset`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}