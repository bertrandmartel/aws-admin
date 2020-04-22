<template>
  <v-dialog v-model="deleteObjectDialog" max-width="1000" v-if="showBucketActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" small color="error" v-on="on">Delete object</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete {{selectedObject.Key}}</v-card-title>
      <v-card-text>
        Confirm deleting object {{selectedObject.Key}} ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteObjectDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="deleteObject">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DeleteObjectDialog',
  computed: {
    ...mapState({
      selectedObject: state => state.s3.selectedObject,
      showBucketActions: state => state.s3.showBucketActions,
    }),
    deleteObjectDialog: {
      get() {
        return this.$store.state.s3.deleteObjectDialog
      },
      set(value) {
        this.$store.commit('s3/updateDeleteObjectDialog', value)
      }
    }
  },
  methods: {
    deleteObject() {
      this.$store.dispatch('s3/deleteObject')
    }
  }
}
</script>