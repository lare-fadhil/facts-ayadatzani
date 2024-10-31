
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './assets/main.css' 

Vue.config.productionTip = false
import axios from 'axios'
let api = 'http://localhost:4000/'
// let api = 'http://192.168.0.125:4000'
// let api = 'https://datzani.arraymaps.com/'
axios.defaults.baseURL = api;
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.prototype.$imagePath = api + 'static/'



new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
        
        