import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import {router} from './routes'
import {store} from './store'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
