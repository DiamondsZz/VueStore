<template>
    <div class="bus-shop">
      <div  v-for="(shop,index) in busshoplist"  :key="index">
        <ul class="bus-shop-content">
          <li class="bus-shop-content-shop"><img :src="shop.thumb_url" alt=""></li>
          <li class="bus-shop-content-more">
            <span class="bus-shop-content-more-title"> <img src="../../../static/img/shop/icon.png" alt="">{{shop.goods_name}}</span>
            <span class="bus-shop-content-more-price">￥{{shop.price*shop.count}}</span>
            <span class="bus-shop-content-more-count">数量：{{shop.count}}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "bus-shop",
        data() {
          return {
            isChecked:{
              is:require('./../../../static/img/my/checked.png'),
              not:require('./../../../static/img/my/check.png')
            },
            checkedAll:{
              checked:false,
              is:require('./../../../static/img/my/checked.png'),
              not:require('./../../../static/img/my/check.png')
            }
          }
        },
      props:{
        busshoplist:{
          type:Array
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .bus-shop
    width 100%
    height auto
    //background-color #8e65ff
    display flex
    flex-direction column
    .bus-shop-header
      width 100%
      height 50px
      position fixed
      left 0
      top 0
    .bus-shop-content
      height 120px
      //background-color gold
      display flex
      margin 0 4%
      .bus-shop-content-shop
        width 20%
        height 100%
        display flex
        align-items center
        margin-right 2%
        img
          width 100%
          height 60%
      .bus-shop-content-more
        width 70%
        height 100%
        font-size 14px
        display flex
        flex-direction column
        justify-content center
        .bus-shop-content-more-title
          display -webkit-box
          text-overflow ellipsis
          overflow hidden
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          line-height 16px
          img
            width 22%
            height 15%
            margin 0 2%
        .bus-shop-content-more-price
          color #e4393c
          font-size 10px
          font-weight 600
          margin-top 2%
        .bus-shop-content-more-count
          margin-top  4%
          color #b08eff
</style>
