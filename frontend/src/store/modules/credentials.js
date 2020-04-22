const emptyCredentials = {
  name: "",
  credentialType: 0,
  sharedCredentials: {},
  staticCredentials: {},
  fileCredentials: {}
}

const state = {
  createDialog: false,
  deleteDialog: false,
  editDialog: false,
  showActions: false,
  selectedItems: [],
  credentialsEdit: emptyCredentials,
  credentialTypes: [{
    value: 0,
    name: "Shared credentials"
  },{
    value: 1,
    name: "Static credentials"
  },{
    value: 2,
    name: "File credentials"
  }],
  selectedCredentials: {},
  credentialsHeaders: [{
      text: 'Name',
      value: 'name',
  }]
}

const mutations = {
  updateCreateDialog(state, value){
    state.createDialog = value
  },
  updateCredentialsEdit(state, value){
    if (value.staticCredentials){
      var key = Object.keys(value.staticCredentials)[0]
      state.credentialsEdit.staticCredentials[key] = value.staticCredentials[key]
    } else {
      state.credentialsEdit = {
        ...state.credentialsEdit, ...value
      }
    }
  },
  updateSelectedCredentialFields(state, value){
    if (value.staticCredentials){
      var key = Object.keys(value.staticCredentials)[0]
      state.selectedCredentials.staticCredentials[key] = value.staticCredentials[key]
    } else {
      state.selectedCredentials = {
        ...state.selectedCredentials, ...value
      }
    }
  },
  resetCredentialsEdit(state){
    state.credentialsEdit = emptyCredentials
  },
  updateDeleteDialog(state, value){
    state.deleteDialog = value
  },
  updateEditDialog(state, value){
    state.editDialog = value
  },
  resetSelectedCredential(state){
    state.selectedCredentials = {name: ""}
  },
  resetSelection(state){
    state.selectedItems = []
  },
  updateSelected(state, value){
    state.selectedItems = value
  },
  setSelection(state, value){
    state.showActions = true
    state.selectedCredentials = value
    state.selectedItems = [value]
  }
}

const actions = {
  createCredentials({commit, dispatch, state}){
    if (!state.credentialsEdit.name){
      dispatch('core/dispatchMessage', {color: 'error', message: 'name is required'}, {root:true})
      return
    }
    dispatch('core/createCredentials', state.credentialsEdit, {root:true})
    commit('resetCredentialsEdit')
    commit('updateCreateDialog', false)
  },
  deleteCredentials({commit, dispatch, state}){
    if (state.selectedCredentials.name === "default"){
      dispatch('core/dispatchMessage', {color: 'error', message: "can't delete default credentials"}, {root:true})
      commit('updateDeleteDialog', false)
      return;
    }
    dispatch('core/deleteCredentials', state.selectedCredentials, {root:true})
    commit('resetSelectedCredential')
    commit('resetSelection')
    commit('updateDeleteDialog', false)
  },
  saveCredentials({commit, dispatch, state}){
    dispatch('core/credentialsChanged', state.selectedCredentials, {root:true})
    commit('updateEditDialog', false)
  },
  onClickRow({commit}, event){
    commit('setSelection', event)
  },
  onItemSelected({commit}, event){
    if (event.value) {
      commit('setSelection', event.item)
    } else {
      commit('updateSelected', [event.item])
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}