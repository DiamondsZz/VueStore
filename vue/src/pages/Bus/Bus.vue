<template>
  <div class="bus">

    <mt-header title="购物车" class="bus-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"> </mt-button>
    </mt-header>

    <div  v-for="(shop,index) in shoplist"  :key="index">
    <ul class="bus-content">
      <li class="bus-content-btn">
        <img src="../../../static/img/my/check.png" alt="">
      </li>
      <li class="bus-content-shop"><img :src="shop.thumb_url" alt=""></li>
      <li class="bus-content-more">
        <span class="bus-content-more-title"> <img src="../../../static/img/shop/icon.png" alt="">{{shop.goods_name}}</span>
        <span class="bus-content-more-price">￥{{shop.price}}</span>
      </li>
    </ul>

    <ul class="bus-control">
      <li class="bus-control-decrease" @click="countDecrease(index)">-</li>
      <li class="bus-control-number">
        <input type="text" :value="shop.count" ref="input">
      </li>
      <li class="bus-control-increase" @click="countIncrease(index)">+</li>
      <li class="bus-control-delete" @click="countDelete(index)">删除</li>
    </ul>
    </div>

    <div class="bus-footer">
      <div class="bus-footer-checked">
        <img src="../../../static/img/my/check.png" alt="">
        <span>全选</span>
      </div>
      <span class="bus-footer-all">总计：￥777</span>
      <div class="bus-footer-buy">
        <mt-button type="danger" style="height: 100%;">立即结算</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "bus",
    data() {
      return {
        shoplist:this.$store.state.busshoplist //当前页面商品数据
      }
    },
    mounted(){
      console.log('localStorage.getItem:'+ localStorage.getItem('bus') );
    },
    methods: {
      //购物车增加功能
      countDecrease: function (index) {
        //当前页面的shoplist数据和购物车当中的busshoplist数据进行更新
        this.$store.state.busshoplist[index].count=this.$store.state.bus[index].count=--this.$refs.input[index].value;
        //边界值判定
        if (this.$refs.input[index].value < 0) {
          this.$store.state.busshoplist[index].count=this.$store.state.bus[index].count=this.$refs.input[index].value = 0;
          this.$toast({
            message: '不能再减啦！！！',
            position: 'middle',
            duration: 2000
          });
        }
        //本地缓存进行更新
        localStorage.setItem('bus',JSON.stringify(this.$store.state.bus));
        localStorage.setItem('busshoplist',JSON.stringify(this.$store.state.busshoplist));
      },
      //购物车减少功能
      countIncrease: function (index) {
        this.$store.state.busshoplist[index].count=this.$store.state.bus[index].count=++this.$refs.input[index].value;
        if (this.$refs.input[index].value > 20) {
          this.$store.state.busshoplist[index].count=this.$store.state.bus[index].count=this.$refs.input[index].value = 20;
          this.$toast({
            message: '该商品最多只能买20件',
            position: 'middle',
            duration: 2000
          });
        }
        localStorage.setItem('bus',JSON.stringify(this.$store.state.bus));
        localStorage.setItem('busshoplist',JSON.stringify(this.$store.state.busshoplist));
      },
      countDelete: function (index) {

      },
      //判断两个对象的值是否相等
      isEqual: function (obj1, obj2) {
        let keys = Object.keys(obj1);
        for (let key in obj1) {
          if (typeof obj1[key] !== 'object') {
            if (obj1[key] === obj2[key]) {
              if (key === keys[keys.length - 1]) return true;
              else continue
            }
            return false
          } else {
            return this.isEqual(obj1[key], obj2[key]);
          }
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
          //进入购物车路由之前 根据首页请求的商品数据homeshoplist的id和购物车数据vm.$store.state.bus中的id进行匹配
         // 将匹配一致的商品信息添加到 当前路由的shoplist中  遍历shoplist进行页面渲染
        vm.$store.state.homeshoplist.forEach((homeshop, index) => {

          if (vm.shoplist[0] === undefined) {
            vm.$store.state.bus.forEach((BusShop, index) => {
              if (homeshop.id === BusShop.shopId) {
                homeshop.count=BusShop.count;
                vm.shoplist.push(homeshop);
              }
            });
          } else
            {
              for(let BusShopIndex in vm.$store.state.bus)
              {
                if (homeshop.id === vm.$store.state.bus[BusShopIndex].shopId) {
                  for(let shopIndex in vm.shoplist)
                  {
                    if (vm.isEqual(homeshop, vm.shoplist[shopIndex]))
                    {
                      vm.shoplist[shopIndex].count=vm.$store.state.bus[BusShopIndex].count;
                      break;
                    }
                    else {
                      if ( parseInt(shopIndex) === vm.shoplist.length-1) {
                        homeshop.count=vm.$store.state.bus[BusShopIndex].count;
                        vm.shoplist.push(homeshop);
                      }
                    }
                  }
                }
              }
          }
        });
        //设置购物车busshoplist本地缓存
        localStorage.setItem('busshoplist',JSON.stringify(vm.shoplist));
        //console.log(vm.shoplist);
      });
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .bus
    width 100%
    height auto
    padding-top 50px
    padding-bottom 50px
    //background-color #8e65ff
    display flex
    flex-direction column
    .bus-header
      width 100%
      height 50px
      position fixed
      left 0
      top 0
    .bus-content
      height 120px
      //background-color gold
      display flex
      .bus-content-btn
        display flex
        align-items center
        img
          width 70%
          height 20%
          margin 0 10%
      .bus-content-shop
        width 20%
        height 100%
        display flex
        align-items center
        margin-right 2%
        img
          width 100%
          height 60%
      .bus-content-more
        width 70%
        height 100%
        font-size 14px
        display flex
        flex-direction column
        justify-content center
        .bus-content-more-title
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
        .bus-content-more-price
          color #e4393c
          font-size 10px
          font-weight 600
          margin-top 2%
    .bus-control
      width 40%
      margin-left 60%
      display flex
      .bus-control-number
        width 20%
        margin 0 10%
        input
          width 100%
          background-color #f7e4e1
          text-align center
          border none
          outline none
      .bus-control-delete
        margin-left 10%
        color #666
        font-size 10px
        line-height 18px
    .bus-footer
      width 100%
      height 50px
      position fixed
      left 0
      bottom 0
      background-color #fffae7
      display flex
      align-items center
      .bus-footer-checked
        height 100%
        display flex
        flex-direction column
        justify-content center
        margin 0 2%
        color #666
        font-size 12px
        img
          width 60%
          height 40%
          margin-bottom 10%
      .bus-footer-all
        margin-left 25%
        margin-right 5%
        color #e4393c
        font-size 18px
        font-weight 600
      .bus-footer-buy
        height 100%
</style>
