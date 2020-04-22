<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>System Manager</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style='margin-left:25px; margin-top:0; padding-top:0;min-width:350px;'
          ></v-text-field>
        </div>
        <div class="actions" v-show="showActions">
          <v-btn class="action-btn start-session-btn" color="primary" small v-on:click="startSession">Start Session</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <template>
          <v-data-table
            v-on:click:row="onClickRow"
            v-on:item-selected="onItemSelected"
            v-model="selectedItems"
            :headers="headers"
            :items-per-page="14"
            :items="instances"
            class="elevation-1"
            item-key="InstanceId"
            :single-select="true"
            show-select
            :search="search"
          ></v-data-table>
        </template>
      </v-col>
    </v-row>
    <SessionDialog />
    <SettingsDialog />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import SessionDialog from './SessionDialog'
import SettingsDialog from './SettingsDialog'

export default {
  name: 'SSM',
  components: {
    SessionDialog,
    SettingsDialog
  },
  created () {
    this.$store.dispatch('ssm/initInstances')
  },
  computed: {
    ...mapState({
      instances: state => state.ssm.instances,
      headers: state => state.ssm.headers,
      showActions: state => state.ssm.showActions,
    }),
    search: {
      get() {
        return this.$store.state.ssm.search
      },
      set(value) {
        this.$store.commit('ssm/updateSearch', value)
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.ssm.selectedItems
      },
      set(value) {
        this.$store.commit('ssm/updateSelected', value)
      }
    }
  },
  methods: {
    refresh(){
      this.$store.dispatch('ssm/refresh')
    },
    onClickRow(event){
      this.$store.dispatch('ssm/onClickRow', event)
    },
    onItemSelected(event){
      this.$store.dispatch('ssm/onItemSelected', event)
    },
    startSession(){
      this.$store.dispatch('ssm/startSession')
    }
  },
}
</script>

<style>
.start-session-btn {
  width: 200px !important;
}
</style>