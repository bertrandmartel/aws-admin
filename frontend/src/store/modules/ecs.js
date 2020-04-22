import ecs from '../../api/ecs'

const state = {
  selectedTask: {},
  selectedService: {},
  tasks: [],
  services: [],
  clusters: [],
  search: '',
  tabState: 0,
  showActions: false,
  forceUpdateDialog: false,
  selectedClusterArr: [],
  selectedServiceArr: [],
  selectedTaskArr: [],
  selectedCluster: {},
  clusterHeaders: [{
    text: 'Cluster Name',
    align: 'start',
    value: 'ClusterName',
    filterable: true
  }],
  serviceHeaders: [{
    text: 'ServiceName',
    value: 'ServiceName',
  },{
    text: 'ServiceArn',
    value:'ServiceArn',
    align: 'start'
  },{
    text: 'Status',
    value:'Status'
  },
  {
    text: 'LaunchType',
    value: 'LaunchType'
  },
  {
    text: 'DesiredCount',
    value: 'DesiredCount'
  },
  {
    text: 'TaskDefinition',
    value: 'TaskDefinition'
  },
  {
    text: 'CreatedAt',
    value: 'CreatedAt'
  }],
  eventHeaders: [{
    text: 'CreatedAt',
    value: 'CreatedAt'
  },{
    text: 'Message',
    value: 'Message'
  },{
    text: 'Id',
    value: 'Id'
  }],
  taskHeaders: [{
    text:'CreatedAt',
    value: 'CreatedAt'
  },{
    text: 'TaskArn',
    value: 'TaskArn'
  },{
    text: 'Connectivity',
    value: 'Connectivity'
  }, {
    text: 'Container Number',
    value: 'Containers.length'
  }],
  containerHeaders: [{
    text: 'Name',
    value: 'Name'
  },{
    text:'Image',
    value: 'Image'
  },{
    text:'LastStatus',
    value:'LastStatus'
  },{
    text:'ContainerArn',
    value: 'ContainerArn'
  },{
    text:'ContainerPort',
    value:'NetworkBindings[0].ContainerPort'
  },{
    text:'HostPort',
    value:'NetworkBindings[0].HostPort'
  }],
}

const mutations = {
  updateSelectedClusterArr(state, value){
    state.selectedClusterArr = value
  },
  updateSelectedServiceArr(state, value){
    state.selectedServiceArr = value
  },
  updateSelectedTaskArr(state, value){
    state.selectedTaskArr = value
  },
  updateSearch(state, value){
    state.search = value
  },
  updateTabState(state, value){
    state.tabState = value
  },
  setClusterSelection(state, value){
    state.selectedCluster = value;
    state.selectedClusterArr = [value];
  },
  updateClusters(state, value){
    state.clusters = value
  },
  updateServices(state, value){
    state.services = value
  },
  updateTasks(state, value){
    state.tasks = value
  },
  setServiceSelection(state, value){
    state.showActions = true
    state.selectedService = value
    state.selectedServiceArr = [value]
  },
  setTaskSelection(state, value){
    state.selectedTask = value
    state.selectedTaskArr = [value]
  },
  updateForceUpdateDialog(state, value){
    state.forceUpdateDialog = value
  }
}

const actions = {
  onClusterClickRow({commit, dispatch}, event){
    commit('setClusterSelection', event)
    dispatch('initCluster')
  },
  onClusterItemSelected({commit, dispatch}, event){
    if (event.value) {
      commit('setClusterSelection', event.item)
      dispatch('initCluster')
    } else {
      commit('updateSelectedClusterArr', [event.item])
    }
  },
  onServiceClickRow({commit}, event){
    commit('setServiceSelection', event)
  },
  onServiceItemSelected({commit}, event){
    if (event.value) {
      commit('setServiceSelection', event.item)
    } else {
      commit('updateSelectedServiceArr', [event.item])
    }
  },
  onTaskClickRow({commit}, event){
    commit('setTaskSelection', event)
  },
  onTaskItemSelected({commit}, event){
    if (event.value) {
      commit('setTaskSelection', event.item)
    } else {
      commit('updateSelectedTaskArr', [event.item])
    }
  },
  getClusters({commit, state, dispatch, rootState}, noFirstSelect){
    ecs.getClusters({
      serverPath: rootState.core.serverPath,
    },
    (response) => {
      if (response.data.Clusters){
        commit('updateClusters', response.data.Clusters)
        if (!noFirstSelect && state.clusters.length > 0){
          commit('setClusterSelection', state.clusters[0])
          dispatch('initCluster')
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  initCluster({state, rootState, commit}){
    ecs.getServices({
      serverPath: rootState.core.serverPath,
      name: state.selectedCluster.ClusterName
    },
    (response) => {
      if (response.data.Services){
        commit('updateServices', response.data.Services)
      }
    },
    (err) => {
      console.log(err);
    })
    ecs.getTasks({
      serverPath: rootState.core.serverPath,
      name: state.selectedCluster.ClusterName
    },
    (response) => {
      if (response.data.Tasks){
        commit('updateTasks', response.data.Tasks)
      }
    },
    (err) => {
      console.log(err);
    })
  },
  refresh({dispatch}){
    dispatch('getClusters')
  },
  forceUpdate({state, rootState, commit, dispatch}){
    ecs.forceUpdate({
      serverPath: rootState.core.serverPath,
      cluster: state.selectedCluster.ClusterName,
      service: state.selectedService.ServiceName
    },
    (response) => {
      dispatch('core/dispatchMessage', {color: 'success', message: "Force update sent"}, {root:true})
      commit('updateForceUpdateDialog', false)
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