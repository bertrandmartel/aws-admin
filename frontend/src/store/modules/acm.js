import acm from '../../api/acm'

const defaultCreatedCert = {
  certificate: null,
  privateKey: null,
  fullChain: null,
  name: ''
};

const state = {
  search: '',
  importDialog: false,
  deleteDialog: false,
  showActions: false,
  headers: [{
    text: 'Domain Name',
    align: 'start',
    value: 'DomainName',
    filterable: true
  },
  {
    text: 'ARN',
    value: 'CertificateArn',
    filterable: true
  }],
  certificates: [],
  selectedItems:[],
  selectedCertificate: {},
  createdCert: defaultCreatedCert
}

const mutations = {
  udpateSearch(state, value){
    state.search = value
  },
  updateSelected(state, value){
    state.selectedItems = value
  },
  setSelection(state, value){
    state.showActions = true
    state.selectedCertificate = value
    state.selectedItems = [value]
  },
  updateDeleteDialog(state, value){
    state.deleteDialog = value
  },
  updateCreatedCertField(state, value){
    state.createdCert = {
      ...state.createdCert, ...value
    }
  },
  updateImportDialog(state, value){
    state.importDialog = value
  },
  resetCreatedCert(state){
    state.createdCert = defaultCreatedCert
  },
  updateCertificates(state, value){
    state.certificates = value
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
  initACM({state, rootState, commit}, noFirstSelect){
    acm.getCertificates({
      serverPath: rootState.core.serverPath,
    },
    (response) => {
      if (response.data.CertificateSummaryList){
        commit('updateCertificates', response.data.CertificateSummaryList)
        if (!noFirstSelect && response.data.CertificateSummaryList.length > 0){
          commit('setSelection', response.data.CertificateSummaryList[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  refresh({dispatch}){
    dispatch('initACM', true)
  },
  deleteCert({state, rootState, commit, dispatch}){
    acm.deleteCertificate({
      serverPath: rootState.core.serverPath,
      arn: state.selectedCertificate.CertificateArn
    },
    (response) => {
      commit('updateDeleteDialog', false)
      setTimeout(() => {
        dispatch('refresh')
      },2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  importCerts({state, rootState, commit, dispatch}){
    if (!state.createdCert.certificate){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Certificate file is required"}, {root:true})
    }
    if(!state.createdCert.privateKey){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Private Key file is required"}, {root:true})
    }
    if(!state.createdCert.fullChain){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Full Chain file is required"}, {root:true})
    }
    const formData = new FormData();
    formData.append('certificate', state.createdCert.certificate);
    formData.append('key', state.createdCert.privateKey);
    formData.append('fullchain', state.createdCert.fullChain);
    formData.append('name', state.createdCert.name);

    acm.importCertificate({
      serverPath: rootState.core.serverPath,
      formData: formData
    },
    (response) => {
      commit('updateImportDialog', false)
      commit('resetCreatedCert')
      setTimeout(() => {
        dispatch('refresh')
      },2000)
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