import axios from 'axios'

export default {
  getHostZones(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/route53/hostedzones`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getRecordSets(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/route53/recordsets?zone=${data.zone}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  deleteRecordSet(data, cb, errorCb) {
    axios.delete(`${data.serverPath}/service/route53/recordsets?zone=${data.zone}&recordName=${data.name}&recordType=${data.type}&recordValue=${data.value}&recordTTL=${data.ttl}&alias=${data.alias}&hostzoneID=${data.hostzoneID}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  createRecordSet(data, cb, errorCb) {
    axios.post(`${data.serverPath}/service/route53/recordsets?zone=${data.zone}&recordName=${data.name}&recordType=${data.type}&recordValue=${data.value}&recordTTL=${data.ttl}&alias=${data.alias}&hostzoneID=${data.hostzoneID}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}