import lambda from '../../api/lambda'

const state = {
  search: '',
  selectedItems: [],
  headers: [{
    text: 'FunctionName',
    value: 'FunctionName',
    filterable: true
  }],
  functionData: {},
  functions: [],
  selectedLambda: {},
  tabState: 0
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateSelected(state, value){
    state.selectedItems = value
  },
  updateFunctionData(state, value){
    state.functionData = value
  },
  updateFunctions(state, value){
    state.functions = value
  },
  updateSelectedLambda(state, value){
    state.selectedLambda = value
  },
  updateTabState(state, value){
    state.tabState = value
  }
}

const actions = {
  onClickRow({dispatch}, event){
    dispatch('initLambdaData', event)
  },
  onItemSelected({commit, dispatch}, event){
    if (event.value) {
      dispatch('initLambdaData', event.item)
    } else {
      commit('updateSelected', [event.item])
    }
  },
  initLambdaList({commit, state, dispatch, rootState}, noSelectFirst){
    lambda.getLambdaList({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.Functions){
        commit('updateFunctions', response.data.Functions)
        if (!noSelectFirst && state.functions.length > 0){
          dispatch('initLambdaData', state.functions[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  initLambdaData({state, dispatch, commit}, item){
    commit('updateSelectedLambda', item)
    commit('updateSelected', [item])
    dispatch('getFunction')
  },
  getFunction({state, rootState, commit}){
    lambda.getFunction({
      serverPath: rootState.core.serverPath,
      name: state.selectedLambda.FunctionName
    },
    (response) => {
      if (response.data.Configuration){
        commit('updateFunctionData', response.data)
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
  actions,
  mutations
}