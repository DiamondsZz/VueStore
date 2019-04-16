<template>
  <div class="buy">

    <mt-header title="确认订单" class="buy-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"> </mt-button>
    </mt-header>

    <BusShop :busshoplist="shopBuy"/>

    <div class="bus-shop--buy">
      <mt-button type="danger" style="width: 100%;height:30px;">立即支付</mt-button>
    </div>

  </div>
</template>

<script>
  import BusShop from './../../commponents/BusShop/BusShop'

  export default {
    name: "buy",
    data() {
      return {
      }
    },
    components: {
      BusShop
    },
    computed:{
      shopBuy:function(){
        let arrShop=[];
        this.$store.state.busshoplist.forEach((value,index)=>{
          if(value.checked===true)
          {
            arrShop.push(value);
          }
        });
        return arrShop;
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .buy
    padding-top 50px

  .buy-header
    width 100%
    height 50px
    position fixed
    left 0
    top 0

  .bus-shop--buy
    width 100%
    margin 5% 0

</style>
