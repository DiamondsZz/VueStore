<template>
  <div class="person">
    <div class="person-user">
      <img src="../../../../static/img/my/user.png" alt="" @click="set">
      <span>{{this.$store.state.user.name}}</span>
    </div>
    <div class="person-menu">
      <div class="person-menu-pay">
        <img src="../../../../static/img/my/ready_pay.png" alt="">
        <span>待付款</span>
      </div>
      <div class="person-menu-get">
        <img src="../../../../static/img/my/ready_get.png" alt="">
        <span>待收货</span>
      </div>
      <div class="person-menu-order">
        <img src="../../../../static/img/my/order.png" alt="">
        <span>全部订单</span>
      </div>
      <div class="person-menu-address" @click="getGoods">
        <img src="../../../../static/img/my/icon_my_address_v3.png" alt="">
        <span>收货地址</span>
      </div>
    </div>
    <div class="person-recommend">
      <div>精选推荐</div>
      <ShopList :shoplist="myshoplist"> </ShopList>
    </div>
  </div>
</template>

<script>

  import ShopList from './../../../commponents/ShopList/ShopList'

  import goodslist from './../../../mock/shoplist'

  export default {
    name: "person",
    components: {
      ShopList
    },
    data() {
      return {
        myshoplist: null
      }
    },
    methods:{
      set:function(){

        this.$router.push('/my/set')
      },
      getGoods:function(){

        this.$router.push('/my/getgoods')
      }
    },
    beforeRouteEnter(to, from, next) {

      next(vm => {

        if(vm.$store.state.login.username !== null && vm.$store.state.login.password !== null)
        {
        vm.$store.dispatch('get',{username: vm.$store.state.login.username,password: vm.$store.state.login.password}).then(() => {

          sessionStorage.setItem('user', JSON.stringify( vm.$store.state.user));

        });
        }

          vm.myshoplist = goodslist;
        /*vm.$store.dispatch('reqMyShopList').then(() => {
          vm.myshoplist=vm.$store.state.myshoplist;
        });*/

      })
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .person-user
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
    span
      font-size 14px
      color: #fff
  .person-menu
    height 100px
    display flex
    align-items center
    //background-color antiquewhite
    margin-bottom 5%
    .person-menu-pay, .person-menu-get, .person-menu-order, .person-menu-address
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
  .person-recommend div
    text-align center
    font-size 14px
    color #e02e24
</style>
