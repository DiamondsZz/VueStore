<template>
  <div class="hot-nav">
    <!--滚动区域-->
    <div class="hot-nav-content">
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
        barWidth: 100,
        //滚动条宽度
        barInnerWidth: 0,
        //滚动内容宽度
        scrollContentWidth: 720,
        //滚动条开始的距离
        start: 0,
        //滚动条结束的距离
        end: 0,
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
        this.barInnerWidth =this.barWidth * (this.screenWidth / this.scrollContentWidth);
        //console.log(this.barInnerWidth);
      },
      bindEvent: function () {
        //console.log(this);
        this.$el.addEventListener('touchstart', this.handleTouchStart, false);
        this.$el.addEventListener('touchmove', this.handleTouchMove, false);
        this.$el.addEventListener('touchend', this.handleTouchEnd, false);
      },
      handleTouchStart: function (ev) {
         //console.log(ev);
        this.start = ev.touches[0].pageX;
        //console.log(ev.touches[0]);
        //console.log(this.start);
      },
      handleTouchMove: function (ev) {
        let scrollMoveWidth =ev.touches[0].pageX - this.start;
        //console.log(scrollMoveWidth);
        this.moveWidth = -(scrollMoveWidth * (this.barWidth / this.scrollContentWidth)-this.end);
       //console.log(this.moveWidth);
        //边界值检测
        if (this.moveWidth >=this.barWidth - this.barInnerWidth) {
          this.moveWidth = this.barWidth - this.barInnerWidth;
        } else if (this.moveWidth < 0) {
          this.moveWidth = 0;
        }

      },
      handleTouchEnd: function () {
        this.end = this.moveWidth;  //记录上一次移动的距离
        //console.log('end:'+this.end);
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
        width 720px
        height 180px
        display flex
        flex-wrap wrap
        .inner-item
          width 90px
          height 90px
          display flex
          flex-direction column
          justify-content center
          align-items center
          font-size 14px
          color #666666
          img
            width 40%
            margin-bottom 5px
    .hot-nav-content::-webkit-scrollbar
      display none
    .hot-nav-bottom
      width 100px
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
