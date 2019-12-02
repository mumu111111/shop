let url = {
    hot: '/index/hotLists',
    banner: '/index/bannerLists',
    detail: '/goods/detail'
}
let hosts = 'http://rap2api.taobao.org/app/mock/166022'
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = hosts + url[key]
    }
}

export default url