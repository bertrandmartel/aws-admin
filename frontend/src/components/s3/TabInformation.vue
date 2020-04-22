<template>
  <div v-if="selectedBucket.Name != null">
    <v-row no-gutters style='padding-left:25px;padding-top:25px;padding-left:25px;'>
      <v-col cols="6">
        <v-text-field
          :value="selectedBucket.CreationDate"
          label="Creation Date"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabInformation',
  computed: {
    ...mapState({
      selectedBucket: state => state.s3.selectedBucket,
    }),
  }
}
</script>