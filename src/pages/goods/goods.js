import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'
import qs from 'qs'
// import { InfiniteScroll } from 'mint-ui';

// Vue.use(InfiniteScroll);
//获取url的 id
let { id } = qs.parse(location.search.substr(1))
let detailTab = ['商品详情', '本店交易']
new Vue({
    el: '#app',
    data: {
        details: null,
        detailTab,
        swipeLists: [],
        danbao: null,
        tabIndex: 0,
        deals: null


    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            axios.get(url.detail).then(res => {
                console.log(res.data)
                this.details = res.data
                this.danbao = this.details.renzheng
            })
        },
        getDeal() {
            axios.get(url.deal, { id }).then(res => {
                // this.deals = res.data.lists
                console.log(res.data.lists)
                this.deals = res.data.lists

            });


        },
        changTab(index) {
            this.tabIndex = index
            //切换到tab2 采取请求数据 index===1
            if (index) {
                this.getDeal()
            }

        }
    }
})



