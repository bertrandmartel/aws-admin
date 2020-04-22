<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>S3</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
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
          <DeleteBucketDialog />
          <CreateBucketDialog />
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="3">
        <template>
          <v-data-table
            v-on:click:row="onBucketClickRow"
            v-on:item-selected="onBucketItemSelected"
            v-model="selectedItems"
            :headers="bucketHeaders"
            :items-per-page="14"
            :items="buckets"
            class="elevation-1"
            item-key="Name"
            :single-select="true"
            show-select
            :search="search"
          ></v-data-table>
        </template>
      </v-col>
      <v-col cols="9">
        <template>
          <v-tabs fixed-tabs v-on:change="selectTab">
            <v-tab>Objects</v-tab>
            <v-tab>Information</v-tab>
          </v-tabs>
        </template>
        <template v-if="tabState === 0">
          <TabObjects />
        </template>
        <template v-if="tabState === 1">
          <TabInformation />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeleteBucketDialog from './DeleteBucketDialog'
import CreateBucketDialog from './CreateBucketDialog'
import TabObjects from './TabObjects'
import TabInformation from './TabInformation'

import { mapState } from 'vuex'

export default {
  name: 'S3',
  components: {
    DeleteBucketDialog,
    CreateBucketDialog,
    TabObjects,
    TabInformation
  },
  computed: {
    ...mapState({
      bucketHeaders: state => state.s3.bucketHeaders,
      buckets: state => state.s3.buckets,
      tabState: state => state.s3.tabState,
    }),
    search: {
      get() {
        return this.$store.state.s3.search
      },
      set(value) {
        this.$store.commit('s3/updateSearch', value)
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.s3.selectedItems
      },
      set(value) {
        this.$store.commit('s3/updateSelected', value)
      }
    }
  },
  methods: {
    onBucketClickRow(event){
      this.$store.dispatch('s3/onBucketClickRow', event)
    },
    onBucketItemSelected(event){
      this.$store.dispatch('s3/onBucketItemSelected', event)
    },
    selectTab(tabState){
      this.$store.commit('s3/updateTabState', tabState)
    },
    refresh() {
      this.$store.dispatch('s3/refresh')
    }
  },
  created () {
    this.$store.dispatch('s3/initBuckets')
  },
}
</script>