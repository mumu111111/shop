
import Vue from 'vue'
import Address from './components/address.vue'
import router from './router'
import store from './vuex'
// import Foot from 'components/Foot.vue'
// import Swipe from 'components/Swipe.vue'

new Vue({
    el: '#app',
    router,
    render: h => h(Address)

})