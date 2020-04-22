<template>
  <v-dialog v-model="deleteRecordDialog" max-width="450" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="error" small v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete Record Set</v-card-title>
      <v-card-text>
        Confirm deleting Record Set {{selectedRecord.Name}}-{{selectedRecord.Type}}-{{selectedRecord.Value}} ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteRecordDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="deleteRecord">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DeleteRecordDialog',
  computed: {
    ...mapState({
      selectedRecord: state => state.route53.selectedRecord,
      showActions: state => state.route53.showActions,
    }),
    deleteRecordDialog: {
      get() {
        return this.$store.state.route53.deleteRecordDialog
      },
      set(value) {
        this.$store.commit('route53/updateDeleteRecordDialog', value)
      }
    }
  },
  methods: {
    deleteRecord(){
      this.$store.dispatch('route53/deleteRecord')
    }
  }
}
</script>