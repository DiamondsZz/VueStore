<template>
  <div class="tabbar">
    <div class="tabbar-footer">
      <ul>
        <li @click="switchTo('/home')"><img :src="'/home'===$route.path.slice(0,$route.path.lastIndexOf('/'))?tabBarImgArr[0].selected:tabBarImgArr[0].normal" alt=""><span :class="{on:'/home'===$route.path.slice(0,$route.path.lastIndexOf('/'))}">首页</span></li>
        <li @click="switchTo('/recommend')"><img :src="'/recommend'===$route.path?tabBarImgArr[1].selected:tabBarImgArr[1].normal" alt=""><span :class="{on:'/recommend'===$route.path}">推荐</span></li>
        <li @click="switchTo('/search')"><img :src="'/search'===$route.path?tabBarImgArr[2].selected:tabBarImgArr[2].normal" alt=""><span :class="{on:'/search'===$route.path}">搜索</span></li>
        <li @click="switchTo('/chat')"><img :src="'/chat'===$route.path?tabBarImgArr[3].selected:tabBarImgArr[3].normal" alt=""><span :class="{on:'/chat'===$route.path}">聊天</span></li>
        <li @click="switchTo('/my')"><img :src="'/my'===$route.path.slice(0,$route.path.lastIndexOf('/'))?tabBarImgArr[4].selected:tabBarImgArr[4].normal" alt=""><span :class="{on:'/my'===$route.path}">个人中心</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab-bar",
    data(){
      return {
        tabBarImgArr: [
          {normal: require('./../../../static/img/icon_home.png'),selected:require('./../../../static/img/icon_home_selected.png')},
          {normal: require('./../../../static/img/icon_intro.png'),selected:require('./../../../static/img/icon_intro_selected.png')},
          {normal: require('./../../../static/img/icon_search.png'),selected:require('./../../../static/img/icon_search_selected.png')},
          {normal: require('./../../../static/img/icon_chat.png'),selected:require('./../../../static/img/icon_chat_selected.png')},
          {normal: require('./../../../static/img/icon_mine.png'),selected:require('./../../../static/img/icon_mine_selected.png')},
        ]
      }
    },
    methods:{
      switchTo:function (path) {
       this.$router.replace(path);
        //console.log(this.$route.path)
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .tabbar
      width 100%
      position fixed
      bottom 0
      left 0
      z-index 999
    .tabbar-footer ul
      background #f5f5f5
      height 50px
      display flex
      li
        display flex
        flex 1
        flex-direction column
        align-items center
        justify-content center
        font-size .12rem
        color #666
        img
          width 32%
          margin-bottom 2px
        .on
           color red
</style>
