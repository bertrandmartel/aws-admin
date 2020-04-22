<template>
  <v-dialog v-model="startDialog" max-width="900" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Start</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Start instance {{selectedInstance.Name}}</v-card-title>
      <v-card-text>
        Confirm starting instance {{selectedInstance.InstanceId}} ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="startDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="startInstance">Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StartInstanceDialog',
  computed: {
    ...mapState({
      selectedInstance: state => state.ec2.selectedInstance,
      showActions: state => state.ec2.showActions,
    }),
    startDialog: {
      get() {
        return this.$store.state.ec2.startDialog
      },
      set(value) {
        this.$store.commit('ec2/updateStartDialog', value)
      }
    }
  },
  methods: {
    startInstance(){
      this.$store.dispatch('ec2/startInstance')
    }
  }
}
</script>