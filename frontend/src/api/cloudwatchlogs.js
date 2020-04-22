import axios from 'axios'

export default {
  getLogGroups(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/cloudwatch/loggroup`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getLogEvents(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/cloudwatch/logevents?name=${data.name}&stream=${data.stream}&startFromHead=true${data.startTime ? "&startTime=" + data.startTime : ""}${data.nextToken ? "&nextToken=" + data.nextToken : ""}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getLogStreams(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/cloudwatch/logstreams?name=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}