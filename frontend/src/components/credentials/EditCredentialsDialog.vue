<template>
  <v-dialog v-model="editDialog" max-width="1000" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" small color="primary" v-on="on">
        <v-icon left>mdi-pencil</v-icon> Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Edit credentials for {{name}}</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
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
                v-model="sharedCredentialsProfile"
                autocomplete="off"
                label="Profile Name"
                outlined
              ></v-text-field>
            </v-col>
          </template>
          <template v-if="credentialType == 1">
            <v-col cols="12" >
              <v-text-field
              v-model="staticCredentialsAccessID"
              autocomplete="off"
              label="AWS Access key ID"
              outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
              v-model="staticCredentialsSecretAccessKey"
              autocomplete="off"
              label="AWS Secret Access key"
              outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
              v-model="staticCredentialsSessionToken"
              autocomplete="off"
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
                  v-model="fileCredentialsFilePath"
                  autocomplete="off"
                  label="File Path"
                  outlined
                ></v-text-field>
              </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="editDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="saveCredentials">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'EditCredentialsDialog',
  computed: {
    ...mapState({
      showActions: state => state.credentials.showActions,
      credentialTypes: state => state.credentials.credentialTypes,
    }),
    editDialog: {
      get() {
        return this.$store.state.credentials.editDialog
      },
      set(value) {
        this.$store.commit('credentials/updateEditDialog', value)
      }
    },
    name: {
      get() {
        return this.$store.state.credentials.selectedCredentials.name
      },
      set(value) {
        this.$store.commit('credentials/updateSelectedCredentialFields', {name: value})
      }
    },
    credentialType: {
      get() {
        return this.$store.state.credentials.selectedCredentials.credentialType
      },
      set(value) {
        this.$store.commit('credentials/updateSelectedCredentialFields', {credentialType: value})
      }
    },
    sharedCredentialsProfile: {
      get() {
        return this.$store.state.credentials.selectedCredentials.sharedCredentials.profile
      },
      set(value) {
        this.$store.commit('credentials/updateSelectedCredentialFields', {
          sharedCredentials: {
            profile: value
          }
        })
      }
    },
    staticCredentialsAccessID: {
      get() {
        return this.$store.state.credentials.selectedCredentials.staticCredentials.accessID
      },
      set(value) {
        this.$store.commit('credentials/updateSelectedCredentialFields', {
          staticCredentials: {
            accessID: value
          }
        })
      }
    },
    staticCredentialsSecretAccessKey: {
      get() {
        return this.$store.state.credentials.selectedCredentials.staticCredentials.secretAccessKey
      },
      set(value) {
        this.$store.commit('credentials/updateSelectedCredentialFields', {
          staticCredentials: {
            secretAccessKey: value
          }
        })
      }
    },
    staticCredentialsSessionToken: {
      get() {
        return this.$store.state.credentials.selectedCredentials.staticCredentials.sessionToken
      },
      set(value) {
        this.$store.commit('credentials/updateSelectedCredentialFields', {
          staticCredentials: {
            sessionToken: value
          }
        })
      }
    },
    fileCredentialsFilePath: {
      get() {
        return this.$store.state.credentials.selectedCredentials.fileCredentials.filePath
      },
      set(value) {
        this.$store.commit('credentials/updateSelectedCredentialFields', {
          fileCredentials: {
            filePath: value
          }
        })
      }
    },
  },
  methods: {
    saveCredentials(){
      this.$store.dispatch('credentials/saveCredentials')
    }
  }
}
</script>