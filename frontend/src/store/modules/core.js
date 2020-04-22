import Vuetify from '../../plugins/vuetify'
import configuration from '../../api/configuration'
import sessionReset from '../../api/sessionReset'

const menuItems = [
  {text:"CloudFormation", value:"CloudFormation",image:"code-json", query:"cloudformation"},
  {text:"System Manager",value: "SSM",image:"console", query: "ssm"},
  {text:"EC2", value:"EC2", image:"server", query:"ec2"},
  {text:"Lambda", value:"Lambda", image: "memory", query:"lambda"},
  {text:"S3", value:"S3", image: "database", query:"s3"},
  {text:"VPCs", value: "VPC", image:"lan", query:"vpc"},
  {text:"Subnets", value: "Subnets", image:"lan", query:"subnets"},
  {text:"Load Balancers", value:"LoadBalancers", image:"lan", query:"loadbalancer"},
  {text: "Target Groups", value: "TargetGroups", image:"server-network", query:"targetgroup"},
  {text:"Security Groups", value:"SecurityGroups",image:"security", query:"securitygroup"},
  {text:"Route 53", value:"Route53", image:"dns", query: "route53"},
  {text:"CloudWatch", value:"CloudWatch",image: "math-log", query:"cloudwatch"},
  {text:"ECR", value:"ECR",image: "docker", query:"ecr"},
  {text:"ECS", value:"ECS",image: "docker", query:"ecs"},
  {text:"Certificate Manager", value:"ACM", image:"certificate-outline", query:"acm"},
  {text:"Keypair", value:"Keypair",image: "key-variant", query:"keypair"},
  {text:"SecretsManager", value:"Secret Manager",image: "key-variant", query:"secretsmanager"},
  {text:"Credentials", value:"Credentials", image:"account",query: "credentials"}
];

const SharedCredential = 0;
const StaticCredential = 1;
const FileCredential = 2;

const defaultCredentials = {
  name: "default",
  credentialType: SharedCredential,
  sharedCredentials: {
    "profile": "default"
  },
  staticCredentials: {},
  fileCredentials: {},
};

const defaultRegion = "eu-west-3";

const state = {
  region: defaultRegion,
  theme: "dark",
  drawer: true,
  title: "AWS Admin Dashboard",
  navbarItems: menuItems,
  remainingNavItems: [],
  regionList: [
    {name: "us-east-2"},
    {name: "us-east-1"},
    {name: "us-west-1"},
    {name: "us-west-2"},
    {name: "ap-east-1"},
    {name: "ap-south-1"},
    {name: "ap-northeast-3"},
    {name: "ap-northeast-2"},
    {name: "ap-southeast-1"},
    {name: "ap-southeast-2"},
    {name: "ap-northeast-1"},
    {name: "ca-central-1"},
    {name: "cn-north-1"},
    {name: "cn-northwest-1"},
    {name: "eu-central-1"},
    {name: "eu-west-1"},
    {name: "eu-west-2"},
    {name: "eu-west-3"},
    {name: "eu-north-1"},
    {name: "me-south-1"},
    {name: "sa-east-1"},
    {name: "us-gov-east-1"},
    {name: "us-gov-west-1"}
  ],
  credentialList: [],
  settingsDialog: false,
  aboutDialog: false,
  navbarSettingsDialog: false,
  serverPath: "",
  serverPathEdit: "",
  credentials: defaultCredentials.name,
  loaded: false,
  snackbar: false,
  snackbarColor: 'error',
  snackbarMessage: ''
}

const getters = {
  remainingNavItems(state){
    var result = []
    for (var i = 0;i < menuItems.length;i++){
      if (state.navbarItems.filter(it => it.value === menuItems[i].value).length === 0){
          result.push(menuItems[i])
      }
    }
    return result;
  }
}

