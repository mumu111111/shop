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
        total: 0,
        arr: [],
        // editing: false 这里自定义的data 不能控制遍历数据内的情况 所以必须在数组内定义

    },
    created() {
        axios.get(url.cartList).then(res => {

            // this.cartlist = res.data.lists
            // this.goodsList = res.data.lists.goodsList
            res.data.lists.forEach((shop) => {
                shop.checked = false
                shop.editing = false
                shop.shopMessage = '编辑'
                console.log('goods' + shop.goodsList)
                shop.goodsList.forEach((good) => {
                    console.log('good' + good)
                    good.checked = false
                    good.editing = false

                })
            })
            this.cartlist = res.data.lists
            console.log('cartlist' + this.cartlist)
            console.log(1)


        })
    },
    computed: {
        allSelect: {
            get() {//获取现在全选框的状态  全选状态取决于店铺是否被选中
                if (this.cartlist && this.cartlist.length) {//以来的data必须存在
                    return this.cartlist.every(item => {
                        return item.checked
                    })
                }
                return false
            },
            set(newVal) {//重置状态 根据全选改变 改变商品选择
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
        },
        selectList() { //只有get()写法 根据商品checked 变化 而变化总价和结算的商品数量
            if (this.cartlist && this.cartlist.length) { //不要忘记判断是否存在依赖data
                let arr = []
                let total = 0
                this.cartlist.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {

                            arr.push(good)
                            total += good.price * good.num //this.total放进去 计算有问题  重新定义一个变量计算
                        }
                    })

                })
                this.total = total
                return arr //选中商品的商品列表 可查看看其长度
            }

            return []

        }
    },
    methods: {
        selectGood(good, shop) {
            good.checked = !good.checked //状态切换
            shop.checked = shop.goodsList.every(item => {//判断是不是所有商品都是选中状态

                return item.checked

                console.log('total' + this.total)

            })

        },
        selectShop(shop) {
            shop.checked = !shop.checked
            shop.goodsList.forEach(item => { //选中店铺 那么所哟商品也全部选中
                item.checked = shop.checked
            })
        },
        selectAll() {//全选
            this.allSelect = !this.allSelect
        },
        edit(shop, shopIndex) {
            //编辑时，切换店铺的状态 和 message
            //放置位置有错 这两句不用再循环时声明
            shop.editing = !shop.editing
            shop.shopMessage = shop.editing ? '完成' : '编辑'

            this.cartlist.forEach((item, i) => {

                if (i === shopIndex) {
                    //当前shop是要编辑的店铺 只能一次编辑一个
                    item.editing = true

                } else {
                    item.editing = false
                    item.shopMessage = shop.editing ? '' : '编辑' //item表示当前店铺 不要写成shop  当编辑店铺外的其他商铺 在 编辑状态下的 显示状态
                }
            })
        },
        add(good, shop) {//请求修改后台数据库num值
            axios.post(url.addCart, {
                id: good.id,
                number: 1
            }).then(res => {
                if (res.status === 200) {
                    good.num++
                }
            })
        },
        reduce(good, shop) {
            axios.post(url.reduceCart, {
                id: good.id,
                number: 1
            }).then(res => {
                if (res.status === 200) { //判断请求成功后 才能处理本地数据
                    good.num--
                }
            })
        }

    }
})