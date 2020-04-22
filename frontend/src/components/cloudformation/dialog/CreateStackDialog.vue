<template>
  <v-dialog persistent v-model="createDialog" max-width="1000">
    <template v-slot:activator="{ on }">
      <v-btn class="action-btn" small color="primary" v-on="on">Create</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Create a New Stack</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Stack Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-file-input v-model="templateFile" v-on:change="onTemplate" label="Template file"></v-file-input>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createDialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="createStack">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CloudFormationCreateDialog',
  computed: {
    createDialog: {
      get() {
        return this.$store.state.cloudformation.createDialog
      },
      set(value) {
        this.$store.commit('cloudformation/updateCreateDialog', value)
      }
    },
    name: {
      get() {
        return this.$store.state.cloudformation.createdStack.name
      },
      set(value) {
        this.$store.commit('cloudformation/updateCreatedStack', {name: value})
      }
    },
    templateFile: {
      get() {
        return this.$store.state.cloudformation.createdStack.template
      },
      set(value) {
        this.$store.commit('cloudformation/updateCreatedStack', {template: value})
      }
    }
  },
  methods: {
    onTemplate(file){
      this.$store.commit('cloudformation/updateCreatedStackTemplate', file)
    },
    createStack(){
      this.$store.dispatch('cloudformation/createStack')
    }
  }
}
</script>