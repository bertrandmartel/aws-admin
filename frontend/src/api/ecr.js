import axios from 'axios'

export default {
  getRepositories(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/ecr/repositories`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  getImages(data, cb, errorCb) {
    axios.get(`${data.serverPath}/service/ecr/images?repo=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  deleteRepository(data, cb, errorCb) {
    axios.delete(`${data.serverPath}/service/ecr?name=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
  createRepository(data, cb, errorCb) {
    axios.put(`${data.serverPath}/service/ecr?name=${data.name}`)
      .then(function(response){
        cb(response)
      })
      .catch(function(err){
        errorCb(err)
      });
  },
}