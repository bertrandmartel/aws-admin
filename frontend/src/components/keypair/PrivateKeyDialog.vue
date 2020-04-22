<template>
  <v-dialog v-model="keyPrivateDialog" persistent max-width="900">
    <v-card>
      <v-card-title class="headline">Private key</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12">
            <v-textarea
              outlined
              readonly
              rows="12"
              :value="createdPrivateKey">
              <template v-slot:label>
                <div>
                  Finger Print
                </div>
              </template>
            </v-textarea>
          </v-col>
      </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeFingerPrint">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PrivateKeyDialog',
  computed: {
    ...mapState({
      createdPrivateKey: state => state.keypair.createdPrivateKey,
    }),
    keyPrivateDialog: {
      get() {
        return this.$store.state.keypair.keyPrivateDialog
      },
      set(value) {
        this.$store.commit('keypair/updatePrivateKeyDialog', value)
      }
    },
  },
  methods: {
    closeFingerPrint(){
      this.$store.commit('keypair/closeFingerPrint')
    }
  }
}
</script>