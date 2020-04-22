<template>
  <v-dialog v-model="stopDialog" max-width="900" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Stop</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Stop instance {{selectedInstance.Name}}</v-card-title>
      <v-card-text>
        Confirm stopping instance {{selectedInstance.InstanceId}} ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="stopDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="stopInstance">Stop</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StopInstanceDialog',
  computed: {
    ...mapState({
      selectedInstance: state => state.ec2.selectedInstance,
      showActions: state => state.ec2.showActions,
    }),
    stopDialog: {
      get() {
        return this.$store.state.ec2.stopDialog
      },
      set(value) {
        this.$store.commit('ec2/updateStopDialog', value)
      }
    }
  },
  methods: {
    stopInstance(){
      this.$store.dispatch('ec2/stopInstance')
    }
  }
}
</script>