<template>
  <v-navigation-drawer
    :value="drawer"
    app
    clipped
  >
    <v-list dense>
        <v-list-item v-bind:key="item.value" v-for="item in navbarItems" :to="{ path: '/', query: { service: item.query }}" link>
            <v-list-item-action>
              <v-icon>mdi-{{item.image || "amazon"}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2" style='right:0'>
        <div style='float:right; margin:15px;'>
          <NavbarSettings />
          <v-btn icon @click="toggleDark">
            <v-icon v-if="theme=='dark'" medium>mdi-brightness-4</v-icon>
            <v-icon v-else medium>mdi-brightness-7</v-icon>
          </v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import NavbarSettings from './NavbarSettings'
import { mapState } from 'vuex'

export default {
  name: 'NavigationDrawer',
  components: {
    NavbarSettings
  },
  computed: {
    ...mapState({
      navbarItems: state => state.core.navbarItems,
      drawer: state => state.core.drawer,
      theme: state => state.core.theme,
    })
  },
  methods: {
    toggleDark(){
      this.$store.commit('core/toggleDark')
    },
  }
}
</script>