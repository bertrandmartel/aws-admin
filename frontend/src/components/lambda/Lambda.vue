<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>Lambda</h2>
          <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
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
            :headers="headers"
            :items-per-page="14"
            :items="functions"
            class="elevation-1"
            item-key="FunctionArn"
            :search="search"
            :single-select="true"
            show-select
          ></v-data-table>
        </template>
      </v-col>
      <v-col cols="9">
        <template>
          <v-tabs fixed-tabs v-on:change="selectTab">
            <v-tab>Information</v-tab>
            <v-tab>Code</v-tab>
          </v-tabs>
        </template> 
        <div v-show="(tabState === 0) && (functions.length > 0)"><TabInformation/></div>
        <div v-show="(tabState === 1) && (functions.length > 0)"><TabCode/></div>  
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TabInformation from './TabInformation'
import TabCode from './TabCode'

export default {
  name: 'Lambda',
  components: {
    TabInformation,
    TabCode
  },
  computed: {
    ...mapState({
      headers: state => state.lambda.headers,
      functions: state => state.lambda.functions,
      tabState: state => state.lambda.tabState,
    }),
    search: {
      get() {
        return this.$store.state.lambda.search
      },
      set(value) {
        this.$store.commit('lambda/updateSearch', value)
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.lambda.selectedItems
      },
      set(value) {
        this.$store.commit('lambda/updateSelected', value)
      }
    }
  },
  methods: {
    onClickRow(event){
      this.$store.dispatch('lambda/onClickRow', event)
    },
    onItemSelected(event){
      this.$store.dispatch('lambda/onItemSelected', event)
    },
    selectTab(tabState){
      this.$store.commit('lambda/updateTabState', tabState)
    },
    refresh(){
      this.$store.dispatch('lambda/initLambdaList', true)
    }
  },
  created () {
    this.$store.dispatch('lambda/initLambdaList')
  },
}
</script>

<style>
</style>