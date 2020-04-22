import route53 from '../../api/route53'

const defaultRecord = {
  name: "",
  type: "A",
  value: "",
  ttl: 300,
  alias: false,
  hostzoneID: ""
};

const state = {
  searchDomain:'',
  searchRecordSet: '',
  showActions: false,
  deleteRecordDialog: false,
  createRecordDialog: false,
  hostedzones: [],
  recordsets: [],
  selectedZone: {},
  selectedRecord: {},
  selectedHostzones: [],
  selectedRecordSets: [],
  tabState: 0,
  hostZoneHeaders: [
    {
      text: 'Domain Name',
      align: 'start',
      value: 'Name',
      filterable: true
    }
  ],
  recordSetsHeaders: [
    {
      text: 'Name',
      value: 'Name',
    },
    {
      text: 'Type',
      value: 'Type',
    },
    {
      text: 'Value',
      value: 'Value',
    },
    {
      text: 'TTL',
      value: 'TTL',
    },{
      text: 'AliasDNSName',
      value: 'AliasTarget.DNSName'
    },{
      text: 'HostedZoneId',
      value: 'AliasTarget.HostedZoneId'
    }
  ],
  recordTypes: ["A","AAAA","CAA","CNAME","MX","NAPTR","NS","PTR","SOA","SPF","SRV","TXT"],
  recordPendingCreation: defaultRecord
}

const mutations = {
  updateSearchDomain(state, value){
    state.searchDomain = value
  },
  updateSearchRecordSet(state, value){
    state.searchRecordSet = value
  },
  updateSelectedHostZones(state, value){
    state.selectedHostzones = value
  },
  updateSelectedRecordSets(state, value){
    state.selectedRecordSets = value
  },
  setHostZoneSelection(state, value){
    state.selectedZone = value;
    state.selectedHostzones = [value];
  },
  setRecordSetSelection(state, value){
    state.selectedRecord = value;
    state.selectedRecordSets = [value];
    state.showActions = true
  },
  updateHostZones(state, value){
    state.hostedzones = value
  },
  updateRecords(state, value){
    state.recordsets = value
  },
  updateDeleteRecordDialog(state, value){
    state.deleteRecordDialog = value
  },
  updateCreateRecordDialog(state, value){
    state.createRecordDialog = value
  },
  updateRecordPendingCreationField(state, value){
    state.recordPendingCreation = {
      ...state.recordPendingCreation, ...value
    }
  },
  resetCreatePendingCreation(state,value){
    state.recordPendingCreation = defaultRecord
  },
  updateTabState(state, value){
    state.tabState = value
  }
}

const actions = {
  onClickHostZoneRow({dispatch}, event){
    dispatch('initTab', event)
  },
  onHostZoneSelected({commit, dispatch}, event){
    if (event.value) {
      dispatch('initTab', event.item)
    } else {
      commit('updateSelectedHostZones', [event.item])
    }
  },
  onClickRecordSetRow({commit}, event){
    commit('setRecordSetSelection', event)
  },
  onRecordSetSelected({commit}, event){
    if (event.value) {
      commit('setRecordSetSelection', event.item)
    } else {
      commit('updateSelectedRecordSets', [event.item])
    }
  },
  initTab({commit, dispatch}, zone){
    commit('setHostZoneSelection', zone)
    dispatch('initRecords')
  },
  initRoute53({commit, state, dispatch, rootState}, noFirstSelect){
    route53.getHostZones({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.HostedZones){
        commit('updateHostZones', response.data.HostedZones)
      }
      if (!noFirstSelect && state.hostedzones.length > 0){
        commit('setHostZoneSelection', state.hostedzones[0])
        dispatch('initRecords')
      }
    },
    (err) => {
      console.log(err);
    })
  },
  initRecords({commit, state, dispatch, rootState}, noFirstSelect){
    route53.getRecordSets({
      serverPath: rootState.core.serverPath,
      zone: state.selectedZone.Id
    },
    (response) => {
      if (response.data.ResourceRecordSets){
        response.data.ResourceRecordSets.map((it,index) =>  {
          if (it.ResourceRecords){
            it.Value = it.ResourceRecords.map(e => e.Value).join(",");
          }
          it.RecordID = index;
          return it;
        });
        commit('updateRecords', response.data.ResourceRecordSets)
        if (!noFirstSelect){
          commit('setRecordSetSelection', state.recordsets[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  deleteRecord({commit, state, rootState, dispatch}){
    route53.deleteRecordSet({
      serverPath: rootState.core.serverPath,
      zone: state.selectedZone.Id,
      name: state.selectedRecord.Name,
      type: state.selectedRecord.Type,
      value: state.selectedRecord.Value || state.selectedRecord.AliasTarget.DNSName,
      ttl: state.selectedRecord.TTL || 0,
      alias: state.selectedRecord.AliasTarget ? state.selectedRecord.AliasTarget.DNSName != "" : false,
      hostzoneID: state.selectedRecord.AliasTarget ? state.selectedRecord.AliasTarget.HostedZoneId : ""
    },
    (response) => {
      commit('updateDeleteRecordDialog', false)
      setTimeout(() => {
        dispatch('refreshRecords')
      },2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  createRecord({state, rootState, commit, dispatch}){
    if (!state.recordPendingCreation.name){
      return dispatch('core/dispatchMessage', {color: 'error', message: "name is required"}, {root:true})
    }
    if(!state.recordPendingCreation.type){
      return dispatch('core/dispatchMessage', {color: 'error', message: "type is required"}, {root:true})
    }
    if(!state.recordPendingCreation.value){
      return dispatch('core/dispatchMessage', {color: 'error', message: "value is required"}, {root:true})
    }
    route53.createRecordSet({
      serverPath: rootState.core.serverPath,
      zone: state.selectedZone.Id,
      name: state.recordPendingCreation.name,
      type: state.recordPendingCreation.type,
      value: state.recordPendingCreation.value,
      ttl: state.recordPendingCreation.ttl,
      alias: state.recordPendingCreation.alias,
      hostzoneID: state.recordPendingCreation.hostzoneID
    },
    (response) => {
      commit('updateCreateRecordDialog', false)
      commit('resetCreatePendingCreation')
      setTimeout(() => {
        dispatch('refreshRecords')
      },2000)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  refreshRecords({dispatch}){
    dispatch('initRecords', state.selectedZone)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}