<template>
  <div class="chat">
    chat
    <tab-bar> </tab-bar>
  </div>
</template>

<script>
  import  TabBar from './../../commponents/TabBar/TabBar'
  export default {
    name: "Chat",
    components:{
      TabBar
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(vm.$store.state.login.username===null&&vm.$store.state.login.password===null)
        {
          vm.$router.push('/login');
        }
      })
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
