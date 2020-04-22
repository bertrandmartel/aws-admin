import secretsmanager from '../../api/secretsmanager'

const defaultPendingSecret = {
  name: '',
  value: ''
}

const state = {
  search: '',
  selectedItems: [],
  createDialog: false,
  deleteDialog: false,
  showActions: false,
  secretValueDialog: false,
  forceDelete: false,
  secretValue: '',
  headers: [{
    text: 'Name',
    value: 'Name',
    filterable: true
  },
  {
    text: 'Description',
    value: 'Description',
    filterable: true
  },
  {
    text: 'ARN',
    value: 'ARN',
    filterable: false
  },
  {
    text: 'StackName',
    value: 'StackName',
    filterable: true
  },
  {
    text: 'Parent Name',
    value: 'ParentName',
    filterable: true
  }],
  secrets: [],
  selectedSecret: {},
  pendingSecret: defaultPendingSecret
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
    state.selectedSecret = value
    state.selectedItems = [value]
  },
  updateSecrets(state, value){
    state.secrets = value
  },
  updatePendingSecretField(state, value){
    state.pendingSecret = {
      ...state.pendingSecret, ...value
    }
  },
  resetPendingSecret(state){
    state.pendingSecret = defaultPendingSecret
  },
  updateCreateDialog(state, value){
    state.createDialog = value
  },
  updateDeleteDialog(state, value){
    state.deleteDialog = value
  },
  updateForceDelete(state, value){
    state.forceDelete = value
  },
  updateSecretValue(state, value){
    state.secretValue = value
  },
  updateSecretValueDialog(state, value){
    state.secretValueDialog = value
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
  initSecrets({commit, state, rootState}, noFirstSelect){
    secretsmanager.getSecrets({
      serverPath: rootState.core.serverPath,
    },
    (response) => {
      if (response.data.SecretList){
        response.data.SecretList.map(it => {
          if (it.Tags){
            var nameEntry = it.Tags.filter(it => it.Key === "Name");
            var stackNameEntry = it.Tags.filter(it => it.Key === "aws:cloudformation:stack-name");
            it.ParentName = (nameEntry.length > 0) ? nameEntry[0].Value : "";
            it.StackName = (stackNameEntry.length > 0) ? stackNameEntry[0].Value : "";
          }
          return it
        });
        commit('updateSecrets', response.data.SecretList)
        if (!noFirstSelect && (state.secrets.length > 0)){
          commit('setSelection', state.secrets[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  refresh({dispatch}){
    dispatch('initSecrets', true)
  },
  createSecret({state, rootState, commit, dispatch}){
    if (!state.pendingSecret.name){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Secret name is required"}, {root:true})
    }
    if (!state.pendingSecret.value){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Secret value is required"}, {root:true})
    }
    const formData = new FormData();
    formData.append('name', state.pendingSecret.name);
    formData.append('value', state.pendingSecret.value);

    secretsmanager.createSecret({
      serverPath: rootState.core.serverPath,
      formData: formData
    },
    (response) => {
      commit('updateCreateDialog', false)
      commit('resetPendingSecret')
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
  deleteSecret({state, rootState, commit, dispatch}){
    secretsmanager.deleteSecret({
      serverPath: rootState.core.serverPath,
      arn: state.selectedSecret.ARN,
      forceDelete: state.forceDelete
    },
    (response) => {
      commit('updateDeleteDialog', false)
      commit('updateForceDelete', false)
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
  getSecretValue({state, commit, dispatch, rootState}){
    secretsmanager.getSecretValue({
      serverPath: rootState.core.serverPath,
      arn: state.selectedSecret.ARN,
    },
    (response) => {
      commit('updateSecretValueDialog', true)
      commit('updateSecretValue',response.data.SecretString)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  toggleSecretValueDialog({commit, dispatch}, value){
    if (!value) {
      commit('updateSecretValue', "")
      commit('updateSecretValueDialog', false)
    } else {
      dispatch('getSecretValue')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}