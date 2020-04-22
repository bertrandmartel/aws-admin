<template>
  <v-dialog v-model="deleteDialog" max-width="900" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="error" small v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete Keypair {{selectedSecret.Name}}</v-card-title>
      <v-card-text>
        
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <div>
              Confirm deleting secret {{selectedSecret.Name}} ?
            </div>
          </v-col>
          <v-col cols="12" style='margin-top:25px;'>
            <v-switch
              v-model="forceDelete"
              label="Force delete (no recovery)"
            ></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="deleteSecret">Delete</v-btn>
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
      showActions: state => state.secretsmanager.showActions,
      selectedSecret: state => state.secretsmanager.selectedSecret,
    }),
    deleteDialog: {
      get() {
        return this.$store.state.secretsmanager.deleteDialog
      },
      set(value) {
        this.$store.commit('secretsmanager/updateDeleteDialog', value)
      }
    },
    forceDelete: {
      get() {
        return this.$store.state.secretsmanager.forceDelete
      },
      set(value) {
        this.$store.commit('secretsmanager/updateForceDelete', value)
      }
    },
  },
  methods: {
    deleteSecret(){
      this.$store.dispatch('secretsmanager/deleteSecret')
    }
  }
}
</script>