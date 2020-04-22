<template>
  <v-app id="inspire">
    <NavigationDrawer />
    <AppBar />
    <SettingsDialog />
    <AboutDialog />
    <v-content v-if="loaded">
      <Root />
      <Snackbar />
    </v-content>
    <!--
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
      -->
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import AppBar from './AppBar'
import NavigationDrawer from './NavigationDrawer'
import SettingsDialog from './SettingsDialog'
import AboutDialog from './AboutDialog'
import Root from './Root'
import Snackbar from './Snackbar'

export default {
  name: 'App',

  components: {
    NavigationDrawer,
    AppBar,
    SettingsDialog,
    AboutDialog,
    Root,
    Snackbar
  },
  props: {
    source: String,
  },
  computed: {
    ...mapState({
      loaded: state => state.core.loaded
    })
  },
  created () {
    this.$store.dispatch('core/init');
  }
};
</script>

<style>
.v-list-item__title {
  font-size: 1.0em !important;
}
th,
td {
  width: 100px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.actions {
  position: absolute;
  right: 10px;
}
.action-btn {
  margin-left: 4px;
  margin-right: 4px;
  font-size:0.9em !important;
}
.actionBlock {
  margin-top: 10px;
  margin-bottom :10px;
}
.v-data-footer__select {
  display: none !important;
}
html{
  overflow-y: auto !important;
}
.title {
  margin-left:20px;
}
.titleLink {
  text-decoration: none;
  color: inherit !important;
}
.v-content__wrap .container {
  padding-bottom: 0;
}
</style>