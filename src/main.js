import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import highchartsVue from 'highcharts-vue'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'https://economia.awesomeapi.com.br/json/';

Vue.prototype.$http = axios
Vue.use(highchartsVue);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
