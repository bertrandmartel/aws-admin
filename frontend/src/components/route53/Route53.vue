<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>Route 53</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
          <v-text-field
            v-model="searchDomain"
            append-icon="search"
            label="Search a domain"
            single-line
            hide-details
            style='margin-left:25px; margin-top:0; padding-top:0;min-width:350px;'
          ></v-text-field>
        </div>
        <div class="actions">
          <v-btn v-blur v-on:click="refreshRecords" fab small style='margin-right:10px;'><v-icon>mdi-refresh</v-icon></v-btn>
          <DeleteRecordDialog />
          <CreateRecordDialog />
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="3">
        <template>
          <v-data-table
            v-on:click:row="onClickHostZoneRow"
            v-on:item-selected="onHostZoneSelected"
            v-model="selectedHostzones"
            :headers="hostZoneHeaders"
            :items-per-page="14"
            :items="hostedzones"
            class="elevation-1"
            item-key="Id"
            :single-select="true"
            show-select
            :search="searchDomain"
          ></v-data-table>
        </template>
      </v-col>
      <v-col cols="9">
        <template>
          <v-tabs fixed-tabs v-on:change="selectTab">
            <v-tab>RecordSets</v-tab>
          </v-tabs>
        </template>
        <template v-show="(tabState === 0) && (recordsets.length > 0)">
          <v-text-field
            v-model="searchRecordSet"
            append-icon="search"
            label="Search a record set"
            single-line
            hide-details
            style='margin-left:25px; margin-top:0; padding-top:0;min-width:350px;margin-top:15px;margin-bottom:0'
          ></v-text-field>
          <v-data-table
            v-on:click:row="onClickRecordSetRow"
            v-on:item-selected="onRecordSetSelected"
            v-model="selectedRecordSets"
            :headers="recordSetsHeaders"
            :items-per-page="12"
            :items="recordsets"
            class="tabTable"
            item-key="RecordID"
            :single-select="true"
            show-select
            :search="searchRecordSet"
          ></v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeleteRecordDialog from './DeleteRecordDialog'
import CreateRecordDialog from './CreateRecordDialog'

import { mapState } from 'vuex'

export default {
  name: 'Route53',
  components: {
    DeleteRecordDialog,
    CreateRecordDialog
  },
  computed: {
    ...mapState({
      hostZoneHeaders: state => state.route53.hostZoneHeaders,
      recordSetsHeaders: state => state.route53.recordSetsHeaders,
      tabState: state => state.route53.tabState,
      hostedzones: state => state.route53.hostedzones,
      recordsets: state => state.route53.recordsets,
    }),
    searchDomain: {
      get() {
        return this.$store.state.route53.searchDomain
      },
      set(value) {
        this.$store.commit('route53/updateSearchDomain', value)
      }
    },
    searchRecordSet: {
      get() {
        return this.$store.state.route53.searchRecordSet
      },
      set(value) {
        this.$store.commit('route53/updateSearchRecordSet', value)
      }
    },
    selectedHostzones: {
      get() {
        return this.$store.state.route53.selectedHostzones
      },
      set(value) {
        this.$store.commit('route53/updateSelectedHostZones', value)
      }
    },
    selectedRecordSets: {
      get() {
        return this.$store.state.route53.selectedRecordSets
      },
      set(value) {
        this.$store.commit('route53/updateSelectedRecordSets', value)
      }
    }
  },
  methods: {
    onClickHostZoneRow(event){
      this.$store.dispatch('route53/onClickHostZoneRow', event)
    },
    onHostZoneSelected(event){
      this.$store.dispatch('route53/onHostZoneSelected', event)
    },
    onClickRecordSetRow(event){
      this.$store.dispatch('route53/onClickRecordSetRow', event)
    },
    onRecordSetSelected(event){
      this.$store.dispatch('route53/onRecordSetSelected', event)
    },
    refresh(){
      this.$store.dispatch('route53/initRoute53', true)
    },
    selectTab(tabState){
      this.$store.commit('route53/updateTabState', tabState)
    },
    refreshRecords(){
      this.$store.dispatch('route53/initRecords', true)
    }
  },
  created(){
    this.$store.dispatch('route53/initRoute53')
  }
}
</script>

<style>
.tabTable {
  margin-left: 25px;
  margin-top: 25px;
}
.createRecordSetBtn {
  width: 175px !important;
}
</style>