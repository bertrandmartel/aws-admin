<template>
  <v-dialog v-model="deleteDialog" max-width="1000" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" small color="error" v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete credentials {{selectedCredentials.name}}</v-card-title>
      <v-card-text>Delete these credentials ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="deleteCredentials">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DeleteCredentialsDialog',
  computed: {
    ...mapState({
      selectedCredentials: state => state.credentials.selectedCredentials,
      showActions: state => state.credentials.showActions,
    }),
    deleteDialog: {
      get() {
        return this.$store.state.credentials.deleteDialog
      },
      set(value) {
        this.$store.commit('credentials/updateDeleteDialog', value)
      }
    },
    name: {
      get() {
        return this.$store.state.credentials.credentialsEdit.name
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {name: value})
      }
    }
  },
  methods: {
    deleteCredentials(){
      this.$store.dispatch('credentials/deleteCredentials')
    }
  }
}
</script>