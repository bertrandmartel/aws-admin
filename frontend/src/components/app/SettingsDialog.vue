<template>
  <v-dialog v-model="settingsDialog" max-width="450">
    <v-card>
      <v-card-title class="headline">Settings</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              autocomplete="off"
              v-model="serverPathEdit"
              label="API server base path"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="restartSession">Restart session</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="settingsDialog = false">Close</v-btn>
        <v-btn color="green darken-1" text @click="saveSettings">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'SettingsDialog',
    computed: {
      ...mapState({
        serverPathEdit: state => state.core.serverPathEdit
      }),
      settingsDialog: {
        get() {
          return this.$store.state.core.settingsDialog
        },
        set(value) {
          this.$store.commit('core/updateSettingsDialog', value)
        }
      },
      serverPathEdit: {
        get() {
          return this.$store.state.core.serverPathEdit
        },
        set(value) {
          this.$store.commit('core/updateServerPathEdit', value)
        }
      }
    },
    methods: {
      restartSession(){
        this.$store.dispatch('core/resetSession')
      },
      saveSettings(){
        this.$store.dispatch('core/saveSettings')
      },
    }
  }
</script>