let url = {
    hot: 'hot/list'
}
let hosts = 'http://xxx.com'
for (let key in url) {
    if (url.hasOwnproperty(key)) {
        url[key] = hosts + url[key]
    }
}

export default url