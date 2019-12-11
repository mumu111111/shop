<template>
   <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form" >
        <input class="js-id" name="id" type="hidden" value="69150287">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" value="tony" v-model="username" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" value="13112345678" v-model="phone" maxlength="11">
        </div>
        <div class="block-item" >
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="p.value" v-for="p in addressData.list">{{p.label}}</option>
            
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="c.value" v-for="c in cityList">{{c.label}}</option>
            
            </select>
            <select class="js-county-selector" name="area_code" v-model="districtValue"  data-code="440402">
              <option value="-1">选择地区</option>
              <option :value="d.value" v-for="d in districtList">{{d.label}}</option>
              
              <!-- <option value="440402">香洲区</option> -->
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" value="南方软件园" v-model="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add()">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="type==='edit'" @click="remove()">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type==='edit'" @click="setDefault()">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Address from "js/addressService.js";
import Ad from "js/address.json";
export default {
  data() {
    return {
      id: "",
      type: "",
      instance: null,
      username: "",
      phone: "",
      provinceName: "",
      provinceValue: -1,
      cityName: "",
      cityValue: -1,
      districtName: "",
      districtValue: -1,
      address: "",
      isDefault: false,
      addressData: Ad,
      cityList: null,
      districtList: null
    };
  },
  computed: {
    ...mapState({
      lists: state => state.lists
    })
  },
  //为什么有两次赋值province  在两个按钮同时能跳转到form.vue  <共用>保存按钮 需要判断当前是修改还是新增
  //还有当省市区变动时 也要看一下是谁在改变他 因为 有两种形式可以变动他

  created() {
    let x = this.$route.query;
    this.type = x.type;
    this.instance = x.instance;

    if (this.type === "edit") {
      //修改状态 获取传过来的省市区 显示出来
      //编辑当前地址
      let ad = this.instance;
      this.id = ad.id;
      this.username = ad.username;
      this.phone = ad.phone;

      this.provinceName = ad.provinceName;
      this.provinceValue = parseInt(ad.provinceValue);
      this.cityName = ad.cityName;
      this.cityValue = ad.cityValue;
      this.districtName = ad.districtName;
      this.districtValue = ad.districtValue;
      this.address = ad.address;
      this.isDefault = ad.isDefault;
    }
    if (this.type === "add") {
      //没有相关地址 写入新的地址
      //需要清空输入框吗
    }
  },
  watch: {
    lists: {
      handler() {
        this.$router.go(-1);
      },
      deep: true
    },
    //监听省变化 市变化
    provinceValue(val) {
      //找到val 下标  对应的citylist
      if (val === -1) return;
      let index = this.addressData.list.findIndex(item => {
        return item.value === val;
      });
      this.cityList = this.addressData.list[index].children;
      this.cityValue = -1;
      this.districtValue = -1; //还原选中不同省份时 后面的市区都还原
      if (this.type == "edit") {
        this.cityValue = this.instance.cityValue;
      }
    },
    cityValue(val) {
      //city值变化 区也跟着变化
      if (val === -1) return; //有例外

      let index = this.cityList.findIndex(item => {
        return item.value === val;
      });
      this.districtList = this.cityList[index].children;
      this.districtValue = -1; //还原选中不同省份时 后面的市区都还原
      if (this.type == "edit") {
        this.districtValue = this.instance.districtValue;
      }
    }
  },
  methods: {
    add() {
      //取不到数据
      let {
        username,
        phone,
        provinceValue,
        cityValue,
        districtValue,
        provinceName,
        cityName,
        districtName,
        address
      } = this;
      //name = this.name
      let data = {
        username,
        phone,
        provinceValue,
        cityValue,
        districtValue,
        provinceName,
        cityName,
        districtName,
        address
      };
      //data.name = this.name   把data作为异步上传数据的data

      if (this.type === "edit") {
        //修改需要整个list
        data.id = this.id;
        data.isDefault = this.isDefault;
        console.log("修改保存data" + data);
        console.dir(data);
        this.$store.dispatch("updateAddress", data);
        // Address.add(data).then(res => {
        //   this.$router.go(-1);
        // });

        // axios.post(url.updateAddress, { data }).then(res => {
        //   this.$router.go(-1); //回到all页面 有刷新一遍 获取后台最新列表
        // });
      }
      if (this.type === "add") {
        console.log("新增data" + data);
        console.dir(data);
        this.$store.dispatch("addAddress", data);
        // Address.update(data).then(res => {
        //   this.$router.go(-1); //回到all页面 有刷新一遍 获取后台最新列表
        // });
        //  axios.post(url.addAddress, { data }).then(res => {
        //     this.$router.go(-1); //回到all页面 有刷新一遍 获取后台最新列表
        //   });
      }
    },
    remove() {
      if (window.confirm("确定删除吗")) {
        this.$store.dispatch("removeAddress", this.id);

        // Address.remove(this.id).then(res => {
        //   this.$router.go(-1); //回到all页面 有刷新一遍 获取后台最新列表
        // });
        // axios.post(url.removeAddress, { id: this.id }).then(res => {
        //   this.$router.go(-1); //回到all页面 有刷新一遍 获取后台最新列表
        // });
      }
    },
    setDefault() {
      this.$store.dispatch("setDefaultAddress", this.id);
      // Address.setDefault(this.id).then(res => {
      //   this.$router.go(-1); //回到all页面 有刷新一遍 获取后台最新列表
      // });
      // axios.post(url.setDefault, { id: this.id }).then(res => {
      //   this.$router.go(-1); //回到all页面 有刷新一遍 获取后台最新列表
      // });
    }
  }
};
</script>
<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>