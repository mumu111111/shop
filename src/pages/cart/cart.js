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
    },
    computed: {
        allSelect: {
            get() {
                if (this.cartlist && this.cartlist.length) {//以来的data必须存在
                    return this.cartlist.every(item => {
                        return item.checked
                    })
                }
                return false
            },
            set(newVal) {
                // if (this.cartlist && this.cartlist.length) {//以来的data必须存在

                //     this.cartlist.forEach(shop => { //全选 选中后 商品店铺全被选中  未全选 所有商品未选中
                //         shop.checked = newVal
                //         shop.goodsList.forEach(item => {
                //             item.checked = newVal
                //         })
                //     })

                // }

                this.cartlist.forEach(item => {
                    console.dir('item' + item)
                    item.checked = newVal
                    item.goodsList.forEach(good => {
                        good.checked = newVal
                    })
                })
            }
        }
    },
    methods: {
        selectGood(good, shop) {
            good.checked = !good.checked //状态切换
            shop.checked = shop.goodsList.every(item => {//判断是不是所有商品都是选中状态
                return item.checked
            })

        },
        selectShop(shop) {
            shop.checked = !shop.checked
            shop.goodsList.forEach(item => { //选中店铺 那么所哟商品也全部选中
                item.checked = shop.checked
            })
        },
        selectAll() {
            this.allSelect = !this.allSelect


        }

    }
})