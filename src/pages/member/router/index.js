import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('../components/member.vue')
        },

        {
            path: '/address',
            component: () => import('../components/address.vue'),
            children: [
                {
                    path: '',
                    name: "",
                    component: () => import('../components/all.vue'),

                },
                {
                    path: 'all',
                    name: 'all',
                    component: () => import('../components/all.vue'),

                },
                {
                    path: 'form',
                    name: 'form',
                    component: () => import('../components/form.vue'),

                }
            ]
        }


    ]

}


)
export default router



// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)

// let routes = [{
//     path: '/',
//     component: require('../components/member.vue')
// }, {
//     path: '/address',
//     component: require('../components/address.vue'),
//     children: [{
//         path: '',
//         component: require('../components/all.vue')
//     }, {
//         path: 'all',
//         component: require('../components/all.vue')
//     }, {
//         path: 'form',
//         component: require('../components/form.vue')
//     }]
// }]

// const router = new Router({
//     routes
// })

// export default router