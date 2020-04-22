<template>
  <v-dialog v-model="deleteBucketDialog" max-width="450" v-if="showBucketActions">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="error" small v-on="on">Delete bucket</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete {{selectedBucket.Name}}</v-card-title>
      <v-card-text>
        Confirm deleting bucket {{selectedBucket.Name}} ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="deleteBucketDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="deleteBucket">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DeleteBucketDialog',
  computed: {
    ...mapState({
      selectedBucket: state => state.s3.selectedBucket,
      showBucketActions: state => state.s3.showBucketActions,
    }),
    deleteBucketDialog: {
      get() {
        return this.$store.state.s3.deleteBucketDialog
      },
      set(value) {
        this.$store.commit('s3/updateDeleteBucketDialog', value)
      }
    }
  },
  methods: {
    deleteBucket(){
      this.$store.dispatch('s3/deleteBucket')
    }
  }
}
</script>