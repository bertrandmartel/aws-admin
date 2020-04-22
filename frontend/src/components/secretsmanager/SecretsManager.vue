<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>Secrets Manager</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
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
          <DeleteDialog />
          <SecretDialog />
          <CreateDialog />
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
            :items="secrets"
            class="elevation-1"
            item-key="ARN"
            :search="search"
            :single-select="true"
            show-select
          ></v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import CreateDialog from './CreateDialog'
import DeleteDialog from './DeleteDialog'
import SecretDialog from './SecretDialog'

export default {
  name: 'SecretsManager',
  components: {
    CreateDialog,
    DeleteDialog,
    SecretDialog
  },
  computed: {
    ...mapState({
      headers: state => state.secretsmanager.headers,
      secrets: state => state.secretsmanager.secrets,
    }),
    search: {
      get() {
        return this.$store.state.secretsmanager.search
      },
      set(value) {
        this.$store.commit('secretsmanager/updateSearch', value)
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.secretsmanager.selectedItems
      },
      set(value) {
        this.$store.commit('secretsmanager/updateSelected', value)
      }
    }
  },
  methods: {
    onClickRow(event){
      this.$store.dispatch('secretsmanager/onClickRow', event)
    },
    onItemSelected(event){
      this.$store.dispatch('secretsmanager/onItemSelected', event)
    },
    refresh(){
      this.$store.dispatch('secretsmanager/refresh')
    }
  },
  created () {
    this.$store.dispatch('secretsmanager/initSecrets')
  },
}
</script>