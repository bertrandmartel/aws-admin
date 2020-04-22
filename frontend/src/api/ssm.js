import axios from 'axios'

export default {
  getInstances(data, cb, errorCb){
    axios.get(`${data.serverPath}/service/ssm/instances`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  startSession(data, cb, errorCb){
    axios.post(`${data.serverPath}/service/ssm/session?instance=${data.instanceId}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}