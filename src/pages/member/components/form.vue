<template>
   <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form" >
        <input class="js-id" name="id" type="hidden" value="69150287">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" value="tony" v-model="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" value="13112345678" v-model="phone" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option v-for="p in addressData.list" :value="p.value">{{p.label}}</option>
            
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option value="440100">广州市</option>
            
            </select>
            <select class="js-county-selector" name="area_code" v-model="districtValue"  data-code="440402">
              <option value="-1">选择地区</option>
              <option value="440402">香洲区</option>
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
    <div class="block stick-bottom-row center js-save-default" v-show="type==='edit'" @click="isDefault = true">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      type: "",
      instance: null,
      name: "",
      phone: "",
      province: "",
      provinceValue: -1,
      city: "",
      cityValue: -1,
      districtName: "",
      districtValue: -1,
      address: "",
      isDefault: false,
      addressData: import("js/address.json"),
      cartList: null
    };
  },
  created() {
    let x = this.$route.query;
    this.type = x.type;
    this.instance = x.instance;

    if (this.type === "edit") {
      //编辑当前地址
      let ad = this.instance;
      this.name = ad.name;
      this.phone = ad.phone;

      this.provinceName = ad.provinceName;
      this.provinceValue = parseInt(ad.provinceValue);
      this.cityName = ad.cityName;
      this.cityValue = parseInt(ad.cityValue);
      this.districtName = ad.cityName;
      this.districtValue = parseInt(ad.districtValue);
      this.address = ad.address;
    }
    if (this.type === "add") {
      //没有相关地址 写入新的地址
      //需要清空输入框吗
    }
  },
  watch: {
    //监听省变化 市变化
    provinceValue(val) {
      //找到val 下标  对应的citylist
      if (val === -1) return;
      let index = this.addressData.list.findIndex(item => {
        return item.value === val;
      });
      this.cartList = this.addressData.list[index].children;
    },
    cityValue(val) {
      //city值变化 区也跟着变化
      if (val === -1) return; //有例外

      let index = this.cartList.findIndex(item => {
        return item.value === val;
      });
      this.districtList = this.cartList[index].children;
    }
  },
  methods: {
    add() {
      //取不到数据
      let {
        name,
        phone,
        provinceValue,
        cityValue,
        districtValue,
        address
      } = this;
      //name = this.name
      let data = {
        name,
        phone,
        provinceValue,
        cityValue,
        districtValue,
        address
      };
      //data.name = this.name   把data作为异步上传数据的data

      if (this.type === "edit") {
        //修改需要整个list
        data.id = this.id;
        axios.post(url.updateAddress, { data }).then(res => {
          go(-1); //回到all页面 有刷新一遍 获取后台最新列表
        });
      }
      if (this.type === "add") {
        data.id = this.id;
        axios.post(url.addAddress, { data }).then(res => {
          go(-1); //回到all页面 有刷新一遍 获取后台最新列表
        });
      }
    },
    remove() {
      if (window.confirm("确定删除吗")) {
        axios.post(url.deleteAd, { id: this.id }).then(res => {
          go(-1);
        });
      }
    },
    setDefault() {
      axios.post(url.setDefault, { id: this.id }).then(res => {
        go(-1);
      });
    }
  }
};
</script>
<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>