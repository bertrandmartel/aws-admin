<template>
  <v-dialog v-model="createRecordDialog" persistent max-width="450">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn createRecordSetBtn" color="primary" small v-on="on">Create Record Set</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Create a New Record Set</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="recordName"
              label="Record Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="recordType"
              :items="recordTypes"
              label="Record Type"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-switch
              v-model="recordAlias"
              :label="`Alias Target`"
            ></v-switch>
          </v-col>
          <template v-if="!recordAlias">
            <v-col cols="12">
              <v-text-field
                v-model="recordValue"
                label="Record Value"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="recordTTL"
                label="TTL"
                type="number"
                outlined
              ></v-text-field>
            </v-col>
          </template>
          <template v-if="recordAlias">
            <v-col cols="12">
              <v-text-field
                v-model="recordValue"
                label="Alias"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="recordHostZoneID"
                label="HostZoneID"
                outlined
              ></v-text-field>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createRecordDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="createRecord">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CreateRecordDialog',
  computed: {
    ...mapState({
      recordTypes: state => state.route53.recordTypes,
    }),
    createRecordDialog: {
      get() {
        return this.$store.state.route53.createRecordDialog
      },
      set(value) {
        this.$store.commit('route53/updateCreateRecordDialog', value)
      }
    },
    recordName: {
      get() {
        return this.$store.state.route53.recordPendingCreation.name
      },
      set(value) {
        this.$store.commit('route53/updateRecordPendingCreationField', { name: value })
      }
    },
    recordType: {
      get() {
        return this.$store.state.route53.recordPendingCreation.type
      },
      set(value) {
        this.$store.commit('route53/updateRecordPendingCreationField', { type: value })
      }
    },
    recordAlias: {
      get() {
        return this.$store.state.route53.recordPendingCreation.alias
      },
      set(value) {
        this.$store.commit('route53/updateRecordPendingCreationField', { alias: value })
      }
    },
    recordValue: {
      get() {
        return this.$store.state.route53.recordPendingCreation.value
      },
      set(value) {
        this.$store.commit('route53/updateRecordPendingCreationField', { value: value })
      }
    },
    recordTTL: {
      get() {
        return this.$store.state.route53.recordPendingCreation.ttl
      },
      set(value) {
        this.$store.commit('route53/updateRecordPendingCreationField', { ttl: value })
      }
    },
    recordHostZoneID: {
      get() {
        return this.$store.state.route53.recordPendingCreation.hostzoneID
      },
      set(value) {
        this.$store.commit('route53/updateRecordPendingCreationField', { hostzoneID: value })
      }
    }
  },
  methods: {
    createRecord(){
      this.$store.dispatch('route53/createRecord')
    }
  }
}
</script>