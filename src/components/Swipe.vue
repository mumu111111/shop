<template>
 <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="list in lists">
          <a :href="list.url">
            <img :src="list.img">
          </a>
        </div>
        
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div> -->
    <!-- <div class="swiper-button-next"></div> -->
    
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
</div>
<!-- 导航等组件可以放在container之外 -->
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "swipe",
  props: ["lists"],
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new Swiper(".swiper-container", {
        // 循环模式选项
        // 如果需要分页器

        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }
  }
};
</script>
<style>
.swiper-slide img {
  min-width: 100%;
  min-height: 100%;
  display: block;
}
</style>

