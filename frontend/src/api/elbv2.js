import axios from 'axios'

export default {
  getLoadBalancers(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/elbv2/lb`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getTargetGroups(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/elbv2/tg`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}