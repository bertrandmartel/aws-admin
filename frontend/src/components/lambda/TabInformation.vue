<template>
  <div v-if="functionData.Configuration">
    <v-row no-gutters style='padding-left:25px;padding-top:25px;padding-left:25px;'>
      <v-col cols="6">
        <v-text-field
          :value="functionData.Configuration.FunctionName"
          label="Name"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="6" style='padding-left:25px;'>
        <v-text-field
          :value="functionData.Configuration.State"
          label="State"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="12">
        <v-text-field
          :value="functionData.Configuration.Description"
          label="Description"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="6">
        <v-text-field
          :value="functionData.Configuration.Runtime"
          label="Runtime"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="6" style='padding-left:25px;'>
        <v-text-field
          :value="functionData.Configuration.Handler"
          label="Handler"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="6">
        <v-text-field
          :value="functionData.Configuration.CodeSize"
          label="Code size"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="6" style='padding-left:25px;'>
        <v-text-field
          :value="functionData.Configuration.MemorySize"
          label="Memory size"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="12">
        <v-text-field
          :value="functionData.Configuration.FunctionArn"
          label="ARN"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="6">
        <v-text-field
          :value="functionData.Configuration.Timeout"
          label="Timeout"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="6" style='padding-left:25px;'>
        <v-text-field
          :value="functionData.Configuration.LastModified"
          label="LastModified"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabInformation',
  computed: {
    ...mapState({
      functionData: state => state.lambda.functionData,
    }),
  }
}
</script>