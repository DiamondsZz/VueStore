<template>
  <div class="hot-nav">
    <!--滚动区域-->
    <div class="hot-nav-content" ref="nav">
      <div class="nav-content-inner" v-if="homenav.length>0">
        <a class="inner-item" v-for="(item) in homenav">
          <img :src="item.iconurl" alt="">
          <span>{{item.icontitle}}</span>
        </a>
      </div>
    </div>
    <!--进度条-->
    <div class="hot-nav-bottom">
      <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
    </div>
  </div>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "hot-nav",
    data() {
      return {
        //屏幕宽度  window.innerWidth(ie8及以下不支持)
        screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        //滚动条总宽度
        barWidth: 0,
        //滚动条宽度
        barInnerWidth: 0,
        //滚动内容宽度
        scrollContentWidth: 0,
        //滚动条移动的距离
        moveWidth: 0,
      }
    },
    computed: {
      innerBarStyle: function () {
        return {
          width: `${this.barInnerWidth}px`,
          left: `${this.moveWidth}px`,
        }
      },
      ...mapState(['homenav']),
    },
    mounted() {
      this.getInnerBarWidth();
      this.bindEvent();
    },
    methods: {
      getInnerBarWidth: function () {
        this.barWidth = this.screenWidth / 3;
        this.scrollContentWidth = this.screenWidth * 2;
        this.barInnerWidth = this.barWidth * (this.screenWidth / this.scrollContentWidth);
        //console.log(this.barInnerWidth);
      },
      bindEvent: function () {
        //console.log(this);
        this.$el.addEventListener('touchmove', this.handleTouchMove, false);
      },
      handleTouchMove: function (ev) {
        this.moveWidth=( (this.barWidth - this.barInnerWidth)*this.$refs.nav.scrollLeft/this.screenWidth);
        console.log(this.moveWidth);

      },
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot-nav
    width 100%
    height 180px
    position relative
    background-color #fff
    padding-bottom 10px
    .hot-nav-content
      width 100%
      overflow-x scroll
      .nav-content-inner
        width 200%
        height 180px
        display flex
        flex-wrap wrap
        .inner-item
          width 12%
          height 50%
          margin-right 3px
          display flex
          flex-direction column
          justify-content center
          align-items center
          font-size .14rem
          color #666666
          img
            width 40%
            margin-bottom 5px
    .hot-nav-content::-webkit-scrollbar
      //display none
    .hot-nav-bottom
      width 33%
      height 2px
      background-color #ccc
      position absolute
      left 50%
      margin-left -50px
      bottom 8px
      .hot-nav-bottom-inner
        position absolute
        left 0
        height 100%
        background-color orangered
        width 0

</style>
