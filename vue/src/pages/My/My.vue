<template>
  <div class="my">
    <div class="my-login">
      <div class="my-login-tip">选择登录方式</div>
      <div class="my-login-btn"><img src="" alt="">手机登录</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "My"
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .my
    height 100%
    display flex
    justify-content center
    align-items center
    .my-login
      width 100%
      height 120px
      background-color skyblue
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      .my-login-tip
        font-size 16px
</style>
