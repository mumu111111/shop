let url = {
    hot: '/index/hotLists',
    banner: '/index/bannerLists',
    detail: '/goods/detail',
    deal: '/goods/deal',
    addCart: '/cart/add',
    reduceCart: '/cart/reduce',
    cartList: '/cart/lists',
    removeCart: '/cart/remove'
}
let hosts = 'http://rap2api.taobao.org/app/mock/166022'
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = hosts + url[key]
    }
}

export default url