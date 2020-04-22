<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>CloudFormation</h2> 
          <v-btn v-blur v-on:click="refresh(false)" fab small>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>  
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
          <v-btn v-blur fab small color="primary" style='margin-right: 10px' @click="refreshStack">
            <v-icon>mdi-refresh</v-icon>
          </v-btn> 
          <CloudFormationDeleteDialog />
          <CloudFormationProtectDialog />
          <CloudFormationUpdateStackDialog />
          <CloudFormationCreateDialog />
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
              :headers="stacksHeaders"
              :items-per-page="15"
              :items="stacks"
              class="elevation-1"
              item-key="StackId"
              :single-select="true"
              show-select
              :search="search"
            >
            </v-data-table>
        </template>
      </v-col>
      <v-col cols="9">
        <template>
          <v-tabs fixed-tabs v-on:change="updateTabState">
            <v-tab>Information</v-tab>
            <v-tab>Template</v-tab>
            <v-tab>Events</v-tab>
            <v-tab>Parameters</v-tab>
            <v-tab>Outputs</v-tab>
          </v-tabs>
        </template>
        <div v-show="tabState === 0"><TabInformation/></div>
        <div v-if="tabState === 1"><TabTemplate/></div>
        <div v-show="tabState === 2"><TabEvents/></div>
        <div v-show="tabState === 3"><TabParameters/></div>
        <div v-show="tabState === 4"><TabOutputs/></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import CloudFormationDeleteDialog from './dialog/DeleteDialog'
import CloudFormationProtectDialog from './dialog/ProtectDialog'
import CloudFormationUpdateStackDialog from './dialog/UpdateStackDialog'
import CloudFormationCreateDialog from './dialog/CreateStackDialog'
import TabInformation from './tabs/TabInformation'
import TabTemplate from './tabs/TabTemplate'
import TabEvents from './tabs/TabEvents'
import TabParameters from './tabs/TabParameters'
import TabOutputs from './tabs/TabOutputs'

export default {
  name: 'CloudFormation',
  props: [ 'serverPath' ],
  components: {
    CloudFormationDeleteDialog,
    CloudFormationProtectDialog,
    CloudFormationUpdateStackDialog,
    CloudFormationCreateDialog,
    TabInformation,
    TabTemplate,
    TabEvents,
    TabParameters,
    TabOutputs
  },
  created() {
    this.$store.dispatch('cloudformation/initStacks')
  },
  computed: {
    ...mapState({
      stacks: state => state.cloudformation.stacks,
      stacksHeaders: state => state.cloudformation.stacksHeaders,
      tabState: state => state.cloudformation.tabState,
    }),
    search: {
      get() {
        return this.$store.state.cloudformation.search
      },
      set(value) {
        this.$store.commit('cloudformation/updateSearch', value)
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.cloudformation.selectedItems
      },
      set(value) {
        this.$store.commit('cloudformation/updateSelected', value)
      }
    }
  },
  methods: {
    onClickRow(event){
      this.$store.dispatch('cloudformation/onClickRow', event)
    },
    onItemSelected(event){
      this.$store.dispatch('cloudformation/onItemSelected', event)
    },
    refresh(selectFirst){
      this.$store.dispatch('cloudformation/refresh', selectFirst)
    },
    refreshStack(){
      this.$store.dispatch('cloudformation/refreshStack')
    },
    updateTabState(tabState){
      this.$store.commit('cloudformation/updateTabState', tabState)
    }
  }
}
</script>

<style>
.tabTable {
  margin-left: 25px;
  margin-top: 25px;
}
.footerBtn {
  flex-basis: 33% !important;
}
.pageCount {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.eventTable  table {
   table-layout:fixed;
}
.eventTable  table th:nth-child(1){ 
   width: 220px;
}
.eventTable  table th:nth-child(2){ 
   width: 200px;
}
.eventTable table th:nth-child(3){
   width: 300px;
}
.eventTable table th:nth-child(4){
   width: auto;
}
</style>