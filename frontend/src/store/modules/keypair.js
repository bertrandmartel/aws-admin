import ec2 from '../../api/ec2'

const state = {
  search: '',
  showActions: false,
  createDialog: false,
  deleteDialog: false,
  selectedItems: [],
  keyPrivateDialog: false,
  pendingCreateKeypair: '',
  createdPrivateKey: '',
  headers: [{
    text: 'KeyName',
    value: 'KeyName',
    filterable: true
  },
  {
    text: 'KeyPairId',
    value: 'KeyPairId',
    filterable: true
  },
  {
    text: 'KeyFingerprint',
    value: 'KeyFingerprint',
    filterable: true
  }],
  keypairs: [],
  selectedKeypair: {}
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
    state.selectedKeypair = value
    state.selectedItems = [value]
  },
  updateKeypairs(state, value){
    state.keypairs = value
  },
  updateCreateDialog(state, value){
    state.createDialog = value
  },
  updatePendingCreateKeypair(state, value){
    state.pendingCreateKeypair = value
  },
  updatePrivateKeyDialog(state, value){
    state.keyPrivateDialog = value
  },
  updateCreatedPrivateKey(state, value){
    state.createdPrivateKey = value
  },
  updateDeleteDialog(state, value){
    state.deleteDialog = value
  },
  closeFingerPrint(state){
    state.createdPrivateKey = ''
    state.keyPrivateDialog = false
  }
}

const actions = {
  onClickRow({commit}, event){
    commit('setSelection', event)
  },
  onItemSelected({commit, dispatch}, event){
    if (event.value) {
      commit('setSelection', event.item)
    } else {
      commit('updateSelected', [event.item])
    }
  },
  initKeypair({state, rootState, dispatch, commit}, noFirstSelect){
    ec2.getKeypairs({
      serverPath: rootState.core.serverPath,
    },
    (response) => {
      if (response.data.KeyPairs){
        commit('updateKeypairs', response.data.KeyPairs)
        if (!noFirstSelect && (state.keypairs.length > 0)){
          commit('setSelection', state.keypairs[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  refresh({dispatch}){
    dispatch('initKeypair', true)
  },
  createKeypair({state, rootState, commit, dispatch}){
    if (!state.pendingCreateKeypair){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Keypair name is required"}, {root:true})
    }
    ec2.createKeypair({
      serverPath: rootState.core.serverPath,
      name: state.pendingCreateKeypair
    },
    (response) => {
      commit('updateCreatedPrivateKey', response.data.KeyMaterial)
      commit('updateCreateDialog', false)
      commit('updatePendingCreateKeypair', '')
      commit('updatePrivateKeyDialog', true)
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
  deleteKeypair({state, rootState, commit, dispatch}){
    ec2.deleteKeypair({
      serverPath: rootState.core.serverPath,
      name: state.selectedKeypair.KeyName
    },
    (response) => {
      commit('updateDeleteDialog', false)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}