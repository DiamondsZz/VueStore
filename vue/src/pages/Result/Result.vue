<template>

  <div class="result">

    <mt-header title="搜索结果" class="bus-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"> </mt-button>
    </mt-header>



   <Shoplist  :shoplist="shoplist"  />

  </div>
</template>

<script>
  import Shoplist from './../../commponents/ShopList/ShopList'

  export default {
    name: "result",
    components: {
      Shoplist
    },
    data(){
      return {
        shoplist:this.$route.params.searchArr
      }
    },

  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
