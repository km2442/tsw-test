import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

var vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

global.vm = vm;