<template>
  <div>
    <v-row no-gutters style='padding-left:25px;padding-top:15px;padding-left:25px;'>
      <v-col cols="12" v-if="selectedBucket.Name != null" style='margin-bottom:25px'>
        <div class="actions">
          <UploadObjectDialog v-if="selectedBucket.Name != null && regionErrorMessage === ''" />
          <DeleteObjectDialog v-if="showObjectActions" />
          <v-btn class="action-btn" color="primary" @click.prevent="downladObject" small v-if="showObjectActions">
            <v-icon>mdi-download</v-icon> Download
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" style='margin-top:15px'>
        <div v-if="(objects.length > 0) && regionErrorMessage === ''">
          <v-data-table
            v-on:click:row="onObjectClickRow"
            v-on:item-selected="onObjectItemSelected"
            v-model="selectedObjectArr"
            :headers="objectHeaders"
            :items-per-page="12"
            :items="objects"
            item-key="Key"
            :single-select="true"
            show-select
          ></v-data-table>
        </div>
        <div v-if="regionErrorMessage !== ''" style='text-align:center; margin-top: 40px;'>
          {{regionErrorMessage}}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UploadObjectDialog from './UploadObjectDialog'
import DeleteObjectDialog from './DeleteObjectDialog'

export default {
  name: 'TabObjects',
  components: {
    DeleteObjectDialog,
    UploadObjectDialog
  },
  computed: {
    ...mapState({
      selectedBucket: state => state.s3.selectedBucket,
      regionErrorMessage: state => state.s3.regionErrorMessage,
      showObjectActions: state => state.s3.showObjectActions,
      objects: state => state.s3.objects,
      objectHeaders: state => state.s3.objectHeaders,
    }),
    selectedObjectArr: {
      get() {
        return this.$store.state.s3.selectedObjectArr
      },
      set(value) {
        this.$store.commit('s3/updateObjectSelected', value)
      }
    }
  },
  methods: {
    onObjectClickRow(event){
      this.$store.dispatch('s3/onObjectClickRow', event)
    },
    onObjectItemSelected(event){
      this.$store.dispatch('s3/onObjectItemSelected', event)
    },
    downladObject(){
      this.$store.dispatch('s3/downladObject')
    }
  }
}
</script>