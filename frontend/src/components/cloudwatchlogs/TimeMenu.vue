<template>
  <v-menu
    ref="timeMenu"
    v-model="timeMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="startTimeStr"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
      v-model="startTimeStr"
      label="Time filter"
      prepend-icon="access_time"
      style='margin-left:25px; margin-top:0; padding-top:0;max-width:350px;'
      readonly
      v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="timeMenu"
      v-model="startTimeStr"
      format="24hr"
      full-width
      @change="startTimeStrChange"
      @click:minute="$refs.timeMenu.save(startTimeStr)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'TimeMenu',
  computed: {
    timeMenu: {
      get() {
        return this.$store.state.cloudwatchlogs.timeMenu
      },
      set(value) {
        this.$store.commit('cloudwatchlogs/updateTimeMenu', value)
      }
    },
    startTimeStr: {
      get() {
        return this.$store.state.cloudwatchlogs.startTimeStr
      },
      set(value) {
        this.$store.commit('cloudwatchlogs/updateStartTimeStr', value)
      }
    }
  },
  methods: {
    startTimeStrChange(){
      this.$store.dispatch('cloudwatchlogs/onStartTimeChange')
    }
  }
}
</script>