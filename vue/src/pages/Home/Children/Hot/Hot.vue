<template>
  <div class="hot">
    <HotCarousel/>
    <HotNav/>
    <div class="hot-ad"><img src="./../../imgs/hot_ad/home_ad.gif" alt="" width="100%"></div>
    <HotShopList/>
  </div>
</template>

<script>

  import HotNav from './HotNav'
  import HotShopList from './HotShopList'
  import HotCarousel from './HotCarousel'

  export default {
    name: "hot",
    components: {
      HotNav,
      HotShopList,
      HotCarousel
    },
    mounted() {
      this.$store.dispatch('reqHomeCarousel');
      this.$store.dispatch('reqHomeNav');
      this.$store.dispatch('reqHomeShopList');
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot
    height 2000px
    background-color whitesmoke
    .hot-ad
      margin-top 20px
      margin-bottom 20px
</style>
