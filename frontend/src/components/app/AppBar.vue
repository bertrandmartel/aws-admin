<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <router-link class="titleLink" to="/"><v-toolbar-title class="title">{{title}}</v-toolbar-title></router-link>
    <v-spacer></v-spacer>
    <v-col cols="auto" class='credentialSelect'>
      <v-select
        v-model="credentials"
        :items="credentialList"
        label="Credentials"
        item-text="name"
        item-value="name"
      ></v-select>
    </v-col>
    <v-col cols="auto" class='regionSelect'>
      <v-select
        v-model="region"
        :items="regionList"
        label="Region"
        item-text="name"
        item-value="name"
      ></v-select>
    </v-col>
    <v-btn icon style='margin-right:15px;' @click="openSettingsDialog">
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>
    <v-btn icon style='margin-right:15px;' @click="aboutDialog = true">
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'AppBar',
    computed: {
      ...mapState({
        title: state => state.core.title,
        regionList: state => state.core.regionList,
        credentialList: state => state.core.credentialList
      }),
      settingsDialog: {
        get() {
          return this.$store.state.core.settingsDialog
        },
        set(value) {
          this.$store.commit('core/updateSettingsDialog', value)
        }
      },
      aboutDialog: {
        get() {
          return this.$store.state.core.aboutDialog
        },
        set(value) {
          this.$store.commit('core/updateAboutDialog', value)
        }
      },
      region: {
        get() {
          return this.$store.state.core.region
        },
        set(value) {
          this.$store.dispatch('core/updateRegion', value);
        }
      },
      credentials: {
        get() {
          return this.$store.state.core.credentials
        },
        set(value) {
          this.$store.dispatch('core/updateCredentials', value);
        }
      }
    },
    methods: {
      toggleDrawer(){
        this.$store.commit('core/toggleDrawer')
      },
      openSettingsDialog(){
        this.$store.dispatch('core/openSettingsDialog')
      }
    }
  }
</script>

<style>
.regionSelect {
  margin-top: 30px;
  width: 200px;
  margin-right:10px;
}
.credentialSelect {
  margin-top: 30px;
  width: 200px;
  margin-right:10px;
}
</style>