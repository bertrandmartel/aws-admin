import cloudformation from '../../api/cloudformation'

const defaultCreatedStack = {
  name: "",
  template: null
};

const state = {
  deleteDialog: false,
  createDialog: false,
  updateDialog: false,
  protectDialog: false,
  showActions: false,
  selectedItems: [],
  selectedStack: {},
  stacks: [],
  events: [],
  template: '',
  terminationProtection: false,
  outputs: [],
  parameters: [],
  description: {},
  tabState: 0,
  stacksHeaders: [
    {
      text: 'Stack name',
      align: 'start',
      value: 'StackName',
      filterable: true
    }
  ],
  outputsHeaders: [
  {
    text: 'OutputKey',
    value: 'OutputKey'
  },{
    text: 'OutputValue',
    value:'OutputValue'
  },{
    text: 'ExportName',
    value:'ExportName'
  },
  {
    text: 'Description',
    value:'Description'
  }],
  eventsHeaders:[{
    text: 'Timestamp',
    value: 'Timestamp'
  },{
    text:'LogicalResourceId',
    value: 'LogicalResourceId'
  },
  {
    text: 'ResourceStatus',
    value: 'ResourceStatus'
  },{
    text: 'ResourceStatusReason',
    value: 'ResourceStatusReason'
  }],
  parametersHeaders: [{
    text: 'ParameterKey',
    value:'ParameterKey'
  },
  {
    text:'ParameterValue',
    value:'ParameterValue'
  }],
  search: '',
  createdStack: defaultCreatedStack,
  updateTemplateFile: null,
}

const mutations = {
  updateStacks(state, value){
    state.stacks = value
  },
  setSelection(state, value){
    state.showActions = true
    state.selectedStack = value
    state.selectedItems = [value]
  },
  updateSearch(state, value){
    state.search = value
  },
  updateEvents(state, value){
    state.events = value
  },
  updateTemplate(state, value){
    state.template = value
  },
  updateTerminationProtection(state, value){
    state.terminationProtection = value
  },
  updateOutputs(state, value){
    state.outputs = value
  },
  updateParameters(state, value){
    state.parameters = value
  },
  updateDescription(state, value){
    state.description = value
  },
  updateSelected(state, value){
    state.selectedItems = value
  },
  updateTabState(state, value){
    state.tabState = value
  },
  updateCreateDialog(state, value){
    state.createDialog = value
  },
  resetCreateStack(state){
    state.createdStack = defaultCreatedStack
  },
  updateCreatedStackTemplate(state, value){
    state.createdStack.template = value
  },
  updateCreatedStack(state, value){
    state.createdStack = {
      ...state.createdStack, ...value
    }
  },
  updateDeleteDialog(state, value){
    state.deleteDialog = value
  },
  updateProtectDialog(state, value){
    state.protectDialog = value
  },
  updateUpdateDialog(state, value){
    state.updateDialog = value
  },
  updateTemplateFileForUpdate(state, value){
    state.updateTemplateFile = value
  },
}

const actions = {
  onClickRow({dispatch}, event){
    dispatch('initStack', event)
  },
  onItemSelected({commit, dispatch}, event){
    if (event.value) {
      dispatch('initStack', event.item)
    } else {
      commit('updateSelected', [event.item])
    }
  },
  initStacks({commit, dispatch, state, rootState}){
    cloudformation.getStacks({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.StackSummaries){
        commit('updateStacks', response.data.StackSummaries)
        if (state.stacks.length > 0){
          dispatch('initStack', state.stacks[0]);
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  initStack({commit, dispatch}, stack){
    commit('setSelection', stack)
    dispatch('refreshStack')
  },
  refreshStack({dispatch}){
      dispatch('getEvents')
      dispatch('getDescription')
      dispatch('getTemplate')
  },
  getEvents({commit, state, rootState}){
    cloudformation.getEvents({
      serverPath: rootState.core.serverPath,
      name: state.selectedStack.StackName
    },
    (response) => {
      if (response.data.StackEvents){
        commit('updateEvents', response.data.StackEvents)
      }
    },
    (err) => {
      console.log(err);
    })
  },
  getTemplate({commit, state, rootState}){
    cloudformation.getTemplate({
      serverPath: rootState.core.serverPath,
      name: state.selectedStack.StackName
    },
    (response) => {
      if (response.data.TemplateBody){
        commit('updateTemplate', response.data.TemplateBody)
      }
    },
    (err) => {
      console.log(err);
    })
  },
  getDescription({commit, state, rootState}){
    cloudformation.getDescription({
      serverPath: rootState.core.serverPath,
      name: state.selectedStack.StackName
    },
    (response) => {
      if (response.data.Stacks && response.data.Stacks.length > 0){
        commit('updateTerminationProtection', response.data.Stacks[0].EnableTerminationProtection)
        commit('updateOutputs', response.data.Stacks[0].Outputs || [])
        commit('updateParameters', response.data.Stacks[0].Parameters || [])
        commit('updateDescription', response.data.Stacks[0])
      }
    },
    (err) => {
      console.log(err);
    })
  },
  refresh({commit, dispatch, state, rootState}, selectFirst){
    if (state.selectedStack.StackName){
      dispatch('initStack', state.selectedStack);
    }
    cloudformation.getStacks({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      if (response.data.StackSummaries){
        commit('updateStacks', response.data.StackSummaries)
        if (state.stacks.length > 0 && selectFirst){
          dispatch('initStack', state.stacks[0]);
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  createStack({commit, dispatch, state, rootState}){
    if (!state.createdStack.name || state.createdStack.name == ""){
      return dispatch('core/dispatchMessage', {color: 'error', message: "Stack name is missing"}, {root:true})
    }
    if (!state.createdStack.template) {
      return dispatch('core/dispatchMessage', {color: 'error', message: "File is missing"}, {root:true})
    }
    const formData = new FormData();
    formData.append('template', state.createdStack.template);
    formData.append('name', state.createdStack.name);

    cloudformation.createStack({
      serverPath: rootState.core.serverPath,
      formData: formData
    },
    (response) => {
      console.log(response.data);
      commit('updateCreateDialog', false)
      commit('resetCreateStack')
      setTimeout(() => {
        dispatch("refresh", true)
      },2000)
    },
    (err) => {
      //commit('resetCreateStack')
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  deleteStack({commit, dispatch, state, rootState}){
    cloudformation.deleteStack({
      serverPath: rootState.core.serverPath,
      name: state.selectedStack.StackName
    },
    (response) => {
      dispatch('core/dispatchMessage', {color: 'success', message: "Stack has been deleted"}, {root:true})
      setTimeout(() => {
        dispatch("refresh", true)
      },2000)
      commit('updateDeleteDialog', false)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  toggleTerminationProtection({commit, dispatch, state, rootState}){
    var status = !state.terminationProtection;
    cloudformation.updateTerminationProtection({
      serverPath: rootState.core.serverPath,
      name: state.selectedStack.StackName,
      status: status
    },
    (response) => {
      commit('updateProtectDialog', false)
      dispatch('getDescription')
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  updateStack({commit, dispatch, state, rootState}){
    if (!state.updateTemplateFile) {
      return dispatch('core/dispatchMessage', {color: 'error', message: "File is missing"}, {root:true})
    }
    const formData = new FormData();
    formData.append('template', state.updateTemplateFile);
    formData.append('name', state.selectedStack.StackName);

    cloudformation.updateStack({
      serverPath: rootState.core.serverPath,
      formData: formData
    },
    (response) => {
      dispatch('core/dispatchMessage', {color: 'success', message: "En cours de traitement..."}, {root:true})
      commit('updateUpdateDialog', false)
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