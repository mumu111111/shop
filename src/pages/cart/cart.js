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
        total: 0,//价格
        // arr: [], //所选商品列表
        // editing: false 这里自定义的data 不能控制遍历数据内的情况 所以必须在数组内定义
        editingShop: null,//在编辑的商铺
        editingShopIndex: -1,//编辑中的商铺下标
        // goodData: null //存放选中
        removePopup: false
    },
    created() {
        axios.get(url.cartList).then(res => {

            // this.cartlist = res.data.lists
            // this.goodsList = res.data.lists.goodsList
            res.data.lists.forEach((shop) => {
                shop.checked = false
                shop.removeChecked = false
                shop.editing = false
                shop.shopMessage = '编辑'
                console.log('goods' + shop.goodsList)
                shop.goodsList.forEach((good) => {
                    console.log('good' + good)
                    good.checked = false
                    good.removeChecked = false
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
        removeAllSelect: {
            //这个地方拿不到shop good  只能自定义editingShop 来知道编辑时是哪个shop 再拿来使用
            get() { //获取当前全选状态
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                this.editingShop.removeChecked = newVal
                this.editingShop.goodsList.forEach(good => {

                    good.removeChecked = newVal
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

        },
        removeList() {//实时监测选中商品的个数
            if (this.editingShop) {
                let arr = []
                this.editingShop.goodsList.forEach(good => {

                    if (good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr

            }
            return []
        }
    },
    methods: {
        selectGood(shop, shopIndex, good, goodIndex) {
            this.goodData = { shop, shopIndex, good, goodIndex }//{good: xx,shop: uu}
            if (this.editingShop) {
                good.removeChecked = !good.removeChecked //编辑状态
                shop.removeChecked = shop.goodsList.every(item => {
                    return item.removeChecked
                })
            } else {
                good.checked = !good.checked //正常状态 
                shop.checked = shop.goodsList.every(item => {
                    return item.checked
                })
            }

        },
        selectShop(shop) {
            if (this.editingShop) {
                shop.removeChecked = !shop.removeChecked //编辑状态
                shop.goodsList.forEach(item => { //选中店铺 那么所哟商品也全部选中
                    item.removeChecked = shop.removeChecked
                })
            } else {
                shop.checked = !shop.checked //正常状态 
                shop.goodsList.forEach(item => { //选中店铺 那么所哟商品也全部选中
                    item.checked = shop.checked
                })
            }

            // shop.checked = !shop.checked
            // shop.goodsList.forEach(item => { //选中店铺 那么所哟商品也全部选中
            //     item.checked = shop.checked
            // })
        },
        selectAll() {//全选
            if (this.editingShop) {//存在编辑的商铺 所以是编辑下的状态改变
                this.removeAllSelect = !this.removeAllSelect
            } else {
                this.allSelect = !this.allSelect
            }
        },
        edit(shop, shopIndex) {
            // var { shop, shopIndex, good, goodIndex } = this.editShop
            //编辑时，切换店铺的状态 和 message
            //放置位置有错 这两句不用再循环时声明
            shop.editing = !shop.editing
            shop.shopMessage = shop.editing ? '完成' : '编辑'
            // if(shop.editing){
            //     this.editiongShop = true
            // }else{
            //     this.editiongShop = false
            // } 2种写法
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
            this.cartlist.forEach((item, i) => {
                if (shopIndex !== i) {
                    item.editing = false
                    item.shopMessage = shop.editing ? '' : '编辑' //item表示当前店铺 不要写成shop  当编辑店铺外的其他商铺 在 编辑状态下的 显示状态
                }
                // 更简洁代码
                // if (i === shopIndex) {
                //     //当前shop是要编辑的店铺 只能一次编辑一个
                //     item.editing = true

                // } else {
                //     item.editing = false
                //     item.shopMessage = shop.editing ? '' : '编辑' //item表示当前店铺 不要写成shop  当编辑店铺外的其他商铺 在 编辑状态下的 显示状态
                // }
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
        },
        removeGood() {//????修改后台数据

            this.removePopup = true //弹出框自定义全局data 因为在全局
            this.removeMsg = `确定要删除这${this.removeList.length}个商品吗`


            // this.removeList.forEach(good => {
            //     axios.post(url, {
            //         id: good.id,

            //     })
            // })
        },
        removeCancel() {

        },
        removeConfirm() {
            this.removeList.forEach(good => {
                axios.post(url, {
                    id: good.id

                }).then(res => {
                    if (res.data.status === 200) {
                        this.editingShop.splice(shopIndex, 1)
                    }
                })
            })

        }

    }
})