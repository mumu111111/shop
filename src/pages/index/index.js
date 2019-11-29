import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

new Vue({
    el: '.container',
    data: {
        lists: null
    },
    created(){
        this.getLists()
    },
    methods:{
        getLists: function(){
            axios.post(url.hot).then(res => {
                this.lists = res.data.lists
            })
        }
    }

})