import cloudwatchlogs from '../../api/cloudwatchlogs'

const state = {
  search: '',
  selectedItems: [],
  tabState: 0,
  logGroups: [],
  logStreams: [],
  logEvents: [],
  selectedLogGroup: {},
  showActions: false,
  startDateStr: null,
  dateMenu: false,
  startTimeStr: null,
  timeMenu: false,
  scrollState: "",
  pendingLogEvents: false,
  skipNextScrollDown: false,
  startDate: null,
  selectedLogStream: '',
  backwardToken: '',
  forwardToken: '',
  logGroupHeaders: [{
    text: 'LogGroupName',
    value: 'LogGroupName',
    filterable: true
  }],
  logEventsHeaders: [{
    text: 'Timestamp',
    value: 'Timestamp'
  },{
    text: 'Message',
    value: 'Message',
    sortable: false
  }],
}

const mutations = {
  updateSearch(state, value){
    state.search = value
  },
  updateTabState(state, value){
    state.tabState = value
  },
  updateSelected(state, value){
    state.selectedItems = value
  },
  setLogGroupSelection(state, value){
    state.showActions = true
    state.selectedLogGroup = value
    state.selectedItems = [value]
  },
  updateDateMenu(state, value){
    state.dateMenu = value
  },
  updateStartDateStr(state, value){
    state.startDateStr = value
  },
  setStartDateFromStr(state, value){
    const [year, month, day] = state.startDateStr.split('-')
    const [hour, minutes] = state.startTimeStr.split(':')
    state.startDate = new Date(year, month-1, day, hour, minutes, 0).getTime();
  },
  updateScrollState(state,value){
    state.scrollState = value
  },
  updatePendingLogEvent(state, value){
    state.pendingLogEvents = value
  },
  updateSkipNextScrollDown(state, value){
    state.skipNextScrollDown = value
  },
  updateLogEvents(state, value){
    state.logEvents = value
  },
  updateBackwardToken(state, value){
    state.backwardToken = value
  },
  updateForwardToken(state, value){
    state.forwardToken = value
  },
  setLogScrollBottom(state, value){
    var logs = document.getElementById('logs')
    var scrollHeight = logs.scrollHeight;
    var offsetHeight = logs.offsetHeight;
    var contentHeight = scrollHeight - offsetHeight;
    state.skipNextScrollDown = true;
    logs.scrollTop = contentHeight;
  },
  updateTimeMenu(state, value){
    state.timeMenu = value
  },
  updateStartTimeStr(state, value){
    state.startTimeStr = value
  },
  updateSelectedLogStream(state, value){
    state.selectedLogStream = value
  },
  updateLogStreams(state, value){
    state.logStreams = value
  },
  updateStartDate(state, value){
    state.startDate = value
  },
  initDateTimeStr(state){
    var d = new Date(state.startDate),
    month = ("0" + (d.getMonth() + 1)).slice(-2),
    day = ("0" + d.getDate()).slice(-2),
    year = d.getFullYear(),
    hour = ("0" + d.getHours()).slice(-2),
    minutes = ("0" + d.getMinutes()).slice(-2);
    state.startDateStr = `${year}-${month}-${day}`;
    state.startTimeStr = `${hour}:${minutes}`; 
  },
  updateLogGroups(state, value){
    state.logGroups = value
  }
}

const getters = {
  initLogDate: (state) => (tail) => {
    var logStream = state.logStreams.filter(it => it.LogStreamName === state.selectedLogStream)[0]
    if (logStream.LastEventTimestamp){
      var date = new Date(logStream.LastEventTimestamp);
      if (tail){
          date.setMinutes(date.getMinutes() - 1);
      } else {
          date.setHours(date.getHours() - 1);
      }
      return date;
    }
    return null
  },
  getDateFormatted: (state) => {
    if (!state.startDateStr) return null
    const [year, month, day] = state.startDateStr.split('-')
    return `${day}/${month}/${year}`
  },
  formatDate: (state) => (date) => {
    var d = new Date(date),
    month = ("0" + (d.getMonth() + 1)).slice(-2),
    day = ("0" + d.getDate()).slice(-2),
    year = d.getFullYear(),
    hour = ("0" + d.getHours()).slice(-2),
    minutes = ("0" + d.getMinutes()).slice(-2),
    seconds = ("0" + d.getSeconds()).slice(-2);
    return [day, month, year].join('/') + " " + [hour,minutes,seconds].join(':');
  },
  formatBytes: (state) => (bytes) => {
      return (bytes/1000) + " ko"
  },
}

