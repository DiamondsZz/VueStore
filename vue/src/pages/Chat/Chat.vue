<template>
  <div class="chat">

    <mt-header title="聊天界面" class="bus-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"> </mt-button>
    </mt-header>


    <ul class="chat-content" v-for="chatContent in chat " v-if="chat!==[]">
      <li class="chat-content-client" v-if="chatContent.client!==undefined">
        <div><img src="./../../../static/img/home/shop_list/user.png" alt="" ><span>{{chatContent.client}}</span></div>
      </li>
      <li class="chat-content-server" v-if="chatContent.server!==undefined">
        <div><img src="./../../../static/img/home/shop_list/server.png" alt="" ><span>{{chatContent.server}}</span></div>
      </li>
    </ul>


    <div class="chat-input">
      <input ref="sendText"  @keyup.enter="send($refs.sendText.value)"  />
      <div @click="send($refs.sendText.value)" >
        <mt-button type="danger" class="chat-input-btn" >发送</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  import TabBar from './../../commponents/TabBar/TabBar'

  export default {
    name: "Chat",
    components: {
      TabBar
    },
    data() {
      return {
        client: '',
        server: '',
        chat: [],
      }
    },
    sockets: {
      connect: function () {
        console.log('socket connected');
      },
      server: function (data) {
        this.server = data;
        this.chat.push({
          server:data
        })
      }
    },
    updated(){
      //console.log(document.documentElement.scrollHeight);
      document.documentElement.scrollTop=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    },
    methods: {
      send: function (data) {
        if (data) {
          this.chat.push({
            client:data
          });
          this.$socket.emit('client', data);
        }
        this.$refs.sendText.value='';
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$store.state.login.username === null && vm.$store.state.login.password === null) {
          vm.$router.push('/login');
        }
      })
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
 .chat
   padding-bottom 40px
  .chat-content
    height auto
    .chat-content-client
      height 60px
      overflow hidden
      div
        height 100%
        margin 2% 0
        img
          width 15%
          height 80%
          float right
          border-radius 50%
        span
          display inline-block
          height 30px
          line-height 30px
          border-radius 10px
          font-size 14px
          color #8088ff
          background-color #dcdcdc
          margin-top 5%
          margin-right 2%
          float right
    .chat-content-server
      height 60px
      overflow hidden
      div
        height 100%
        margin 2% 0
        img
          width 15%
          height 80%
          float left
          border-radius 50%
        span
          display inline-block
          height 30px
          line-height 30px
          border-radius 10px
          font-size 14px
          color #dcdcdc
          background-color #8088ff
          margin-top 5%
          margin-left 5%
          float left

  .chat-input
    width 100%
    height 40px
    background-color tomato
    position fixed
    bottom 0
    left 0
    display flex

    input
      box-sizing border-box
      width 80%
      height 100%
      outline none
      padding-left 2%
    div
      width 20%
      .chat-input-btn
        width 100%
        height 100%
        font-size 14px
</style>
