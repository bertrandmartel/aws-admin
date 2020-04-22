<template>
  <v-dialog v-model="createDialog" max-width="450">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" color="primary" small v-on="on">Create repo</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Create a repo</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="pendingCreateRepo"
              label="Repository name"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="createRepo">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CreateDialog',
  computed: {
    createDialog: {
      get() {
        return this.$store.state.ecr.createDialog
      },
      set(value) {
        this.$store.commit('ecr/updateCreateDialog', value)
      }
    },
    pendingCreateRepo: {
      get() {
        return this.$store.state.ecr.pendingCreateRepo
      },
      set(value) {
        this.$store.commit('ecr/updatePendingCreateRepo', value)
      }
    }
  },
  methods: {
    createRepo(){
      this.$store.dispatch('ecr/createRepo')
    }
  }
}
</script>