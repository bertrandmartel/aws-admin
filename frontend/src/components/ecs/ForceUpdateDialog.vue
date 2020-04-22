<template>
  <v-dialog v-model="forceUpdateDialog" max-width="1000" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Force update</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Force update {{selectedService.ServiceName}}</v-card-title>
      <v-card-text>
        Confirm force updating service ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="forceUpdateDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="forceUpdate">Force Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ForceUpdateDialog',
  computed: {
    ...mapState({
      showActions: state => state.ecs.showActions,
      selectedService: state => state.ecs.selectedService,
    }),
    forceUpdateDialog: {
      get() {
        return this.$store.state.ecs.forceUpdateDialog
      },
      set(value) {
        this.$store.commit('ecs/updateForceUpdateDialog', value)
      }
    }
  },
  methods: {
    forceUpdate(){
      this.$store.dispatch('ecs/forceUpdate')
    }
  }
}
</script>