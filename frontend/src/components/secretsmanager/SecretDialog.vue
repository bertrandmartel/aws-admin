<template>
  <v-dialog v-model="secretValueDialog" max-width="900" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">View secret</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Secret value for {{selectedSecret.Name}}</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px'>
          <v-col cols="12">
            <v-textarea
              outlined
              readonly
              rows="12"
              :value="secretValue">
              <template v-slot:label>
                <div>
                  Value
                </div>
              </template>
            </v-textarea>
          </v-col>
      </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="secretValueDialog = false">Close</v-btn>
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
      selectedSecret: state => state.secretsmanager.selectedSecret,
      secretValue: state => state.secretsmanager.secretValue,
    }),
    secretValueDialog: {
      get() {
        return this.$store.state.secretsmanager.secretValueDialog
      },
      set(value) {
        this.$store.dispatch('secretsmanager/toggleSecretValueDialog', value)
      }
    },
  }
}
</script>