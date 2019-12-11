<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-for="list in lists" :key="list.id" v-if="lists&&lists.length">
      <a class="block-item js-address-item address-item" :class="{'address-item-default':list.isDefault}" @click="toEdit(list)">
        <div class="address-title">{{list.username}} {{list.phone}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <!-- <a class="address-edit">修改</a> -->
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
// import Address from "js/addressService.js";
export default {
  // data() {
  //   return {
  //     lists: null
  //   };
  // },
  computed: {
    //获取全局状态  响应式渲染到页面
    lists() {
      console.log("store", this.$store);
      console.log(1);

      return this.$store.state.lists;
    }
  },
  created() {
    if (!this.lists) {
      console.log(2);
      this.$store.dispatch("getLists");
    }

    // axios.get(url.addressList).then(res => {
    //   this.lists = res.data.lists; //rap
    // });
  },
  // watch: {
  //   lists: {
  //     //监听 一有数据变化 当变化通过传递 到vuex的state变化后  说明已经做完了增删改查操作  那么合适的时机可以做跳转返回all页面了
  //     //lists() 只能检测到最外层 里面的变化检测不到 所以用deep
  //     handler() {
  //       this.$router.go(-1);
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    toEdit(list) {
      console.log("当前地址id" + list.id);
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


