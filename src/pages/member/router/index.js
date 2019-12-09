import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router(
    {
        path: '/',
        component: import('../components/member.vue')
    },
    {
        path: '/address',
        component: import('../components/address.vue'),
        children: [
            {
                path: '',
                component: import('../components/all.vue'),

            },
            {
                path: '/form',
                component: import('../components/form.vue'),

            }
        ]
    },


)
export default router