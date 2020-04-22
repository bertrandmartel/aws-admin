import ssmApi from '../../api/ssm'
import { ssm } from "ssm-session"

var terminal = null;
var socket = null;

const defaultShellSettings = {
  rows: 49,
  cols: 197,
  cursorBlink: true,
  cursorStyle: "block",
  //fontFamily: "Arial",
  fontSize: 15,
  theme: {
    foreground: '#FFFFFF',
    background: '#000000',
    cursor: '#FFFFFF',
    cursorAccent: '#000000'
  }
};

const state = {
  search: '',
  showActions: false,
  selectedItems: [],
  selectedInstance: {},
  sessionDialog: false,
  settingsDialog: false,
  instances: [],
  /*
  socket: null,
  terminal: null,
  */
  cursorStyleList: ["block","underline","bar" ],
  headers: [
    {
      text: 'Name',
      align: 'start',
      value: 'Name',
      filterable: true
    },
    {
      text: 'PingStatus',
      value:'PingStatus',
      filterable: false
    },
    {
      text: 'InstanceId',
      value: 'InstanceId',
      filterable: false
    },
    {
      text: 'ComputerName',
      value: 'ComputerName',
      filterable: false
    },
    {
      text: 'IPAddress',
      value :'IPAddress',
      filterable: false
    },
    {
      text: 'LastPingDateTime',
      value: 'LastPingDateTime',
      filterable: false
    }
  ],
  termOptionsEdit: defaultShellSettings,
  termOptions: defaultShellSettings,
  fontSizeList: [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
  themeBackgroundMenu: false,
  themeForegroundMenu: false,
  themeCursorMenu: false,
  themeCursorAccentMenu: false
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
  updateSessionDialog(state, value){
    state.sessionDialog = value
  },
  updateInstances(state,value){
    state.instances = value
  },
  /*
  updateSocket(state, value){
    state.socket = value
  },
  updateTerminal(state, value){
    state.terminal = value
  },
  */
  updateSettingsDialog(state, value){
    state.settingsDialog = value
  },
  updateTermOptionsEdit(state, value){
    state.termOptionsEdit = value
  },
  updateTermOptions(state, value){
    state.termOptions = value
  },
  updateTermOptionsEditRows(state, value){
    state.termOptionsEdit.rows = value
  },
  updateTermOptionsEditCols(state, value){
    state.termOptionsEdit.cols = value
  },
  updateTermOptionsEditFontSize(state, value){
    state.termOptionsEdit.fontSize = value
  },
  updateTermOptionsField(state, value){
    if (value.theme){
      var key = Object.keys(value.theme)[0]
      state.termOptionsEdit.theme[key] = value.theme[key]
    } else {
      state.termOptionsEdit = {
        ...state.termOptionsEdit, ...value
      }
    }
  },
  updateThemeBackgroundMenu(state, value){
    state.themeBackgroundMenu = value
  },
  updateThemeForegroundMenu(state, value){
    state.themeForegroundMenu = value
  },
  updateThemeCursorMenu(state, value){
    state.themeCursorMenu = value
  },
  updateThemeCursorAccentMenu(state, value){
    state.themeCursorAccentMenu = value
  }
}

const getters = {
  getColorFieldStyle: (state) => (index) => {
    var color = state.termOptionsEdit.theme.foreground
    var colorMenu = 0
    switch (index){
      case 0:
        colorMenu = state.themeForegroundMenu;
        color = state.termOptionsEdit.theme.foreground;
        break;
      case 1:
        colorMenu = state.themeBackgroundMenu;
        color = state.termOptionsEdit.theme.background;
        break;
      case 2:
        colorMenu = state.themeCursorMenu;
        color = state.termOptionsEdit.theme.cursor;
        break;
      case 3:
        colorMenu = state.themeCursorAccentMenu;
        color = state.termOptionsEdit.theme.cursorAccent;
        break;
    }
    return {
      backgroundColor: color,
      cursor: 'pointer',
      height: '30px',
      width: '30px',
      borderRadius: colorMenu ? '50%' : '4px',
      transition: 'border-radius 200ms ease-in-out'
    }
  }
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
  initInstances({commit, state, rootState}){
    var termOptions = localStorage.getItem("termOptions")
    if (!termOptions){
      localStorage.setItem("termOptions", JSON.stringify(defaultShellSettings))
      commit('updateTermOptions', defaultShellSettings)
    } else {
      commit('updateTermOptions', JSON.parse(termOptions))
    }
    commit('updateTermOptionsEdit', JSON.parse(termOptions))

    ssmApi.getInstances({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      commit('updateInstances', response.data.InstanceInformationList)
      if (state.instances.length > 0){
        commit('setSelection', state.instances[0])
      }
    },
    (err) => {
      console.log(err);
    })
  },
  startSession({commit, state, dispatch, rootState}){
    /* eslint-disable */
    ssmApi.startSession({
      serverPath: rootState.core.serverPath,
      instanceId: state.selectedInstance.InstanceId
    },
    (response) => {
      commit('updateSessionDialog', true)
      var resp = response.data;

      socket = new WebSocket(resp.StreamUrl);
      socket.binaryType = "arraybuffer";
      setTimeout(() => {
        dispatch('initTerminal')
      },500)
      
      socket.addEventListener('open', (event) => {
        ssm.init(socket, {
          token: resp.TokenValue,
          termOptions: state.termOptions
        });
      });
      socket.addEventListener('close', (event) => {
        console.log("websocket closed");
      });
      socket.addEventListener('message', (event) => {
        var agentMessage = ssm.decode(event.data);
        //console.log(agentMessage);
        if (agentMessage.payloadType === 1){
          ssm.sendACK(socket, agentMessage);
          terminal.write(agentMessage.payload)
        } 
      });
      //commit('updateSocket', socket)
    },
    (err) => {
      console.log(err);
      if (err.response) {
        return dispatch('core/dispatchMessage', {color: 'error', message: `${err.response.status} : ${JSON.stringify(err.response.data)}`}, {root:true})
      }
    })
  },
  initTerminal({commit, state, rootState}){
    terminal = new Terminal(state.termOptions);
    terminal.open(document.getElementById('terminal'));
    terminal.onKey(e => {
      ssm.sendText(socket, e.key);
    });
    terminal.on('paste', function(data) {
      ssm.sendText(socket, data);
    });
    //commit('updateTerminal', terminal)
  },
  closeSession({state, commit}){
    if (socket){
      socket.close();
    }
    if (terminal){
      terminal.dispose();
    }
    commit('updateSessionDialog', false)
  },
  closeSettings({commit}){
    commit('updateTermOptionsEdit', JSON.parse(JSON.stringify(state.termOptions)))
    commit('updateSettingsDialog', false)
  },
  saveSettings({commit, dispatch, state}){
    commit('updateTermOptionsEditRows', parseInt(state.termOptionsEdit.rows))
    commit('updateTermOptionsEditCols', parseInt(state.termOptionsEdit.cols))
    commit('updateTermOptionsEditFontSize', parseInt(state.termOptionsEdit.fontSize))

    commit('updateTermOptions', state.termOptionsEdit)
    localStorage.setItem("termOptions", JSON.stringify(state.termOptions))
    if (terminal){
      if (socket){
        socket.close();
      }
      terminal.dispose()
      dispatch('startSession')
    }
    commit('updateSettingsDialog', false)
  },
  refresh({rootState, commit}){
    ssmApi.getInstances({
      serverPath: rootState.core.serverPath
    },
    (response) => {
      commit('updateInstances', response.data.InstanceInformationList)
    },
    (err) => {
      console.log(err);
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}