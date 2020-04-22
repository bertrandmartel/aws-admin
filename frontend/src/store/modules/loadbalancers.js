import elbv2 from '../../api/elbv2'

const state = {
  search: '',
  headers: [{
    text: 'LoadBalancerName',
    align: 'start',
    value: 'LoadBalancerName',
    filterable: true
  },
  {
    text: 'LoadBalancerArn',
    value: 'LoadBalancerArn',
    filterable: true
  },
  {
    text: 'DNSName',
    value: 'DNSName',
    filterable: false
  },
  {
    text: 'Scheme',
    value: 'Scheme',
    filterable: false
  },
  {
    text: 'VpcId',
    value: 'VpcId',
    filterable: false
  },
  {
    text: 'Type',
    value: 'Type',
    filterable: false
  },{
    text: 'CanonicalHostedZoneId',
    value:  'CanonicalHostedZoneId',
    filterable: false
  },
  {
    text: 'Subnets',
    value: 'Subnets',
    filterable: false
  }],
  lb: []
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateLoadBalancers(state, value){
    state.lb = value
  }
}

const actions = {
  initLoadBalancers({state, commit, rootState}){
    elbv2.getLoadBalancers({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.LoadBalancers){
        response.data.LoadBalancers.map(it => {
          it.AZ = it.AvailabilityZones.map(it => it.ZoneName).join(",")
          it.Subnets = it.AvailabilityZones.map(it => it.SubnetId).join(",")
          return it
        })
        commit('updateLoadBalancers', response.data.LoadBalancers)
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