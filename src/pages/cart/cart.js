import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'


new Vue({
    el: '.container',
    data: {
        cartlist: null,
        // goodsList: null
    },
    created() {
        axios.get(url.cartList).then(res => {

            // this.cartlist = res.data.lists
            // this.goodsList = res.data.lists.goodsList
            res.data.lists.forEach((shop) => {
                shop.checked = false
                console.log('goods' + shop.goodsList)
                shop.goodsList.forEach((good) => {
                    console.log('good' + good)
                    good.checked = false
                })
            })
            this.cartlist = res.data.lists
            console.log('cartlist' + this.cartlist)
            console.log(1)


        })
    }
})