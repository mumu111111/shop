import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Address from 'js/addressService.js'

const store = new Vuex.Store({
    state: { //对应all中的data  增删改查 改变的lists 在映射到要数据的组件中
        lists: null
    },
    mutations: {
        init(state, list) {
            state.lists = list
        },
        add(state, data) {

            state.lists.push(data)
        },
        remove(state, id) {
            let lists = state.lists
            let index = lists.findIndex(item => {
                return item.id === id
            })
            lists.splice(index, 1)
            state.lists = lists
        },
        update(state, data) {
            // state.lists.push(data) 错误
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item => {
                return item.id === data.id
            })
            lists[index] = data
            state.lists = lists
        },
        setDefault(state, id) {
            let lists = JSON.parse(JSON.stringify(state.lists))
            lists.forEach(item => {
                if (item.id === id) {
                    item.isDefault = true
                }
                //简写 item.isDefault = item.id === id ? true : false
            })
            state.lists = lists
        }


    },
    actions: {// 调用异步接口 
        getLists({ commit }) {
            Address.list().then(res => { //后台请求数据，拿到响应内容
                console.log('res' + res)
                console.log('data' + res.data.lists)

                commit('init', res.data.lists)
            })
        },
        //我还是不明白为什么直接不加id  后台传进来id 等信息  现在是模拟数据
        addAddress({ commit }, data) {
            Address.add(data).then(res => { //后台处理 成功后 本地lists操作
                let id = parseInt(Math.random() * 10000)
                data.id = id
                commit('add', data) //传入页面中的data
            })

        },
        removeAddress({ commit }, id) { //id传来的参数 给vuex操作使用
            Address.remove(id).then(res => {
                commit('remove', id)
            })
        },
        updateAddress({ commit }, data) {
            Address.update(data).then(res => {

                commit('update', data)
            })
        },
        setDefaultAddress({ commit }, id) {
            Address.setDefault(id).then(res => {
                commit('setDefault', id)
            })
        }



    }
})
export default store