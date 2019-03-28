<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel) in homecarousel" >
        <img :src="carousel.src" alt="" width="100%">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {
    mapState
  } from 'vuex'

  export default {
    name: "hot-carousel",
    computed: {
      ...mapState(['homecarousel'])
    },
    watch: {
      homecarousel() {
        this.$nextTick(()=>{
          new Swiper('.swiper-container', {
            autoplay: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          })
        });
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
