<template>
  <div class="my">
    <mt-header title="个人中心" class="my-person">
      <router-link :to="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/" slot="right">
        <mt-button>关闭</mt-button>
      </router-link>
    </mt-header>

    <router-view> </router-view>
    <tab-bar> </tab-bar>
  </div>
</template>

<script>
  import TabBar from './../../commponents/TabBar/TabBar'


  export default {
    name: "My",
    data(){
      return{
        back:'/',
      }
    },
    components: {
      TabBar,
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.back=from.path;
        if (vm.$store.state.login.username === null && vm.$store.state.login.password === null) {
          vm.$router.push('/login');
        }
      })
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .my
    height 100%
    padding-bottom 50px
    .my-person
      width 100%

</style>
