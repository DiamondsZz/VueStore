<template>
  <div class="login">
    <mt-header title="登录界面" class="login-person">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/" slot="right">
        <mt-button>关闭</mt-button>
      </router-link>
    </mt-header>

    <mt-navbar v-model="selected" class="login-navbar">
      <mt-tab-item id="1">账号登录</mt-tab-item>
      <mt-tab-item id="2">立即注册</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="login-user">
        <mt-field label="用户名" class="login-user-form" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" type="password" class="login-user-form" placeholder="请输入密码" v-model="password"></mt-field>
        <mt-button type="danger" class="login-btn" @click="login">登录</mt-button>
      </mt-tab-container-item>

      <mt-tab-container-item id="2" class="login-phone">
        <mt-field label="用户名" class="login-user-form" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" type="password" class="login-user-form" placeholder="请输入密码" v-model="password"></mt-field>
        <mt-button type="danger" class="register-btn">注册</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        selected: '1',
        username: sessionStorage.getItem('username'),
        password: sessionStorage.getItem('password'),
        fromRouter: null,
      }
    },
    beforeRouteEnter(to, from, next) {

      //console.log(from);
      next(vm => {

        //个人中心页面路径
        vm.fromRouter = from;
        //console.log(vm.fromRouter);
      })
    },
    methods: {
      login: function () {
        //console.log(this.username);
        //console.log(this.password);

        //用户登录信息验证
        if (this.username === null || this.password === null) {
          this.$toast({
            message: '账号或密码不能为空',
            position: 'bottom',
            duration: 2000
          });
        } else if (this.username.trim().length === 0 || this.password.trim().length === 0) {
          this.$toast({
            message: '账号或密码不能为空',
            position: 'bottom',
            duration: 2000
          });
        } else if (!this.username.trim() === false && !this.password.trim() === false) {
          this.$store.dispatch('login', {username: this.username.trim(), password: this.password.trim()}).then(() => {
            //console.log(this.$store.state.login.username);
            //console.log(this.$store.state.login.password);
            if (this.$store.state.login.username === null && this.$store.state.login.password === null) {
              this.$messagebox({
                title: '提示',
                message: '账号或密码错误！',
              });

            } else if (this.$store.state.login.username !== false && this.$store.state.login.password !== false) {
              sessionStorage.setItem('username', this.$store.state.login.username);
              sessionStorage.setItem('password', this.$store.state.login.password);
              this.$indicator.open({
                text: '正在登录...',
                spinnerType: 'fading-circle'
              });

              setTimeout(() => {
                this.$indicator.close();
                this.$router.push(this.fromRouter.path);
              }, 1000)


            }
          });

        }
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .login
    height 100%
    display flex
    flex-direction column
    align-items center
    .login-person
      width 100%
      margin-bottom 10%
    .login-navbar
      width 100%
      margin-bottom 3px
    .login-user, .login-phone
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      .login-user-form
        height 60px
      .register-btn, .login-btn
        width 90%
        margin-top 20%
        border-radius 10px
</style>
