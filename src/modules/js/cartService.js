import fetch from 'js/fetch.js';
import url from 'js/api.js';

class Cart{
    static add(id){//数量加1
        return fetch('POST',url.addCart,{
            id:id,
            number: 1
        })
    }
    static reduce(id){
        return fetch('POST',url.reduceCart,{
            id,
            number: 1
        })
    }
    static remove(arr){
        let ids = []
        arr.forEach(good=> {
            ids.push(good)
        })
        return fetch('POST', url.removeCart, {
            ids
        })
    }
}

export default Cart