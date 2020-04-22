<template> 
  <div v-if="selectedCluster.ClusterName != null">
    <v-row no-gutters style='padding-left:25px;padding-top:25px;padding-left:25px;'>
      <v-col cols="6">
        <v-text-field
          :value="selectedCluster.ClusterName"
          label="Name"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="6" style='padding-left:25px;'>
        <v-text-field
          :value="selectedCluster.Status"
          label="Status"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="12">
        <v-textarea
          outlined
          readonly
          :value="selectedCluster.ClusterArn">
          <template v-slot:label>
            <div>
              Description
            </div>
          </template>
        </v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabInformation',
  computed: {
    ...mapState({
      selectedCluster: state => state.ecs.selectedCluster,
    }),
  }
}
</script>