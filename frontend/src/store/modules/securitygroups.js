import ec2 from '../../api/ec2'

const state = {
  search: '',
  headers: [{
    text: 'GroupName',
    align: 'start',
    value: 'GroupName',
    filterable: true
  },
  {
    text: 'GroupId',
    value: 'GroupId',
    filterable: false
  },
  {
    text: 'Description',
    value: 'Description',
    filterable: false
  },
  {
    text: 'VpcId',
    value :'VpcId',
    filterable: false
  }],
  sg: []
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateSecurityGroups(state, value){
    state.sg = value
  }
}

const actions = {
  initSG({state, commit, rootState}){
    ec2.getSecurityGroups({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.SecurityGroups){
        commit('updateSecurityGroups', response.data.SecurityGroups)
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