<template>
  <v-dialog v-model="deleteDialog" max-width="900" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="error" small v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete Keypair {{selectedKeypair.KeyName}}</v-card-title>
      <v-card-text>
        Confirm deleting keypair {{selectedKeypair.KeyName}} ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="deleteKeypair">Delete</v-btn>
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
      showActions: state => state.keypair.showActions,
      selectedKeypair: state => state.keypair.selectedKeypair,
    }),
    deleteDialog: {
      get() {
        return this.$store.state.keypair.deleteDialog
      },
      set(value) {
        this.$store.commit('keypair/updateDeleteDialog', value)
      }
    },
  },
  methods: {
    deleteKeypair(){
      this.$store.dispatch('keypair/deleteKeypair')
    }
  }
}
</script>