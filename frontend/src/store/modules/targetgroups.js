import elbv2 from '../../api/elbv2'

const state = {
  search: '',
  headers: [{
    text: 'TargetGroupName',
    align: 'start',
    value: 'TargetGroupName',
    filterable: true
  },
  {
    text: 'TargetGroupArn',
    value: 'TargetGroupArn',
    filterable: true
  },
  {
    text: 'TargetType',
    value: 'TargetType',
    filterable: false
  },
  {
    text: 'Protocol',
    value: 'Protocol',
    filterable: false
  },
  {
    text: 'Port',
    value: 'Port',
    filterable: false
  },
  {
    text: 'Matcher',
    value: 'Matcher',
    filterable: false
  },
  {
    text: 'HealthCheckProtocol',
    value: 'HealthCheckProtocol',
    filterable: false
  },
  {
    text: 'HealthCheckPath',
    value:'HealthCheckPath',
    filterable: false
  },
  {
    text: 'VpcId',
    value: 'VpcId',
    filterable: false
  }],
  tg: []
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateTargetGroups(state, value){
    state.tg = value
  }
}

const actions = {
  initTargetGroups({state, commit, rootState}){
    elbv2.getTargetGroups({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.TargetGroups){
        response.data.TargetGroups.map(it => {
          if (it.Matcher){
            it.Matcher = it.Matcher.HttpCode
          }
          return it
        })
        commit('updateTargetGroups', response.data.TargetGroups)
      }
    },
    (err) => {
      console.log(err);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}