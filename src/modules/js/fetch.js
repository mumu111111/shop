import axios from 'axios'
function fetch(method='GET',url,data={}){
    return new Promise((resolve,reject)=> {
        let options = {method, url}
        if(method.toLowerCase() === 'get'){
            options.params = data
        }else{
            options.data = data
        }
        axios(options).then(res=> {
            let status = res.data.status
            console.log(status)
            // if(status === 200){
            //     resolve(res)
            // }
            // if(status > 300){
            //     location.href = "login.html"
            //     resolve(res)
            // }
            // reject(res)
            resolve(res)
        }).catch(error=> {
            reject(error)
        })
    })
}


export default fetch



























// import url from 'js/api.js'

// function fetch({method,url}){
//     return new Promise((resolve,reject)=>{
//         if(method.lowerCase ==='Post'){

//         }
//         axios.post(url, {data}).then(res=>{
//             if(res.status == 200){
//                 resolve(res.data)
//             }else{
//                 reject(res)
//             }
//         }).catch(error){
//             console.log(error)
//         }
//     })
// }