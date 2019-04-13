<template>
  <div class="shop-list">
    <div class="shop" v-for="(shop,index) in shoplist" :key="index">
      <div class="shop-img">
        <img  v-lazy="shop.thumb_url" alt="">
      </div>
      <div class="shop-inf">
        <div class="shop-title"><img src="./../../../static/img/home/shop_list/shop_item_icon1.png" alt=""><span>{{shop.goods_name}}</span></div>
        <div class="shop-price"><span class="shop-pri">￥{{shop.price/100}}</span><span class="shop-tip">{{shop.sales_tip}}</span> </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hot-shop-list",
    props:{
      shoplist:Array
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .shop
    display flex
    height 168px
    margin 10px 6px
    .shop-img
      flex 1
      margin 5px 8px
      img
        width 100%
        height 100%
    .shop-inf
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      .shop-title
        display flex
        justify-content space-between
        line-height 18px
        font-size 14px
        color #151516;
        img
          width 20%
          height 20%
          margin 5px
          vertical-align middle
        span
          display -webkit-box
          overflow hidden
          text-overflow ellipsis
          -webkit-line-clamp 2
          -webkit-box-orient vertical
      .shop-price
        display flex
        font-size 12px
        color #58595b
        margin-bottom 10px
        .shop-pri
          flex 1
          color #e02e24
          font-size 16px
          font-weight 700
          margin-right 5%
        .shop-tip
          flex 2
          text-align left

</style>
