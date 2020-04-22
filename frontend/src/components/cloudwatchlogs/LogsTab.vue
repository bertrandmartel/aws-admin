<template>
  <v-row 
    v-show="(logStreams.length > 0)" 
    no-gutters style='padding-left:25px;padding-top:25px;padding-left:25px;'>
    <v-col cols="11">
      <v-select hide-details 
        item-value="LogStreamName"
        v-model="selectedLogStream"
        :items="logStreams" 
        label="Log streams" 
        outlined 
        style='margin-bottom:15px;'
        @change="logStreamChanged">
        <template slot="selection" slot-scope="data">
        <!-- HTML that describe how select should render selected items -->
        {{ data.item.LogStreamName }} - {{ formatDate(new Date(data.item.CreationTime)) }} - {{formatBytes(data.item.StoredBytes)}}
        </template>
        <template slot="item" slot-scope="data">
        <!-- HTML that describe how select should render items when the select is open -->
        {{ data.item.LogStreamName }} - {{ formatDate(new Date(data.item.CreationTime)) }} - {{formatBytes(data.item.StoredBytes)}}
        </template>
      </v-select>
    </v-col>
    <v-col cols="1" style='text-align:center;'>
      <v-btn v-blur medium fab color="primary" @click="goToLogEnd"><v-icon>mdi-sort-ascending</v-icon></v-btn>
    </v-col>
    <v-col cols="12">
      <template>
        <table class="logContainer">
          <tbody id="logs">
            <tr v-for="item in logEvents" :key="item.Id" class="logRow">
                <td class="timestamp">{{ formatDate(new Date(item.Timestamp)) }}</td>
                <td class="log">{{item.Message}}</td>
            </tr>
          </tbody>
        </table>
          <!--
          <v-data-table
              :headers="logEventsHeaders"
              :items-per-page="11"
              :items="logEvents"
              class="elevation-1"
              item-key="Id"
              :search="searchLog"
          >
          <template v-slot:item.Timestamp="{ item }">
              <span>{{formatDate(item.Timestamp)}}</span>
          </template>
          </v-data-table>
      -->
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'LogsTab',
  computed: {
    ...mapState({
      logStreams: state => state.cloudwatchlogs.logStreams,
      logEvents: state => state.cloudwatchlogs.logEvents,
    }),
    ...mapGetters('cloudwatchlogs', {
      formatDate: 'formatDate',
      formatBytes: 'formatBytes'
    }),
    selectedLogStream: {
      get() {
        return this.$store.state.cloudwatchlogs.selectedLogStream
      },
      set(value) {
        this.$store.commit('cloudwatchlogs/updateSelectedLogStream', value)
      }
    }
  },
  methods: {
    goToLogEnd(){
      this.$store.dispatch('cloudwatchlogs/goToLogEnd')
    },
    logStreamChanged(stream){
      this.$store.dispatch('cloudwatchlogs/logStreamChanged', stream)
    }
  }
}
</script>