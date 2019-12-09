
import Vue from 'vue'
import Member from './components/member.vue'
import router from './router'

// import Foot from 'components/Foot.vue'
// import Swipe from 'components/Swipe.vue'

new Vue({
    el: '#Member',
    router,
    render: h => h(Member)

})