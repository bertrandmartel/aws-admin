<template>
  <div v-if="selectedRepository.RepositoryName != null">
    <v-row no-gutters style='padding-left:25px;padding-top:25px;padding-left:25px;'>
      <v-col cols="6">
        <v-text-field
          :value="selectedRepository.RepositoryName"
          label="Name"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="6" style='padding-left:25px;'>
        <v-text-field
          :value="selectedRepository.RegistryId"
          label="Registry Id"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters style='padding-left:25px;'>
      <v-col cols="12">
        <v-text-field
          :value="selectedRepository.RepositoryArn"
          label="Registry Id"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          :value="selectedRepository.RepositoryUri"
          label="Repository URI"
          outlined
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <code style='color: black; padding-top: 12px;padding-bottom:12px;white-space: nowrap;display: block;overflow-y: hidden;'>aws ecr get-login-password --region {{region}} {{(credentials.credentialType == 0 && credentials.sharedCredentials)  ? ("--profile " + credentials.sharedCredentials.profile) : ""}} | docker login -u AWS --password-stdin {{selectedRepository.RepositoryUri}}</code>
      </v-col>
      <v-col cols="12" style='margin-top:15px'>
        <code style='color: black; padding-top: 12px;padding-bottom:12px;white-space: nowrap;display: block;overflow-y: hidden;'>docker build -t {{selectedRepository.RepositoryName}} .</code>
      </v-col>
      <v-col cols="12" style='margin-top:15px'>
        <code style='color: black; padding-top: 12px;padding-bottom:12px;white-space: nowrap;display: block;overflow-y: hidden;'>docker tag {{selectedRepository.RepositoryName}}:latest {{selectedRepository.RepositoryUri}}:latest</code>
      </v-col>
      <v-col cols="12" style='margin-top:15px'>
        <code style='color: black; padding-top: 12px;padding-bottom:12px;white-space: nowrap;display: block;overflow-y: hidden;'>docker push {{selectedRepository.RepositoryUri}}:latest</code>
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
      selectedRepository: state => state.ecr.selectedRepository,
      region: state => state.core.region,
      credentials: state => state.core.credentials,
    })
  }
}
</script>