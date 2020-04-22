import Vue from 'vue'
import App from './components/app/App.vue'
import './plugins/vuetify'
//import axios from 'axios'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

//axios.defaults.withCredentials = true

//Vue.prototype.$axios = axios
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
