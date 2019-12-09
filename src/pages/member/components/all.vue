<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block"
    v-for="list in lists"> 
    <!-- list必须带cityvalue等 好传递给form -->
      <a class="block-item js-address-item address-item " :class="{'address-item-default': list.isDefault}"
        @clic="toEdit(list)">
        <div class="address-title">{{list.username}} {{list.phone}}13112345678</div>
        <p>广东省{{list.provinceName}}珠海市{{list.cityName}}香洲区{{list.districtName}}南方软件园{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
      
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
      :to="{path: '/address/form', query: {type: 'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "js/api.js";
export default {
  data() {
    return {
      lists: null
    };
  },
  created() {
    //?
    axios.get(url.addressList).then(res => {
      this.lists = res.data.lists; //rap
    });
  },
  methods: {
    toEdit(list) {
      this.$router.push({
        path: "/form",
        query: { type: edit, instance: list }
      }); //?type=edit
    }
  }
};
</script>
<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>


