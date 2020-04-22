<template>
    <v-dialog v-model="settingsDialog" persistent max-width="1000">
    <v-card>
      <v-card-title class="headline">Shell settings</v-card-title>
      <v-card-text>
        <v-row no-gutters style='margin-top:25px;'>
          <v-col cols="12">
            <div style='display:flex;'>
              <div style='flex:50%;'>
                <v-text-field
                  v-model="termOptionsEditRows"
                  label="Rows count"
                  type="number"
                  outlined></v-text-field>
              </div>
              <div style='flex:50%;margin-left: 25px;'>
                <v-text-field
                  v-model="termOptionsEditCols"
                  label="Columns count"
                  type="number"
                  outlined>
                </v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div style='display:flex;'>
              <div style='flex:15%;'>
                <v-switch
                  v-model="termOptionsCursorBlink"
                  label="Cursor blink"
                ></v-switch>
              </div>
              <div style='flex:35%;'>
              </div>
              <div style='flex:50%;margin-left: 25px;'>
                <v-select
                  v-model="termOptionsCursorStyle"
                  :items="cursorStyleList"
                  label="Cursor style"
                  outlined
                ></v-select>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div style='display:flex;'>
              <div style='flex:50%;'>
                <v-select
                  v-model="termOptionsFontSize"
                  :items="fontSizeList"
                  label="Font size"
                  outlined
                ></v-select>
              </div>
              <div style='flex:50%;margin-left: 25px;'>
                <v-text-field v-model="termOptionsThemeForeground" v-mask="mask" hide-details label="Foreground color" outlined class="ma-0 pa-0 colorField">
                  <template v-slot:append>
                    <v-menu v-model="themeForegroundMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false" >
                      <template v-slot:activator="{ on }">
                        <div v-bind:style="getColorFieldStyle(0)" v-on="on" />
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="termOptionsThemeForeground" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12" style='margin-bottom:30px;'>
            <div style='display:flex;'>
              <div style='flex:50%;'>
                <v-text-field v-model="termOptionsThemeBackground" v-mask="mask" hide-details label="Background color" outlined class="ma-0 pa-0 colorField">
                  <template v-slot:append>
                    <v-menu v-model="themeBackgroundMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false" >
                      <template v-slot:activator="{ on }">
                        <div v-bind:style="getColorFieldStyle(1)" v-on="on" />
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="termOptionsThemeBackground" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </div>
              <div style='flex:50%;margin-left: 25px;'>
                <v-text-field v-model="termOptionsThemeCursor" v-mask="mask" hide-details label="Cursor color" outlined class="ma-0 pa-0 colorField">
                  <template v-slot:append>
                    <v-menu v-model="themeCursorMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false" >
                      <template v-slot:activator="{ on }">
                        <div v-bind:style="getColorFieldStyle(2)" v-on="on" />
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="termOptionsThemeCursor" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </div>
            </div>
          </v-col>
          <!--<v-col cols="12">
            <v-select
              v-model="termOptions.fontFamily"
              :items="fontFamilyList"
              label="Font family"
              outlined
            ></v-select>
          </v-col>-->
          <v-col cols="12">
            <div style='display:flex;'>
              <div style='flex:50%;'>
                <v-text-field v-model="termOptionsThemeCursorAccent" v-mask="mask" hide-details label="Cursor accent color" outlined class="ma-0 pa-0 colorField">
                  <template v-slot:append>
                    <v-menu v-model="themeCursorAccentMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false" >
                      <template v-slot:activator="{ on }">
                        <div v-bind:style="getColorFieldStyle(3)" v-on="on" />
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="termOptionsThemeCursorAccent" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </div>
              <div style='flex:50%;margin-left: 25px;'>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeSettings">Cancel</v-btn>
        <v-btn color="green darken-1" text v-on:click="saveSettings">Save</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { mask } from 'vue-the-mask'

export default {
  name: 'SettingsDialog',
  directives: {
    mask,
  },
  data: () => ({
    mask: '!#XXXXXX',
  }),
  computed: {
    ...mapState({
      cursorStyleList: state => state.ssm.cursorStyleList,
      fontSizeList: state => state.ssm.fontSizeList,
    }),
    ...mapGetters('ssm', {
      getColorFieldStyle: 'getColorFieldStyle'
    }),
    settingsDialog: {
      get() {
        return this.$store.state.ssm.settingsDialog
      },
      set(value) {
        this.$store.commit('ssm/updateSettingsDialog', value)
      }
    },
    termOptionsEditRows:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.rows
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { rows: value})
      }
    },
    termOptionsEditCols:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.cols
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { cols: value})
      }
    },
    termOptionsCursorBlink:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.cursorBlink
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { cursorBlink: value})
      }
    },
    termOptionsCursorStyle:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.cursorStyle
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { cursorStyle: value})
      }
    },
    termOptionsFontSize:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.fontSize
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { fontSize: value})
      }
    },
    termOptionsThemeForeground:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.theme.foreground
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { theme: { foreground: value }})
      }
    },
    termOptionsThemeBackground:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.theme.background
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { theme: { background: value }})
      }
    },
    termOptionsThemeCursor:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.theme.cursor
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { theme: { cursor: value }})
      }
    },
    termOptionsThemeCursorAccent:{
      get() {
        return this.$store.state.ssm.termOptionsEdit.theme.cursorAccent
      },
      set(value) {
        this.$store.commit('ssm/updateTermOptionsField', { theme: { cursorAccent: value }})
      }
    },
    themeBackgroundMenu: {
      get() {
        return this.$store.state.ssm.themeBackgroundMenu
      },
      set(value) {
        this.$store.commit('ssm/updateThemeBackgroundMenu',value)
      }
    },
    themeForegroundMenu: {
      get() {
        return this.$store.state.ssm.themeForegroundMenu
      },
      set(value) {
        this.$store.commit('ssm/updateThemeForegroundMenu',value)
      }
    },
    themeCursorMenu: {
      get() {
        return this.$store.state.ssm.themeForegroundMenu
      },
      set(value) {
        this.$store.commit('ssm/updateThemeCursorMenu',value)
      }
    },
    themeCursorAccentMenu: {
      get() {
        return this.$store.state.ssm.themeCursorAccentMenu
      },
      set(value) {
        this.$store.commit('ssm/updateThemeCursorAccentMenu',value)
      }
    }
  },
  methods: {
    closeSettings(){
      this.$store.dispatch('ssm/closeSettings')
    },
    saveSettings(){
      this.$store.dispatch('ssm/saveSettings')
    },
    colorFieldStyle(index){
      this.$store.commit('ssm/colorFieldStyle', index)
    }
  }
}
</script>

<style>
.colorField .v-input__append-inner{
  margin-top: 15px;
}
</style>