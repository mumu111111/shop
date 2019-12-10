let url = {
    hot: '/index/hotLists',
    banner: '/index/bannerLists',
    detail: '/goods/detail',
    deal: '/goods/deal',
    addCart: '/cart/add',
    reduceCart: '/cart/reduce',
    cartList: '/cart/lists',
    removeCart: '/cart/remove',
    addressList: '/address/lists',
    updateAddress: '/address/updateAd',
    addAddress: '/address/addAd',
    removeAddress: '/address/removeAd',
    setDefault: '/address/setDefault',
}
let hosts = 'http://rap2api.taobao.org/app/mock/166022'
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = hosts + url[key]
    }
}

export default url