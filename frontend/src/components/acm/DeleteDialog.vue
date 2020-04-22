<template>
  <v-dialog v-model="deleteDialog" max-width="1000" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="error" small v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete certificate {{selectedCertificate.DomainName}}</v-card-title>
      <v-card-text>Delete this certificate ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteDialog=false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="deleteCert">Delete</v-btn>
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
      selectedCertificate: state => state.acm.selectedCertificate,
      showActions: state => state.acm.showActions,
    }),
    deleteDialog: {
      get() {
        return this.$store.state.acm.deleteDialog
      },
      set(value) {
        this.$store.commit('acm/updateDeleteDialog', value)
      }
    }
  },
  methods: {
    deleteCert(){
      this.$store.dispatch('acm/deleteCert')
    }
  }
}
</script>