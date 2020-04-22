import s3 from '../../api/s3'

const state = {
  search: '',
  tabState: 0,
  deleteObjectDialog: false,
  deleteBucketDialog: false,
  createBucketDialog: false,
  uploadDialog: false,
  showBucketActions: false,
  showObjectActions: false,
  pendingCreateBucketName: '',
  regionErrorMessage: '',
  selectedBucket: {},
  selectedObject: {},
  selectedObjectArr: [],
  selectedItems: [],
  buckets: [],
  objects: [],
  bucketHeaders: [{
      text: 'Name',
      align: 'start',
      value: 'Name',
      filterable: true
  }],
  objectHeaders: [{
    text: 'Key',
    value: 'Key'
  },{
    text: 'Size',
    value: 'Size'
  },{
    text: 'LastModified',
    value: 'LastModified'
  },{
    text: 'StorageClass',
    value: 'StorageClass'
  }],
  createdObject: null,
  createdObjectKey: "",
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateSelected(state, value){
    state.selectedItems = value
  },
  updateBuckets(state, value){
    state.buckets = value
  },
  updateShowBucketActions(state, value){
    state.showBucketActions = value
  },
  updateSelectedBucket(state, value){
    state.selectedBucket = value 
  },
  updateRegionErrorMessage(state, value){
    state.regionErrorMessage = value
  },
  updateShowObjectActions(state, value){
    state.showObjectActions = value
  },
  setObjectSelection(state, value){
    state.selectedObject = value;
    state.selectedObjectArr = [value];
    state.showObjectActions = true
  },
  updateDeleteObjectDialog(state, value){
    state.deleteObjectDialog = value
  },
  updateDeleteBucketDialog(state, value){
    state.deleteBucketDialog = value
  },
  updateCreateBucketDialog(state, value){
    state.createBucketDialog = value
  },
  updatePendingCreateBucketName(state, value){
    state.pendingCreateBucketName = value
  },
  updateObjectSelected(state, value){
    state.selectedObjectArr = value
  },
  updateUploadDialog(state, value){
    state.uploadDialog = value
  },
  updateCreateObject(state, value){
    state.createdObject = value
  },
  updateCreateObjectKey(state, value){
    state.createdObjectKey = value
  },
  onUploadFile(state, file){
    if (file){
      state.createdObject = file
      if (!state.createdObjectKey){
        state.createdObjectKey = file.name
      }
    } else {
      state.createdObject = null
    }
  },
  updateTabState(state, value){
    state.tabState = value
  },
  updateObjects(state, value){
    state.objects = value
  }
}

const getters = {
  getDownloadLink: ({state, rootState}) => () => {
    return `${rootState.core.serverPath}/service/s3/objects/download?name=${state.selectedBucket.Name}&key=${state.selectedObject.Key}&_=${new Date().getTime()}`
  }
}

const actions = {
  onBucketClickRow({dispatch}, event){
    dispatch('initS3', event)
  },
  onBucketItemSelected({commit, dispatch}, event){
    if (event.value) {
      dispatch('initS3', event.item)
    } else {
      commit('updateSelected', [event.item])
    }
  },
  onObjectClickRow({commit}, event){
    commit('setObjectSelection', event) 
  },
  onObjectItemSelected({commit, dispatch}, event){
    if (event.value) {
      commit('setObjectSelection', event.item)
    } else {
      commit('updateObjectSelected', [event.item])
    }
  },
  initBuckets({commit, state, dispatch, rootState}, noFirstSelect){
    s3.getBuckets({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.Buckets){
        var buckets = response.data.Buckets;
        buckets.sort((a,b) => {
          return new Date(b.CreationDate) - new Date(a.CreationDate);
        });
        commit('updateBuckets', buckets)
        if (!noFirstSelect && (state.buckets.length > 0)){
          dispatch('initS3', state.buckets[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  initS3({commit, dispatch}, item){
    commit('updateSelectedBucket', item)
    commit('updateSelected', [item])
    commit('updateShowBucketActions', true)
    dispatch('initObjects')
  },
  initObjects({commit, state, rootState}, noFirstSelect){
    s3.getObjects({
      serverPath: rootState.core.serverPath,
      name: state.selectedBucket.Name
    },
    (response) => {
      commit('updateRegionErrorMessage', "")
      if (response.data.Contents){
        var objects = response.data.Contents;
        objects.sort(function(a,b){
          return new Date(b.LastModified) - new Date(a.LastModified);
        });
        commit('updateObjects', objects)
        if (!noFirstSelect && (state.objects.length > 0)){
          commit('setObjectSelection', state.objects[0])
        } else {
          commit('updateShowObjectActions', false)
        }
      } else {
        commit('updateObjects', [])
        commit('updateShowObjectActions', false)
      }
    },
    (err) => {
      console.log(err);
      commit('updateObjects', [])
      commit('updateShowObjectActions', false)
      if (err.response.data.error_description.indexOf("BucketRegionError") != -1){
        commit('updateRegionErrorMessage', err.response.data.error_description)
      }
    })
  },
  deleteObject({commit, state, dispatch, rootState}){
    s3.deleteObject({
      serverPath: rootState.core.serverPath,
      name: state.selectedBucket.Name,
      key: state.selectedObject.Key
    },
    (response) => {
      commit('updateDeleteObjectDialog', false)
      setTimeout(() => {
        dispatch('refreshObjects')
      }, 2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  deleteBucket({commit, state, rootState, dispatch}){
    s3.deleteBucket({
      serverPath: rootState.core.serverPath,
      name: state.selectedBucket.Name
    },
    (response) => {
      commit('updateDeleteBucketDialog', false)
      setTimeout(() => {
        dispatch('refresh')
      }, 2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  createBucket({commit, state, rootState, dispatch}){
    if (!state.pendingCreateBucketName){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Bucket name is required"}, {root:true})
    }
    s3.createBucket({
      serverPath: rootState.core.serverPath,
      name: state.pendingCreateBucketName
    },
    (response) => {
      commit('updateCreateBucketDialog', false)
      commit('updatePendingCreateBucketName', '')
      commit('updateShowObjectActions', false)
      setTimeout(() => {
        dispatch('refresh')
      }, 2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  refreshObjects({dispatch}){
    dispatch('initObjects', true)
  },
  refresh({dispatch}){
    dispatch('initBuckets', true)
  },
  uploadObject({commit, state, rootState, dispatch}){
    if (!state.createdObject) {
      return dispatch('core/dispatchMessage', {color: 'error', message: "File is missing"}, {root:true})
    }
    const formData = new FormData();
    formData.append('key', state.createdObjectKey);
    formData.append('name', state.selectedBucket.Name);
    formData.append('file', state.createdObject);

    s3.uploadObject({
      serverPath: rootState.core.serverPath,
      formData: formData
    },
    (response) => {
      commit('updateCreateObject', null)
      commit('updateCreateObjectKey', "")
      setTimeout(() => {
        dispatch('refreshObjects')
      },2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  downladObject({state, dispatch, rootState}){
    s3.downloadObject({
      serverPath: rootState.core.serverPath,
      name: state.selectedBucket.Name,
      key: state.selectedObject.Key
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}