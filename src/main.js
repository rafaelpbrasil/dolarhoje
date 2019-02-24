import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import highchartsVue from 'highcharts-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'https://api.exchangeratesapi.io/';

Vue.prototype.$http = axios
Vue.use(highchartsVue);

library.add(faExchangeAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
