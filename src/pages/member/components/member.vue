<template>
   <div class="container " style="min-height: 581px;">
    <div class="content">
      <div class="user-infos">
        <div class="pull-left avatar">
          <div class="img" style="background-image: url(https://img.yzcdn.cn/upload_files/no_pic.png?imageView2/2/w/280/h/280/q/75/format/webp);"></div>
        </div>
        <div class="pull-left desc">
          <p>用户</p>
        </div>
      </div>
      <div class="order-related">
       
        <div class="block block-list list-vertical">
           <router-link class="block-item link clearfix ico-setting js-login" 
           to="/address"
            >
            <p class="title-info c-black font-size-14">收货地址管理</p>
          </router-link>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Member"
};
</script>
<style scoped>
@import "./member_base.css";
@import "./member.css";
</style>

