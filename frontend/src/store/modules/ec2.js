import ec2 from '../../api/ec2'

const state = {
  search: '',
  instances: [],
  showActions: false,
  selectedItems: [],
  selectedInstance: {},
  rebootDialog: false,
  startDialog: false,
  stopDialog: false,
  terminateDialog: false,
  headers: [
    {
      text: 'Name',
      align: 'start',
      value: 'Name',
      filterable: true
    },
    {
      text: 'InstanceId',
      value:'InstanceId',
      filterable: false
    },
    {
      text: 'InstanceType',
      value: 'InstanceType',
      filterable: false
    },
    {
      text: 'State',
      value: 'State',
      filterable: true
    },
    {
      text: 'PublicDnsName',
      value :'PublicDnsName',
      filterable: false
    },
    {
      text: 'PublicIpAddress',
      value: 'PublicIpAddress',
      filterable: false
    },
    {
      text: 'PrivateIpAddress',
      value: 'PrivateIpAddress',
      filterable: false
    },
    {
      text: 'StackName',
      value :'StackName',
      filterable: true
    },
    {
      text: 'VpcId',
      value: 'VpcId',
      filterable: false
    }
  ],
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
    state.selectedInstance = value
    state.selectedItems = [value]
  },
  updateInstances(state, value){
    state.instances = value
  },
  updateRebootDialog(state, value){
    state.rebootDialog = value
  },
  updateStartDialog(state, value){
    state.startDialog = value
  },
  updateStopDialog(state, value){
    state.stopDialog = value
  },
  updateTerminateDialog(state, value){
    state.terminateDialog = value
  },
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
  initInstances({commit, state, rootState}, noSelectFirst){
    ec2.getInstances({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      var instances = [];
      if (response.data.Reservations){
        for (var i = 0;i < response.data.Reservations.length;i++){
          if(response.data.Reservations[i].Instances){
            for (var j = 0; j < response.data.Reservations[i].Instances.length;j++){
              instances.push(response.data.Reservations[i].Instances[j]);
            }
          }
        }
        instances.map(it => {
          if (it.Tags){
            var nameEntry = it.Tags.filter(it => it.Key === "Name");
            var stackNameEntry = it.Tags.filter(it => it.Key === "aws:cloudformation:stack-name");
            it.Name = (nameEntry.length > 0) ? nameEntry[0].Value : "";
            it.StackName = (stackNameEntry.length > 0) ? stackNameEntry[0].Value : "";
          }
          it.State = it.State.Name;
          return it
        });
        commit('updateInstances', instances)
        if (!noSelectFirst && state.instances.length > 0){
          commit('setSelection', state.instances[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  rebootInstance({commit, state, dispatch, rootState}){
    ec2.rebootInstance({
      serverPath: rootState.core.serverPath,
      instanceId: state.selectedInstance.InstanceId
    },
    (response) => {
      dispatch('core/dispatchMessage', {color: 'success', message: `Result : ${JSON.stringify(response.data)}`}, {root:true})
      commit('updateRebootDialog', false)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  startInstance({commit, state, dispatch, rootState}){
    ec2.startInstance({
      serverPath: rootState.core.serverPath,
      instanceId: state.selectedInstance.InstanceId
    },
    (response) => {
      dispatch('core/dispatchMessage', {color: 'success', message: `Result : ${JSON.stringify(response.data)}`}, {root:true})
      commit('updateStartDialog', false)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  stopInstance({commit, state, dispatch, rootState}){
    ec2.stopInstance({
      serverPath: rootState.core.serverPath,
      instanceId: state.selectedInstance.InstanceId
    },
    (response) => {
      dispatch('core/dispatchMessage', {color: 'success', message: `Result : ${JSON.stringify(response.data)}`}, {root:true})
      commit('updateStopDialog', false)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  terminateInstance({commit, state, dispatch, rootState}){
    ec2.terminateInstance({
      serverPath: rootState.core.serverPath,
      instanceId: state.selectedInstance.InstanceId
    },
    (response) => {
      dispatch('core/dispatchMessage', {color: 'success', message: `Result : ${JSON.stringify(response.data)}`}, {root:true})
      commit('updateTerminateDialog', false)
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
  actions,
  mutations
}