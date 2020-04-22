<template>
  <div v-if="functionData.Code">
    <v-row no-gutters style='padding-left:25px;padding-top:25px;padding-left:25px;'>
      <v-col cols="12">
        <v-text-field
          :value="functionData.Code.RepositoryType"
          label="RepositoryType"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="12">
        <div class="my-2">
          <v-btn large primary target="_blank" class="download_btn" :href="functionData.Code.Location">Download code</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabCode',
  computed: {
    ...mapState({
      functionData: state => state.lambda.functionData,
    }),
  }
}
</script>

<style>
.download_btn {
    width: 100%;
}
</style>