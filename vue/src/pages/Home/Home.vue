<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      class="fix"></ly-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        selectedId: 0,
        items: [
          {label: '热门'},
          {label: '女装'},
          {label: '百货'},
          {label: '手机'},
          {label: '鞋包'},
          {label: '男装'},
          {label: '食品'},
          {label: '电脑'},
          {label: '运动'}
        ],
        options: {
          activeColor: '#df2127'
        },
        subTabBarArr: [
          {
            path: '/home/hot'
          },
          {
            path: '/home/dress'
          },
          {
            path: '/home/goods'
          },
          {
            path: '/home/phone'
          },
          {
            path: '/home/bag'
          },
          {
            path: '/home/man'
          },
          {
            path: '/home/foods'
          },
          {
            path: '/home/computer'
          },
          {
            path: '/home/sport'
          }
        ]
      }
    },
    mounted(){
      this.$router.push('/home/hot');
    },
    updated(){
      this.handleSelectedId();
    },
    methods: {
      handleChange: function (item, index) {
        this.$router.replace(this.subTabBarArr[index].path);
      },
      handleSelectedId:function(){
        if(this.$route.path==='/home/hot')
        {
          this.selectedId=0;
        }
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .home
    padding-top 42px
  .fix
    width 100%
    background #f5f5f5
    position fixed
    top 0
    left 0
    z-index 999

</style>
