<template>
  <v-dialog persistent v-model="deleteDialog" max-width="1000">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" small color="error" v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete stack {{selectedStack.StackName}}</v-card-title>
      <v-card-text>Do you really want to delete this stack ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="deleteStack">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'CloudFormationDeleteDialog',
  computed: {
    ...mapState({
      selectedStack: state => state.cloudformation.selectedStack,
    }),
    deleteDialog: {
      get() {
        return this.$store.state.cloudformation.deleteDialog
      },
      set(value) {
        this.$store.commit('cloudformation/updateDeleteDialog', value)
      }
    }
  },
  methods: {
    deleteStack(){
      this.$store.dispatch('cloudformation/deleteStack')
    }
  }
}
</script>