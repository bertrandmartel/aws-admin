<template>
  <v-dialog v-model="createDialog" max-width="900" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Create</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Create Secret</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="pendingSecretName"
              label="Secret name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              outlined
              rows="12"
              v-model="pendingSecretValue"
              value="pendingSecretValue">
              <template v-slot:label>
                <div>
                 Secret value
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="createSecret">Create</v-btn>
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
    }),
    createDialog: {
      get() {
        return this.$store.state.secretsmanager.createDialog
      },
      set(value) {
        this.$store.commit('secretsmanager/updateCreateDialog', value)
      }
    },
    pendingSecretName: {
      get() {
        return this.$store.state.secretsmanager.pendingSecret.name
      },
      set(value) {
        this.$store.commit('secretsmanager/updatePendingSecretField', {name: value})
      }
    },
    pendingSecretValue: {
      get() {
        return this.$store.state.secretsmanager.pendingSecret.value
      },
      set(value) {
        this.$store.commit('secretsmanager/updatePendingSecretField', {value: value})
      }
    }
  },
  methods: {
    createSecret(){
      this.$store.dispatch('secretsmanager/createSecret')
    }
  }
}
</script>