<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>CloudWatch Logs</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
          <v-text-field
            v-model="search"
            autocomplete="off"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style='margin-left:25px; margin-top:0; padding-top:0;max-width:300px;'
          ></v-text-field>
          <DateMenu />
          <TimeMenu />
        </div>
        <div class="actions">
          <v-btn v-blur fab small color="primary" style='margin-right: 10px;margin-left:20px;' @click="refreshEvents">
            <v-icon>mdi-refresh</v-icon>
          </v-btn> 
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="3">
        <template>
          <v-data-table
            v-on:click:row="onClickRow"
            v-on:item-selected="onItemSelected"
            v-model="selectedItems"
            :headers="logGroupHeaders"
            :items-per-page="14"
            :items="logGroups"
            class="elevation-1"
            item-key="Arn"
            :search="search"
            :single-select="true"
            show-select
          ></v-data-table>
        </template>
      </v-col>
      <v-col cols="9">
        <template>
          <v-tabs fixed-tabs v-on:change="selectTab">
            <v-tab>Logs</v-tab>
          </v-tabs>
        </template>
        <div v-show="(tabState === 0) && (logGroups.length > 0)"><LogsTab /></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateMenu from './DateMenu'
import TimeMenu from './TimeMenu'
import LogsTab from './LogsTab'

import { mapState } from 'vuex'

export default {
  name: 'CloudWatchLogs',
  components: {
    DateMenu,
    TimeMenu,
    LogsTab
  },
  computed: {
    ...mapState({
      logGroupHeaders: state => state.cloudwatchlogs.logGroupHeaders,
      logGroups: state => state.cloudwatchlogs.logGroups,
      tabState: state => state.cloudwatchlogs.tabState,
    }),
    search: {
      get() {
        return this.$store.state.cloudwatchlogs.search
      },
      set(value) {
        this.$store.commit('cloudwatchlogs/updateSearch', value)
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.cloudwatchlogs.selectedItems
      },
      set(value) {
        this.$store.commit('cloudwatchlogs/updateSelected', value)
      }
    }
  },
  methods: {
    onClickRow(event){
      this.$store.dispatch('cloudwatchlogs/onClickRow', event)
    },
    onItemSelected(event){
      this.$store.dispatch('cloudwatchlogs/onItemSelected', event)
    },
    selectTab(tabState){
      this.$store.commit('cloudwatchlogs/updateTabState', tabState)
    },
    refresh(){
      this.$store.dispatch('cloudwatchlogs/refresh')
    },
    refreshEvents(){
      this.$store.dispatch('cloudwatchlogs/getLogEvents')
    }
  },
  created(){
    this.$store.dispatch('cloudwatchlogs/initLogGroups')
  },
  mounted(){
    this.$store.dispatch('cloudwatchlogs/initEventListeners')
  }
}
</script>

<style>
.logContainer {
    background-color: #24292e;
    border: 1px solid white;
    overflow-x: auto;
    white-space: nowrap;
    table-layout: fixed;
    width: 100%;
    border-radius: 8px;
    padding: 10px;
}
.log {
    overflow: auto;
    overflow-y: hidden;
    width:auto;
    text-overflow: clip;

}
.timestamp {
    width: 200px;

}
.logContainer tbody {
    display: block;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
}

.logRow {
    display: table;
    table-layout: fixed;
    width: 100%;
}
.v-date-picker-table table th,
td {
    width: auto;
}
.theme--light.v-application  table.logContainer {
  color: white;
}
</style>