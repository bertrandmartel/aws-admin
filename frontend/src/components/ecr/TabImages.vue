<template v-if="images.length > 0">
  <v-data-table
    :headers="imageHeaders"
    :items-per-page="14"
    :items="images"
    class="tabTable"
    item-key="ImageUri"
    ></v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabImages',
  computed: {
    ...mapState({
      images: state => state.ecr.images,
      imageHeaders: state => state.ecr.imageHeaders,
    })
  }
}
</script>