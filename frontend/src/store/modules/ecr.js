import ecr from '../../api/ecr'

const state = {
  deleteDialog: false,
  createDialog: false,
  showActions: false,
  pendingCreateRepo: '',
  selectedRepository: {},
  tabState: 0,
  search: '',
  repositories: [],
  images: [],
  selectedItems: [],
  repositoryHeaders: [{
    text: 'Repository Name',
    align: 'start',
    value: 'RepositoryName',
    filterable: true
  }],
  imageHeaders: [{
    text: 'ImageTags',
    value: 'ImageTags',
  },{
    text: 'ImageUri',
    value:'ImageUri',
  },
  {
    text: 'ImagePushedAt',
    value: 'ImagePushedAt'
  }],
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateSelected(state, value){
    state.selectedItems = value
  },
  setSelection(state, value){
    state.showActions = true
    state.selectedRepository = value
    state.selectedItems = [value]
  },
  updateDeleteDialog(state, value){
    state.deleteDialog = value
  },
  updateRepositories(state, value){
    state.repositories = value
  },
  updateImages(state, value){
    state.images = value
  },
  updateCreateDialog(state, value){
    state.createDialog = value
  },
  updatePendingCreateRepo(state, value){
    state.pendingCreateRepo = value
  },
  updateTabState(state, value){
    state.tabState = value
  }
}

const actions = {
  onClickRow({commit, dispatch}, event){
    commit('setSelection', event)
    dispatch('getImages')
  },
  onItemSelected({commit, dispatch}, event){
    if (event.value) {
      commit('setSelection', event.item)
      dispatch('getImages')
    } else {
      commit('updateSelected', [event.item])
    }
  },
  getRepositories({state, commit, rootState, dispatch}, noFirstSelect){
    ecr.getRepositories({
      serverPath: rootState.core.serverPath,
    },
    (response) => {
      if (response.data.Repositories){
        var repositories = response.data.Repositories.sort(function(a,b){
          return new Date(b.CreatedAt) - new Date(a.CreatedAt);
        });
        commit('updateRepositories', repositories)
        if (!noFirstSelect && state.repositories.length > 0){
          commit('setSelection', state.repositories[0])
          dispatch('getImages')
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  getImages({commit, state, rootState}){
    ecr.getImages({
      serverPath: rootState.core.serverPath,
      name: state.selectedRepository.RepositoryName
    },
    (response) => {
      if (response.data.ImageDetails){
        var images = response.data.ImageDetails.map(it => {
          it.ImageTags = it.ImageTags ? it.ImageTags[0] : ""
          it.ImageUri = `${state.selectedRepository.RepositoryUri}@${it.ImageDigest}`
          return it
        });
        images.sort(function(a,b){
          return new Date(b.ImagePushedAt) - new Date(a.ImagePushedAt);
        });
        commit('updateImages', images)
      }
    },
    (err) => {
      console.log(err);
    })
  },
  refresh({dispatch}){
    dispatch("getRepositories", true)
    dispatch("getImages")
  },
  deleteRepo({commit, state, rootState, dispatch}){
    ecr.deleteRepository({
      serverPath: rootState.core.serverPath,
      name: state.selectedRepository.RepositoryName
    },
    (response) => {
      commit('updateDeleteDialog', false)
      setTimeout(()  => {
        dispatch('getRepositories')
      }, 2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  createRepo({state, rootState, commit, dispatch}){
    if (!state.pendingCreateRepo){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Repository name is required"}, {root:true})
    }
    ecr.createRepository({
      serverPath: rootState.core.serverPath,
      name: state.pendingCreateRepo
    },
    (response) => {
      commit('updateCreateDialog', false)
      commit('updatePendingCreateRepo', "")
      setTimeout(()  => {
        dispatch('getRepositories')
      }, 2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}