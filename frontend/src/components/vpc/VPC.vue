<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="actionBlock">
        <div style='float: left;margin-left:5px;display: flex;'>
          <h2 style='margin-right: 5px;'>VPCs</h2> <v-btn v-blur v-on:click="refresh" fab small><v-icon>mdi-refresh</v-icon></v-btn>
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
            :items="vpc"
            class="elevation-1"
            item-key="VpcId"
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
  name: 'VPC',
  computed: {
    ...mapState({
      headers: state => state.vpc.headers,
      vpc: state => state.vpc.vpc,
    }),
    search: {
      get() {
        return this.$store.state.vpc.search
      },
      set(value) {
        this.$store.commit('vpc/updateSearch', value)
      }
    }
  },
  methods: {
    refresh(){
      this.$store.dispatch('vpc/initVPC')
    }
  },
  created () {
    this.$store.dispatch('vpc/initVPC')
  },
}
</script>