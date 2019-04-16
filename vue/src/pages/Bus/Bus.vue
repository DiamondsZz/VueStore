<template>
  <div class="bus">

    <mt-header title="购物车" class="bus-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"> </mt-button>
    </mt-header>

    <div  v-for="(shop,index) in $store.state.busshoplist"  :key="index">
    <ul class="bus-content">
      <li class="bus-content-btn" @click="shopChecked(shop,index)">
        <img :src="shop.checked===true?isChecked.is:isChecked.not" alt="">
      </li>
      <li class="bus-content-shop"><img :src="shop.thumb_url" alt=""></li>
      <li class="bus-content-more">
        <span class="bus-content-more-title"> <img src="../../../static/img/shop/icon.png" alt="">{{shop.goods_name}}</span>
        <span class="bus-content-more-price">￥{{shop.price*shop.count}}</span>
      </li>
    </ul>

    <ul class="bus-control">
      <li class="bus-control-decrease" @click="countDecrease(index)">-</li>
      <li class="bus-control-number">
        <input type="text" v-model="shop.count" ref="input" @change="countChange(index)">
      </li>
      <li class="bus-control-increase" @click="countIncrease(index)">+</li>
      <li class="bus-control-delete" @click="countDelete(index)">删除</li>
    </ul>
    </div>

    <div class="bus-footer">
      <div class="bus-footer-checked" @click="checkAll">
        <img :src="checkedAll.checked===true?checkedAll.is:checkedAll.not" alt="">
        <span>全选</span>
      </div>
      <span class="bus-footer-all">总计：￥{{total}}</span>
      <div class="bus-footer-buy" @click="buyNow">
        <mt-button type="danger" style="height: 100%;">立即结算</mt-button>
      </div>
    </div>

  </div>
</template>

<script>


  import {BUS_SHOPLIST} from './../../store/mutation-types'

  export default {
    name: "bus",
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
    computed:{
      total:function(){
        let total=0;
        this.$store.state.busshoplist.forEach((value,index)=>{
             if(value.checked===true)
             {
               total=total+value.count*value.price;
             }
        });
        return total;
      }
    },
    watch:{

    },
    methods: {


      //支付页面跳转
      buyNow:function(){
        this.$router.push('/buy');
      },

      //count改变触发
      countChange:function(index){

          if(this.$store.state.busshoplist[index].count>20)
          {
            this.$store.state.bus[index].count=this.$store.state.busshoplist[index].count=20;
            this.$toast({
              message: '亲，该商品最多买20件哦',
              position: 'middle',
              duration: 2000
            });
          }else if(this.$store.state.busshoplist[index].count<0)
          {
            this.$store.state.bus[index].count=this.$store.state.busshoplist[index].count=0;
          }else{
            this.$store.state.bus[index].count=this.$store.state.busshoplist[index].count;
          }
        localStorage.setItem('bus',JSON.stringify(this.$store.state.bus));
        localStorage.setItem('busshoplist',JSON.stringify(this.$store.state.busshoplist));
      },
      //商品选中功能
      shopChecked:function(shop,index){
        shop.checked=!shop.checked;
        this.$store.commit(BUS_SHOPLIST,{homeshop:null,shop:shop,index:index});
      },
      //全选
      checkAll:function(){
        this.checkedAll.checked=!this.checkedAll.checked;
        if(this.checkedAll.checked===true)
        {
          this.$store.state.busshoplist.forEach((value,index)=>{
            value.checked=true;
          });
        }else{
          this.$store.state.busshoplist.forEach((value,index)=>{
            value.checked=false;
          });
        }
      },

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
      //商品删除
      countDelete: function (index) {

        this.$messagebox.confirm('亲，确定要删除吗？').then(() => {
          this.$store.state.busshoplist.splice(index,1);
          this.$store.state.bus.splice(index,1);
          localStorage.setItem('bus',JSON.stringify(this.$store.state.bus));
          localStorage.setItem('busshoplist',JSON.stringify(this.$store.state.busshoplist));
        }).catch(()=>{
          console.log('11');
        });

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

          if (vm.$store.state.busshoplist[0] === undefined) {
            vm.$store.state.bus.forEach((BusShop, index) => {
              if (homeshop.id === BusShop.shopId) {
                //vm.$set(homeshop,'count',BusShop.count);
                //vm.$set(homeshop,'checked',false);
                homeshop=Object.assign({},homeshop,{count:BusShop.count,checked:false});
                vm.$store.commit(BUS_SHOPLIST,{homeshop:homeshop,shop:null,index:null})
              }
            });
          } else
            {
              for(let BusShopIndex in vm.$store.state.bus)
              {
                if (homeshop.id === vm.$store.state.bus[BusShopIndex].shopId) {
                  for(let shopIndex in  vm.$store.state.busshoplist)
                  {
                    if (vm.isEqual(homeshop, vm.$store.state.busshoplist[shopIndex]))
                    {
                      vm.$store.state.busshoplist[shopIndex].count=vm.$store.state.bus[BusShopIndex].count;

                      localStorage.setItem('busshoplist',JSON.stringify(vm.$store.state.busshoplist));
                      break;
                    }
                    else {
                      if ( parseInt(shopIndex) === vm.$store.state.busshoplist.length-1) {
                        //vm.$set(homeshop,'count',vm.$store.state.bus[BusShopIndex].count);
                        //vm.$set(homeshop,'checked',false);
                        homeshop=Object.assign({},homeshop,{count:vm.$store.state.bus[BusShopIndex].count,checked:false});
                        vm.$store.commit(BUS_SHOPLIST,{homeshop:homeshop,shop:null,index:null})
                      }
                    }
                  }
                }
              }
          }
        });
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
      justify-content space-between
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
        display inline-block
        width 50%
        color #e4393c
        font-size 18px
        font-weight 600
      .bus-footer-buy
        height 100%
</style>
