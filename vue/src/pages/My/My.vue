<template>
  <div class="my">

    <mt-header title="个人中心" class="my-person">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/" slot="right">
        <mt-button>关闭</mt-button>
      </router-link>
    </mt-header>

    <div class="my-user">
      <img src="./img/user.png" alt="">
      <span>diamondszz</span>
    </div>
    <div class="my-menu">
      <div class="my-menu-pay">
        <img src="./img/ready_pay.png" alt="">
        <span>待付款</span>
      </div>
      <div class="my-menu-get">
        <img src="./img/ready_get.png" alt="">
        <span>待收货</span>
      </div>
      <div class="my-menu-order">
        <img src="./img/order.png" alt="">
        <span>全部订单</span>
      </div>
      <div class="my-menu-address">
        <img src="./img/icon_my_address_v3.png" alt="">
        <span>收获地址</span>
      </div>
    </div>
    <div class="my-recommend">
     <div>精选推荐</div>
      <ShopList :shoplist="myshoplist"> </ShopList>
    </div>
    <tab-bar> </tab-bar>
  </div>
</template>

<script>
  import TabBar from './../../commponents/TabBar/TabBar'
  import ShopList from './../../commponents/ShopList/ShopList'
  export default {
    name: "My",
    components: {
      TabBar,
      ShopList
    },
    data(){
      return{
        myshoplist:null
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$store.state.login.username === null && vm.$store.state.login.password === null) {
          vm.$router.push('/login');
        }
        vm.$store.dispatch('reqMyShopList').then(()=>{
          vm.myshoplist=vm.$store.state.myshoplist;
        });

      })
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .my-person
    width 100%
  .my-user
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    height 100px
    background: linear-gradient(left, #0e97ff, #86faff);
    margin 4% 4% 0
    border-radius 10px
    box-shadow 0 2px 4px #259cb2
    img
      width 20%
      height 60%
      border-radius 50%

  .my-menu
    height 100px
    display flex
    align-items center
    //background-color antiquewhite
    margin-bottom 5%
    .my-menu-pay, .my-menu-get, .my-menu-order, .my-menu-address
      height 60px
      display flex
      flex 1
      flex-direction column
      justify-content space-around
      align-items center
      font-size 12px
      img
        width 25%
        height 30%
  .my-recommend div
     text-align center
     font-size 14px
     color #e02e24
</style>
