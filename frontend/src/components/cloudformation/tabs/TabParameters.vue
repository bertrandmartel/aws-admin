<template>
  <div v-show="parameters.length > 0">
    <v-data-table
      :headers="parametersHeaders"
      :items-per-page="14"
      :items="parameters"
      class="tabTable"
      item-key="ParameterKey"
    ></v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabParameters',
  computed: {
    ...mapState({
      parameters: state => state.cloudformation.parameters,
      parametersHeaders: state => state.cloudformation.parametersHeaders
    })
  }
}
</script>

