<template>
  <v-dialog v-model="createBucketDialog" max-width="450">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Create bucket</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Create bucket</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="pendingCreateBucketName"
              label="S3 bucket name"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createBucketDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="createBucket">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CreateBucketDialog',
  computed: {
    createBucketDialog: {
      get() {
        return this.$store.state.s3.createBucketDialog
      },
      set(value) {
        this.$store.commit('s3/updateCreateBucketDialog', value)
      }
    },
    pendingCreateBucketName: {
      get() {
        return this.$store.state.s3.pendingCreateBucketName
      },
      set(value) {
        this.$store.commit('s3/updatePendingCreateBucketName', value)
      }
    }
  },
  methods: {
    createBucket(){
      this.$store.dispatch('s3/createBucket')
    }
  }
}
</script>