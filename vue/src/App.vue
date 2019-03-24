<template>
  <div id="app" >
    <router-view> </router-view>
    <tab-bar> </tab-bar>
  </div>
</template>

<script>
  import  TabBar from './commponents/TabBar/TabBar'
  export default {
    name: "App",
    components:{
      TabBar,
    },
    methods:{
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
</style>
