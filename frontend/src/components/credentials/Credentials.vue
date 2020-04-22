<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>Credentials</h2>
        </div>
        <div class="actions">
          <DeleteCredentialsDialog />
          <EditCredentialsDialog />
          <CreateCredentialsDialog />
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
            :headers="credentialsHeaders"
            :items-per-page="14"
            :items="credentialList"
            class="elevation-1"
            item-key="name"
            :single-select="true"
            show-select
          >
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import CreateCredentialsDialog from './CreateCredentialsDialog'
import DeleteCredentialsDialog from './DeleteCredentialsDialog'
import EditCredentialsDialog from './EditCredentialsDialog'

export default {
  name: 'Credentials',
  components: {
    CreateCredentialsDialog,
    DeleteCredentialsDialog,
    EditCredentialsDialog
  },
  computed: {
    ...mapState({
      credentialList: state => state.core.credentialList,
      credentialsHeaders: state => state.credentials.credentialsHeaders,
    }),
    selectedItems: {
      get() {
        return this.$store.state.credentials.selectedItems
      },
      set(value) {
        this.$store.commit('credentials/updateSelected', value)
      }
    }
  },
  methods: {
    onClickRow(event){
      this.$store.dispatch('credentials/onClickRow', event)
    },
    onItemSelected(event){
      this.$store.dispatch('credentials/onItemSelected', event)
    }
  }
}
</script>

<style>
</style>