import Vue from 'vue'
import Router from 'vue-router'
import App from './components/app/App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_ROUTE || '/',
  routes: [
    { path:"", component: App }
  ]
})