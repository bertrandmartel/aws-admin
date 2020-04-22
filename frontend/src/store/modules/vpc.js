import ec2 from '../../api/ec2'

const state = {
  search: '',
  headers: [{
    text: 'Name',
    align: 'start',
    value: 'Name',
    filterable: true
  },
  {
    text: 'VPC ID',
    value: 'VpcId',
    filterable: false
  },
  {
    text: 'CidrBlock',
    value: 'CidrBlock',
    filterable: false
  },
  {
    text: 'Stack Name',
    value: 'StackName',
    filterable: false
  }],
  vpc: []
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateVPC(state, value){
    state.vpc = value
  }
}

const actions = {
  initVPC({state, commit, rootState}){
    ec2.getVPC({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.Vpcs){
        response.data.Vpcs.map(it => {
          if (it.Tags){
            var nameEntry = it.Tags.filter(it => it.Key === "Name");
            var stackNameEntry = it.Tags.filter(it => it.Key === "aws:cloudformation:stack-name");
            it.Name = (nameEntry.length > 0) ? nameEntry[0].Value : "";
            it.StackName = (stackNameEntry.length > 0) ? stackNameEntry[0].Value : "";
          }
          return it
        });
        commit('updateVPC', response.data.Vpcs)
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