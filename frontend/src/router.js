import Vue from 'vue'
import Router from 'vue-router'
import App from './components/app/App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '', component: App }
  ]
})