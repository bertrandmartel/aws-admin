<template>
  <v-dialog v-model="deleteDialog" max-width="450">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="error" small v-on="on">Delete repo</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete {{selectedRepository.RepositoryName}}</v-card-title>
      <v-card-text>
        Confirm deleting repo ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="deleteRepo">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DeleteDialog',
  computed: {
    ...mapState({
      selectedRepository: state => state.ecr.selectedRepository,
    }),
    deleteDialog: {
      get() {
        return this.$store.state.ecr.deleteDialog
      },
      set(value) {
        this.$store.commit('ecr/updateDeleteDialog', value)
      }
    }
  },
  methods: {
    deleteRepo(){
      this.$store.dispatch('ecr/deleteRepo')
    }
  }
}
</script>