<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>EC2 Instances</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style='margin-left:25px; margin-top:0; padding-top:0;min-width:350px;'
          ></v-text-field>
        </div>
        <div class="actions">
          <StartInstanceDialog />
          <StopInstanceDialog />
          <RebootInstanceDialog />
          <TerminateInstanceDialog />
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import StartInstanceDialog from './StartInstanceDialog'
import StopInstanceDialog from './StopInstanceDialog'
import RebootInstanceDialog from './RebootInstanceDialog'
import TerminateInstanceDialog from './TerminateInstanceDialog'

export default {
  name: 'EC2',
  components: {
    StartInstanceDialog,
    StopInstanceDialog,
    RebootInstanceDialog,
    TerminateInstanceDialog
  },
  computed: {
    ...mapState({
      headers: state => state.ec2.headers,
      instances: state => state.ec2.instances,
    }),
    search: {
      get() {
        return this.$store.state.ec2.search
      },
      set(value) {
        this.$store.commit('ec2/updateSearch', value)
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.ec2.selectedItems
      },
      set(value) {
        this.$store.commit('ec2/updateSelected', value)
      }
    }
  },
  methods: {
    onClickRow(event){
      this.$store.dispatch('ec2/onClickRow', event)
    },
    onItemSelected(event){
      this.$store.dispatch('ec2/onItemSelected', event)
    },
    refresh(){
      this.$store.dispatch('ec2/initInstances', true)
    }
  },
  created () {
    this.$store.dispatch('ec2/initInstances')
  },
}
</script>

<style>
</style>