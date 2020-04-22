<template>
  <v-dialog persistent v-model="createDialog" max-width="1000">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" small color="primary" v-on="on">Create</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Create Credentials</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              autocomplete="off"
              label="Credentials Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="credentialType"
              :items="credentialTypes"
              label="Credential Type"
              item-text="name"
              outlined
            ></v-select>
          </v-col>
          <template v-if="credentialType == 0">
            <v-col cols="12">
              <v-text-field
                autocomplete="off"
                v-model="sharedCredentialProfile"
                label="Profile Name"
                outlined
              ></v-text-field>
            </v-col>
          </template>
          <template v-if="credentialType == 1">
            <v-col cols="12" >
              <v-text-field
              autocomplete="off"
              v-model="staticCredentialAccessID"
              label="AWS Access key ID"
              outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
              autocomplete="off"
              v-model="staticCredentialSecretAccessKey"
              label="AWS Secret Access key"
              outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
              autocomplete="off"
              v-model="staticCredentialSessionToken"
              label="AWS Session token"
              outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p style='font-size: 1.2em; margin-left:10px'><v-icon large color="warning">mdi-alert</v-icon><span style='margin-left: 10px'>These temporary credentials will be stored in your browser's local storage</span></p>
            </v-col>
          </template>
          <template v-if="credentialType == 2">
            <v-col cols="12">
              <v-text-field
                autocomplete="off"
                v-model="fileCredentialsFilePath"
                label="File Path"
                outlined
              ></v-text-field>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="createCredentials">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CreateCredentialsDialog',
  computed: {
    ...mapState({
      credentialTypes: state => state.credentials.credentialTypes,
    }),
    createDialog: {
      get() {
        return this.$store.state.credentials.createDialog
      },
      set(value) {
        this.$store.commit('credentials/updateCreateDialog', value)
      }
    },
    name: {
      get() {
        return this.$store.state.credentials.credentialsEdit.name
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {name: value})
      }
    },
    credentialType: {
      get() {
        return this.$store.state.credentials.credentialsEdit.credentialType
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {credentialType: value})
      }
    },
    sharedCredentialProfile: {
      get() {
        return this.$store.state.credentials.credentialsEdit.sharedCredentials.profile
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {
          sharedCredentials: {
            profile: value
          }
        })
      }
    },
    staticCredentialAccessID: {
      get() {
        return this.$store.state.credentials.credentialsEdit.staticCredentials.accessID
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {
          staticCredentials: {
            accessID: value
          }
        })
      }
    },
    staticCredentialSecretAccessKey: {
      get() {
        return this.$store.state.credentials.credentialsEdit.staticCredentials.secretAccessKey
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {
          staticCredentials: {
            secretAccessKey: value
          }
        })
      }
    },
    staticCredentialSessionToken: {
      get() {
        return this.$store.state.credentials.credentialsEdit.staticCredentials.sessionToken
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {
          staticCredentials: {
            sessionToken: value
          }
        })
      }
    },
    fileCredentialsFilePath:{
      get() {
        return this.$store.state.credentials.credentialsEdit.fileCredentials.filePath
      },
      set(value) {
        this.$store.commit('credentials/updateCredentialsEdit', {
          fileCredentials: {
            filePath: value
          }
        })
      }
    },
  },
  methods: {
    createCredentials(){
      this.$store.dispatch('credentials/createCredentials')
    }
  }
}
</script>