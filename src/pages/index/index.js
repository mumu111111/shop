import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

new Vue({
    el: '.container',
    data: {
        lists: null,
        bannerLists: null,
        loading: false //是否可触发loadmore方法加载更多
    },
    components: {
        Foot,
        Swipe
    },
    created() {
        this.getLists()
        this.getBanner()
    },
    methods: {
        getLists: function () {
            this.loading = true //若为真，则无限滚动不会被触发
            axios.get(url.hot).then(res => {
                // this.lists = res.data.lists //不要加这句 有bug 
                if (this.lists) {
                    this.lists = this.lists.concat(res.data.lists)
                } else {
                    this.lists = res.data.lists
                }
                this.loading = false

            })
        },
        getBanner: function () {
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
                console.log(this.bannerLists)
            })
        }
    }
})