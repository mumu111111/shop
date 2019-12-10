import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'
Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        lists: null
    },
    mutations: {
        init(state, list){
            this.state.lists = list
        }
    },
    actions: {
        getLists({commit},id){
            Address.list().then(res=> {
                commit(init, res.data.lists)
            })
        }
    }
})