<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>Target Groups</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style='margin-left:25px; margin-top:0; padding-top:0;min-width:350px;'
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <template>
          <v-data-table
            :headers="headers"
            :items-per-page="14"
            :items="tg"
            class="elevation-1"
            item-key="TargetGroupArn"
            :search="search"
          ></v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'TargetGroups',
  computed: {
    ...mapState({
      headers: state => state.targetgroups.headers,
      tg: state => state.targetgroups.tg,
    }),
    search: {
      get() {
        return this.$store.state.targetgroups.search
      },
      set(value) {
        this.$store.commit('targetgroups/updateSearch', value)
      }
    }
  },
  methods: {
    refresh(){
      this.$store.dispatch('targetgroups/initTargetGroups')
    }
  },
  created () {
    this.$store.dispatch('targetgroups/initTargetGroups')
  },
}
</script>