const actions = {
  onClickRow({dispatch}, event){
    dispatch('initItem', event)
  },
  onItemSelected({commit, dispatch}, event){
    if (event.value) {
      dispatch('initItem', event.item)
    } else {
      commit('updateSelected', [event.item])
    }
  },
  onStartDateChange({state, commit, dispatch}){
    console.log("start date change : " + state.startDateStr)
    commit('setStartDateFromStr')
    dispatch('getLogEvents')
  },
  onStartTimeChange({state, commit, dispatch}){
    console.log("start time change : " + state.startTimeStr)
    commit('setStartDateFromStr')
    dispatch('getLogEvents')
  },
  getLogEvents({commit, state, rootState}){
    commit('updateScrollState', 'END')
    commit('updatePendingLogEvent', false)
    commit('updateSkipNextScrollDown', false)
    cloudwatchlogs.getLogEvents({
      serverPath: rootState.core.serverPath,
      name: state.selectedLogGroup.LogGroupName,
      stream: state.selectedLogStream,
      startTime: state.startDate
    },
    (response) => {
      if (response.data.Events){
        for (var i = 0; i < response.data.Events.length;i++){
            response.data.Events[i].Id = "events-" + response.data.Events[i].Timestamp + "-" + i;
        }
        commit('updateLogEvents', response.data.Events)
        commit('updateBackwardToken', response.data.NextBackwardToken)
        commit('updateForwardToken', response.data.NextForwardToken)
        setTimeout(() => {
          commit('setLogScrollBottom')
        },200);
      }
    },
    (err) => {
      console.log(err);
    })
  },
  goToLogEnd({commit, state, dispatch, rootState}){
    cloudwatchlogs.getLogStreams({
      serverPath: rootState.core.serverPath,
      name: state.selectedLogGroup.LogGroupName
    },
    (response) => {
      if (response.data.LogStreams){
        var logStreams = response.data.LogStreams.sort(function(a,b){
            return new Date(b.CreationTime) - new Date(a.CreationTime);
        });
        commit('updateLogStreams', logStreams)
        dispatch('initLogStreamDate', true)
        dispatch('getLogEvents')
      }
    },
    (err) => {
      console.log(err);
    })
  },
  initLogStreamDate({state, commit, getters}, tail){
    var startDate = getters.initLogDate(tail);
    if (!startDate) {
        return;
    }
    commit('updateStartDate', startDate.getTime())
    commit('initDateTimeStr')
  },
  logStreamChanged({state, commit, dispatch}, stream){
    commit('updateSelectedLogStream', stream)
    dispatch('initLogStreamDate')
    dispatch('getLogEvents')
  },
  initLogGroups({state, rootState, commit, dispatch}, noselect){
    cloudwatchlogs.getLogGroups({
      serverPath: rootState.core.serverPath,
    },
    (response) => {
      if (response.data.LogGroups){
        var logGroups = response.data.LogGroups.sort(function(a,b){
            return new Date(b.CreationTime) - new Date(a.CreationTime);
        });
        commit('updateLogGroups', logGroups)
        if (!noselect && state.logGroups.length > 0){
          dispatch('initItem', state.logGroups[0])
        }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  refresh({dispatch}){
    dispatch('initLogGroups', true)
  },
  initItem({commit, dispatch}, item){
    commit('setLogGroupSelection', item)
    dispatch('refreshLogGroup')
  },
  refreshLogGroup({dispatch}){
    dispatch('getLogStreams')
  },
  getLogStreams({state, rootState, commit, dispatch}){
    cloudwatchlogs.getLogStreams({
      serverPath: rootState.core.serverPath,
      name: state.selectedLogGroup.LogGroupName
    },
    (response) => {
      if (response.data.LogStreams){
          var logStreams = response.data.LogStreams.sort(function(a,b){
              return new Date(b.CreationTime) - new Date(a.CreationTime);
          });
          commit('updateLogStreams', logStreams)
          if (state.logStreams.length > 0){
            dispatch('initStream', state.logStreams[0])
          } else {
            commit('updateSelectedLogStream', '')
          }
      }
    },
    (err) => {
      console.log(err);
    })
  },
  initStream({commit, dispatch}, stream){
    commit('updateSelectedLogStream', stream.LogStreamName)
    dispatch('initLogStreamDate')
    dispatch('getLogEvents')
  },
  initEventListeners({state, commit, dispatch}){
    var logs = document.getElementById('logs');
    logs.addEventListener('scroll', () => {
      var scrollTop = logs.scrollTop;
      var scrollHeight = logs.scrollHeight;
      var offsetHeight = logs.offsetHeight;
      var contentHeight = scrollHeight - offsetHeight;
      //console.log(contentHeight, scrollTop)
      if (contentHeight <= scrollTop) {
        commit('updateScrollState', 'END')
        if (!state.skipNextScrollDown) {
          console.log("DETECT END");
          dispatch('getNextLogEvents', 'forward')
        } else {
          //console.log("this one is skipped");
          commit('updateSkipNextScrollDown', false)
        }
      } else if (scrollTop === 0){
        console.log("DETECT START");
        commit('updateScrollState', 'START')
        dispatch('getNextLogEvents', 'backward')
      } else if (state.scrollState) {
        commit('updateScrollState', '')
      }
    }, false)
    logs.addEventListener('wheel', (event) => {
      //console.log(event, this.scrollStat, this.pendingLogEvents);
      if (event.deltaY < 0 && state.scrollState === "START" && !state.pendingLogEvents) {
        console.log("wheel up while state is START");
        commit('updatePendingLogEvent', true)
        dispatch('getNextLogEvents', 'backward')
      } else if (event.deltaY > 0 && state.scrollState === "END" && !state.pendingLogEvents) {
        console.log("wheel down while state is END");
        commit('updatePendingLogEvent', true)
        commit('updateScrollState', '')
        dispatch('getNextLogEvents', 'forward')
      }
    }, false)
  },
  getNextLogEvents({commit, state, rootState}, order){
    cloudwatchlogs.getLogEvents({
      serverPath: rootState.core.serverPath,
      name: state.selectedLogGroup.LogGroupName,
      stream: state.selectedLogStream,
      startTime: order === "forward" ? state.startDate : null,
      nextToken: encodeURIComponent(order === "backward" ? state.backwardToken : state.forwardToken),
    },
    (response) => {
      if (response.data.Events){
        for (var i = 0; i < response.data.Events.length;i++){
            response.data.Events[i].Id = "events-" + response.data.Events[i].Timestamp + "-" + i;
        }
        if (order === "backward"){
          commit('updateLogEvents', response.data.Events.concat(state.logEvents))
        } else {
          commit('updateLogEvents', state.logEvents.concat(response.data.Events))
        }
      }
      if (order === "backward"){
        commit('updateBackwardToken', response.data.NextBackwardToken)
      } else {
        commit('updateForwardToken', response.data.NextForwardToken)
      }
      commit('updatePendingLogEvent', false)
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
  mutations,
  actions
}