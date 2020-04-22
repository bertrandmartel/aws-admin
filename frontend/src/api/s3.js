import axios from 'axios'

export default {
  getBuckets(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/s3`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getObjects(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/s3/objects?name=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  deleteObject(data, cb, errorCb) {
    axios.delete(`${data.serverPath}/service/s3/objects?name=${data.name}&key=${data.key}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  deleteBucket(data, cb, errorCb) {
    axios.delete(`${data.serverPath}/service/s3?name=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  createBucket(data, cb, errorCb) {
    axios.put(`${data.serverPath}/service/s3?name=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  uploadObject(data, cb, errorCb) {
    axios.put(`${data.serverPath}/service/s3/objects`, data.formData)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  downloadObject(data) {
    window.open(`${data.serverPath}/service/s3/objects/download?name=${data.name}&key=${data.key}&_=${new Date().getTime()}`, '_blank');
  },
}