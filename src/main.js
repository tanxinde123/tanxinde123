// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import "./filter/index.js"

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

import "./assets/css/reset.css"
import store from "./store/index"
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
