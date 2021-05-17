import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueMoment, {
    moment,
})
// npm install axios
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDpCfK5NdA1j7xR4TrFGw26XBGftgKNC-I',
    libraries: 'places', 
    region: 'UY',
    language: 'es',
  },

})
window.event = new Vue;

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
