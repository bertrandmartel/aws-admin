<template>
  <v-dialog v-model="rebootDialog" max-width="900" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Reboot</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Reboot instance {{selectedInstance.Name}}</v-card-title>
      <v-card-text>
        Confirm rebooting instance {{selectedInstance.InstanceId}} ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="rebootDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="rebootInstance">Reboot</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RebootInstanceDialog',
  computed: {
    ...mapState({
      selectedInstance: state => state.ec2.selectedInstance,
      showActions: state => state.ec2.showActions,
    }),
    rebootDialog: {
      get() {
        return this.$store.state.ec2.rebootDialog
      },
      set(value) {
        this.$store.commit('ec2/updateRebootDialog', value)
      }
    }
  },
  methods: {
    rebootInstance(){
      this.$store.dispatch('ec2/rebootInstance')
    }
  }
}
</script>