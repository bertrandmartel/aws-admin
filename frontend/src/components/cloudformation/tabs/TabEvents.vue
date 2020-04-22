<template>
  <div v-show="events.length > 0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-data-table
          :headers="eventsHeaders"
          :items-per-page="14"
          :items="events"
          class="tabTable eventWrapper2 eventTable"
          item-key="EventId"
        >
          <template v-slot:item.ResourceStatusReason="{ item }">
            <div style='padding-top: 12px;padding-bottom:12px;white-space: nowrap;display: block;overflow-y: hidden;'>{{item.ResourceStatusReason}}</div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabEvents',
  computed: {
    ...mapState({
      events: state => state.cloudformation.events,
      eventsHeaders: state => state.cloudformation.eventsHeaders,
    })
  }
}
</script>