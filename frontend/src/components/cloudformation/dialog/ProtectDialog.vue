<template>
  <v-dialog persistent v-model="protectDialog" max-width="1000">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" small :color="terminationProtection ? 'error' : 'success'" v-on="on">{{terminationProtection ? "Unprotect" : "Protect"}}</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">{{terminationProtection ? "Unprotect " : "Protect "}} {{selectedStack.StackName}}</v-card-title>
      <v-card-text>Do you really want to do this ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="protectDialog=false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="toggleTerminationProtection">{{terminationProtection ? "Unprotect" : "Protect"}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CloudFormationProtectDialog',
  computed: {
    ...mapState({
      selectedStack: state => state.cloudformation.selectedStack,
      terminationProtection: state => state.cloudformation.terminationProtection,
    }),
    protectDialog: {
      get() {
        return this.$store.state.cloudformation.protectDialog
      },
      set(value) {
        this.$store.commit('cloudformation/updateProtectDialog', value)
      }
    }
  },
  methods: {
    toggleTerminationProtection(){
      this.$store.dispatch('cloudformation/toggleTerminationProtection')
    }
  }
}
</script>