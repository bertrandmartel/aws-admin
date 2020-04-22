<template>
  <div v-show="outputs.length > 0">
    <v-data-table
      :headers="outputsHeaders"
      :items-per-page="14"
      :items="outputs"
      class="tabTable"
      item-key="OutputKey"
    ></v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabOutputs',
  computed: {
    ...mapState({
      outputs: state => state.cloudformation.outputs,
      outputsHeaders: state => state.cloudformation.outputsHeaders
    })
  }
}
</script>

