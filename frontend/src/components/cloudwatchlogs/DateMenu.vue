<template>
  <v-menu
    ref="dateMenu"
    v-model="dateMenu"
    :close-on-content-click="false"
    :return-value.sync="startDateStr"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
      :value="getDateFormatted"
      label="Date filter"
      prepend-icon="event"
      readonly
      hide-details
      style='margin-left:25px; margin-top:0; padding-top:0;max-width:350px;'
      v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="startDateStr" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="startDateStrChange">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DateMenu',
  computed: {
    ...mapGetters('cloudwatchlogs', {
      getDateFormatted: 'getDateFormatted'
    }),
    dateMenu: {
      get() {
        return this.$store.state.cloudwatchlogs.dateMenu
      },
      set(value) {
        this.$store.commit('cloudwatchlogs/updateDateMenu', value)
      }
    },
    startDateStr: {
      get() {
        return this.$store.state.cloudwatchlogs.startDateStr
      },
      set(value) {
        this.$store.commit('cloudwatchlogs/updateStartDateStr', value)
      }
    }
  },
  methods: {
    startDateStrChange(){
      this.$refs.dateMenu.save(this.startDateStr)
      this.$store.dispatch('cloudwatchlogs/onStartDateChange')
    }
  }
}
</script>