const mutations = {
  updateRegion(state, value){
    state.region = value
  },
  toggleDark(state){
    state.theme = Vuetify.framework.theme.dark ? "light" : "dark"
    Vuetify.framework.theme.dark = !Vuetify.framework.theme.dark
    localStorage.setItem("theme", state.theme)
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  updateSettingsDialog(state, value){
    state.settingsDialog = value
  },
  updateAboutDialog(state, value){
    state.aboutDialog = value
  },
  updateCredentials(state, value){
    state.credentials = value
  },
  updateServerPath(state, value){
    state.serverPath = value
  },
  updateTheme(state, value){
    state.theme = value
  },
  updateCredentialList(state, value){
    state.credentialList = value
  },
  updateLoaded(state, value){
    state.loaded = value
  },
  updateServerPathEdit(state, value){
    state.serverPathEdit = value
  },
  addCredential(state, value){
    state.credentialList.push(value);
  },
  updateSnackbar(state, value){
    state.snackbar = value
  },
  updateSnackbarColor(state, value){
    state.snackbarColor = value
  },
  updateSnackbarMessage(state, value){
    state.snackbarMessage = value
  },
  updateNavbarSettingsDialog(state, value){
    state.navbarSettingsDialog = value
  },
  updateRemainingNavItems(state, value){
    state.remainingNavItems = value
  },
  updateNavbarItems(state, value){
    state.navbarItems = value
    localStorage.setItem('navbarMenu', JSON.stringify(state.navbarItems))
  },
  resetNavMenu(state){
    state.navbarItems = menuItems
    state.remainingNavItems = []
    localStorage.setItem('navbarMenu', JSON.stringify(state.navbarItems))
  }
}

const actions = {
  init({ commit, state }){
    var storedRegion = localStorage.getItem("region")
    if (storedRegion){
      commit('updateRegion', storedRegion)
    } else {
      commit('updateRegion', defaultRegion)
      localStorage.setItem("region", defaultRegion)
    }

    var storedCred = localStorage.getItem('credentials')
    if (storedCred){
      commit('updateCredentials', storedCred)
    } else {
      commit('updateCredentials', defaultCredentials.name)
      localStorage.setItem('credentials', state.credentials)
    }
    commit('updateServerPath', localStorage.getItem('serverPath'))

    var navbarMenu = localStorage.getItem('navbarMenu')
    if (navbarMenu){
      commit('updateNavbarItems', JSON.parse(navbarMenu))
    } else {
      commit('updateNavbarItems', menuItems)
      localStorage.setItem('navbarMenu', JSON.stringify(state.navbarItems))
    }

    if (!state.serverPath){
      var path = `${location.protocol}//${location.hostname+(location.port ? ':' + location.port : '')}`;
      commit('updateServerPath', path)
      localStorage.setItem("serverPath", state.serverPath)
    }
    commit('updateTheme', localStorage.getItem('theme') || 'dark')
    Vuetify.framework.theme.dark = state.theme === 'dark'

    var credentialList = localStorage.getItem("credentialList")
    if (credentialList){
      commit('updateCredentialList', JSON.parse(credentialList))
    }  else {
      commit('updateCredentialList', [defaultCredentials])
      localStorage.setItem("credentialList", JSON.stringify(state.credentialList));
    }

    var currentCred = state.credentialList.filter(it => it.name === state.credentials)[0]

    configuration.setConfiguration({
      serverPath: state.serverPath,
      payload: {
        region: state.region,
        credentials: currentCred
      }
    },
    (response) => {
      if (response.data.updated){
        document.location.href = window.location.href;
      }
      commit('updateLoaded', true)
    },
    (err) => {
        console.log(err);
    })
  },
  updateRegion({commit, state}, region){
    commit('updateRegion', region)
    configuration.setConfiguration({
      serverPath: state.serverPath,
      payload: {
        region: state.region
      }
    },
    (response) => {
      localStorage.setItem('region', state.region);
      document.location.href = window.location.href 
    },
    (err) => {
      console.log(err);
    })
  },
  resetSession(){
    sessionReset.reset({
      serverPath: state.serverPath
    },
    (response) => {
      document.location.href = window.location.href
    },
    (err) => {
      console.log(err);
    })
  },
  openSettingsDialog({commit, state}){
    commit("updateServerPathEdit", state.serverPath)
    commit("updateSettingsDialog", true)
  },
  saveSettings({commit, state}){
    if (state.serverPathEdit != state.serverPath){
      commit("updateServerPath", state.serverPathEdit.replace(/\/$/, ""))
      localStorage.setItem("serverPath", state.serverPath)
      document.location.href = window.location.href
    }
    commit("updateSettingsDialog", false)
  },
  updateCredentials({state, commit}, credentials){
    commit('updateCredentials', credentials)
    var currentCred = state.credentialList.filter(it => it.name === state.credentials)[0]
    configuration.setConfiguration({
      serverPath: state.serverPath,
      payload: {
        region: state.region,
        credentials: currentCred
      }
    },
    (response) => {
      localStorage.setItem('credentials', state.credentials);
      document.location.href = window.location.href 
    },
    (err) => {
      console.log(err);
    })
  },
  credentialsChanged({commit, state, dispatch}, credentials){
    var selectedCredentials = state.credentialList.filter(it => it.name === credentials.name)
    if (selectedCredentials.length > 0){
      selectedCredentials[0] = credentials
    }
    localStorage.setItem("credentialList", JSON.stringify(state.credentialList));
    if (state.credentials === credentials.name) {
      commit('updateCredentials', credentials.name)
      dispatch('setConfigForCredentials')
    }
  },
  createCredentials({commit, state, dispatch}, credentials){
    commit("addCredential", credentials)
    localStorage.setItem("credentialList", JSON.stringify(state.credentialList));
  },
  deleteCredentials({commit, dispatch, state}, credentials){
    commit('updateCredentialList', state.credentialList.filter(it => it.name !== credentials.name))
    localStorage.setItem("credentialList", JSON.stringify(state.credentialList));
  },
  dispatchMessage({commit, state, dispatch}, data){
    commit('updateSnackbarColor', data.color)
    commit('updateSnackbarMessage', data.message)
    commit('updateSnackbar', true)
  },
  toggleNavbarSettingsDialog({commit, getters, state}, value){
    if (!value) {
      commit('updateRemainingNavItems', [])
      commit('updateNavbarSettingsDialog', false)
    } else {
      commit('updateRemainingNavItems', getters.remainingNavItems)
      commit('updateNavbarSettingsDialog', true)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}