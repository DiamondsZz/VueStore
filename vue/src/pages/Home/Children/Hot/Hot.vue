<template>
  <div class="hot" :style="touchPadding">
    <HotCarousel/>
    <HotNav/>
    <div class="hot-ad"><img src="./../../imgs/hot_ad/home_ad1.gif" alt="" width="100%"></div>
    <HotShopList/>
    <div class="shop-load" v-if="shopLoad">
      <img src="./../../imgs/load.gif" alt="">加载中.....
    </div>
  </div>
</template>

<script>
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'
  import HotCarousel from './HotCarousel'

  export default {
    name: "hot",
    data() {
      return {
        clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        paddingTop: 0,
        paddingBottom: 50,
        shopLoad:false,
        pageSize:1,
        count:10
      }
    },
    components: {
      HotNav,
      HotShopList,
      HotCarousel
    },
    mounted() {
      this.$store.dispatch('reqHomeCarousel');
      this.$store.dispatch('reqHomeNav');
      this.$store.dispatch('reqHomeShopList',{pageSize:this.pageSize,count:this.count});
      this.$el.addEventListener('touchmove', this.dragLoad, false);
      this.$el.addEventListener('touchend', this.dragStop, false);
    },
    computed: {
      touchPadding: function () {
        return {
          paddingTop: `${this.paddingTop}px`,
          paddingBottom: `${this.paddingBottom}px`
        }
      }
    },
    methods: {
      dragLoad: function () {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop <= this.clientHeight) {
          this.paddingBottom++;
          this.shopLoad=true;
        }
      },
      dragStop: function () {
        if (this.paddingBottom>50) {
            this.paddingBottom=50;
            this.shopLoad=false;
        }
        //console.log(document.documentElement.scrollHeight);
        //console.log(document.documentElement.scrollTop);
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop < this.clientHeight+2)
        {
          this.pageSize++;
          if(this.pageSize<15)
          {
              this.$store.dispatch('reqHomeShopList',{pageSize:this.pageSize,count:this.count});
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot
    background-color whitesmoke
    .hot-ad
      margin-top 20px
      margin-bottom 20px
    .shop-load
      display flex
      justify-content center
      align-items center
      img
        width 30%
        height 30%
</style>
