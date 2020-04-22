<template>
  <v-dialog v-model="importDialog" max-width="1000" v-if="showActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small primary v-on="on">Import</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Import Certificates</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="createdCertName"
              label="Certificate Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-file-input v-on:change="onUploadCertificate" label="Certificate File"></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-file-input v-on:change="onUploadPrivateKey" label="Private Key File"></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-file-input v-on:change="onUploadFullChain" label="Full Chain File"></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="importDialog=false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="importCerts">Import</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ImportDialog',
  computed: {
    ...mapState({
      showActions: state => state.acm.showActions,
    }),
    createdCertName:{
      get() {
        return this.$store.state.acm.createdCert.name
      },
      set(value) {
        this.$store.commit('acm/updateCreatedCertField', { name: value})
      }
    },
    importDialog: {
      get() {
        return this.$store.state.acm.importDialog
      },
      set(value) {
        this.$store.commit('acm/updateImportDialog', value)
      }
    }
  },
  methods: {
    importCerts(){
      this.$store.dispatch('acm/importCerts')
    },
    onUploadCertificate(file){
      this.$store.commit('acm/updateCreatedCertField', {certificate: file})
    },
    onUploadPrivateKey(file){
      this.$store.commit('acm/updateCreatedCertField', {privateKey: file})
    },
    onUploadFullChain(file){
      this.$store.commit('acm/updateCreatedCertField', {fullChain: file})
    }
  }
}
</script>