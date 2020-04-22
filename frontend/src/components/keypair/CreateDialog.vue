<template>
  <v-dialog v-model="createDialog" max-width="900" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Create</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Create Keypair</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="pendingCreateKeypair"
              label="Key name"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="createKeypair">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CreateDialog',
  computed: {
    ...mapState({
      showActions: state => state.keypair.showActions,
    }),
    createDialog: {
      get() {
        return this.$store.state.keypair.createDialog
      },
      set(value) {
        this.$store.commit('keypair/updateCreateDialog', value)
      }
    },
    pendingCreateKeypair: {
      get() {
        return this.$store.state.keypair.pendingCreateKeypair
      },
      set(value) {
        this.$store.commit('keypair/updatePendingCreateKeypair', value)
      }
    }
  },
  methods: {
    createKeypair(){
      this.$store.dispatch('keypair/createKeypair')
    }
  }
}
</script>