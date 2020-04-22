<template>
  <v-dialog v-model="sessionDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar >
        <v-btn icon @click="closeSession">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Session {{selectedInstance.Name}} [{{selectedInstance.InstanceId}}]</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon style='margin-right:15px;' @click="openSettings">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
        <v-toolbar-items>
          <v-btn text @click="closeSession">Close session</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="shell">
        <div id="terminal"></div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SessionDialog',
  computed: {
    ...mapState({
      selectedInstance: state => state.ssm.selectedInstance,
    }),
    sessionDialog: {
      get() {
        return this.$store.state.ssm.sessionDialog
      },
      set(value) {
        this.$store.commit('ssm/updateSessionDialog', value)
      }
    }
  },
  methods: {
    closeSession(){
      this.$store.dispatch('ssm/closeSession')
    },
    openSettings(){
      this.$store.commit('ssm/updateSettingsDialog', true)
    }
  }
}
</script>

<style>
.shell {
  margin:25px !important;
}
.colorField .v-input__append-inner{
  margin-top: 15px;
}
@import './css/xterm.css'
</style>