<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-for="list in lists" :key="list.id" v-if="lists&&lists.length">
      <a class="block-item js-address-item address-item" :class="{'address-item-default':list.isDefault}" @click="toEdit(list)">
        <div class="address-title">{{list.username}} {{list.phone}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{path:'/address/form',query:{type:'add'}}" @click.native="toAdd">
        新增地址
      </router-link>
    </div>
  </div>
</template>
<script>
import Address from "js/addressService.js";
export default {
  // data() {
  //   return {
  //     lists: null
  //   };
  // },
  computed: {
    //获取全局状态  响应式渲染到页面
    lists() {
      console.log(this.$store);
      return this.$store.state.lists;
    }
  },
  created() {
    if (!this.lists) {
      this.$store.dispatch("getLists");
    }

    // axios.get(url.addressList).then(res => {
    //   this.lists = res.data.lists; //rap
    // });
  },
  methods: {
    toEdit(list) {
      this.$router.push({
        path: "/address/form",
        query: { type: "edit", instance: list }
      }); //?type=edit
    },
    toAdd() {}
  }
};
</script>
<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>


