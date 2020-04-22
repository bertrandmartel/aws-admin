<template>
  <v-dialog v-model="navbarSettingsDialog" max-width="1000">
    <template v-slot:activator="{ on }">
      <v-btn icon style='margin-right:15px;' v-on="on">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Navigation drawer settings</v-card-title>
      <v-card-text style='height: 600px;overflow-y: auto;'>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="9">Drag and drop menus you want to see/hide. Reorder the menus</v-col>
          <v-col cols="3"><v-btn large class="reset_btn" @click="resetNavMenu">Reset to default</v-btn></v-col>
        </v-row>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="5">All menus</v-col>
          <v-col cols="2"></v-col>
          <v-col cols="5">Your selection</v-col>
        </v-row>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="5">
            <draggable class="list-group" v-model='remainingNavItems' group="menu">
              <div
                v-for="element in remainingNavItems"
                :key="element.value"
              >
                <v-text-field
                  hide-details
                  single-line
                  solo
                  readonly
                  class="menuBlock"
                  :value="element.text"
                ></v-text-field>
              </div>
            </draggable>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="5">
            <draggable class="list-group" v-model='navbarItems' group="menu">
              <div
                v-for="element in navbarItems"
                :key="element.value"
              >
                <v-text-field
                  hide-details
                  single-line
                  solo
                  readonly
                  class="menuBlock"
                  :value="element.text"
                ></v-text-field>
              </div>
            </draggable>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="navbarSettingsDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'NavbarSettings',
  components: {
    draggable
  },
  computed: {
    navbarSettingsDialog: {
      get() {
        return this.$store.state.core.navbarSettingsDialog
      },
      set(value) {
        this.$store.dispatch('core/toggleNavbarSettingsDialog', value)
      }
    },
    navbarItems: {
      get() {
        return this.$store.state.core.navbarItems
      },
      set(value) {
        this.$store.commit('core/updateNavbarItems', value)
      }
    },
    remainingNavItems: {
      get() {
        return this.$store.state.core.remainingNavItems
      },
      set(value) {
        this.$store.commit('core/updateRemainingNavItems', value)
      }
    }
  },
  methods: {
    resetNavMenu(){
      this.$store.commit('core/resetNavMenu')
    }
  }
}
</script>

<style>
.theme--dark.menuBlock > .v-input__control > .v-input__slot {
  background: white !important;
}
.theme--dark.menuBlock input {
  color: black !important;
}
.menuBlock {
  margin-top:5px !important;
  margin-bottom:5px !important;
}
.menuBlock > .v-input__control > .v-input__slot > .v-text-field__slot > input {
  cursor: -webkit-grab; 
  cursor: grab;
}
.list-group {
  width:100%;
  height: 100%;
}
.reset_btn {
  width: 100%;
}
</style>