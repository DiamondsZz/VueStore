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
        //屏幕宽度
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
        // console.log(ev);
        this.start = ev.touches[0].pageX;
        //console.log(this.start);
      },
      handleTouchMove: function (ev) {
        let scrollMoveWidth =ev.touches[0].pageX - this.start;
        //console.log(scrollMoveWidth);
        this.moveWidth = -(scrollMoveWidth * (this.barWidth / this.scrollContentWidth)-this.end);

        //边界值检测
        if (this.moveWidth >=this.barWidth - this.barInnerWidth) {
          this.moveWidth = this.barWidth - this.barInnerWidth;
        } else if (this.moveWidth < 0) {
          this.moveWidth = 0;
        }
      },
      handleTouchEnd: function () {
        this.end = this.moveWidth;
      },
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "stylus/hotnav.styl"
</style>
