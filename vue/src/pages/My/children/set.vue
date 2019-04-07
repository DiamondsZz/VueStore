<template>
  <div class="set">
    <mt-cell class="set-icon" title="头像"><img src="./../img/user.png" alt="" ref="icon"></mt-cell>
    <mt-cell title="昵称" is-link><span style="color: green" ref="name">{{this.$store.state.user.name}}</span></mt-cell>
    <mt-cell title="性别" is-link><span style="color: purple" ref="sex">{{this.$store.state.user.sex}}</span></mt-cell>
    <mt-cell title="地址" is-link><span style="color: tomato" ref="address">{{this.$store.state.user.address}}</span>
    </mt-cell>
    <mt-cell title="生日" is-link><span style="color: blue" ref="birth">{{this.$store.state.user.birth}}</span></mt-cell>
    <div class="set-style" @click="update">
      <mt-cell title="个性签名" is-link><span style="color: red" ref="style">{{this.$store.state.user.style}}</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    name: "set",
    methods: {
      update: function () {

        this.$messagebox.prompt(' ', '个性签名').then((val) => {
          this.$refs.style.innerText = val.value;
        })

      }
    },
    beforeRouteLeave(to, from, next) {

      if (this.$refs.name.innerText !== this.$store.state.user.name || this.$refs.sex.innerText !== this.$store.state.user.sex || this.$refs.address.innerText !== this.$store.state.user.address || this.$refs.birth.innerText !== this.$store.state.user.birth || this.$refs.style.innerText !== this.$store.state.user.style) {
        this.$messagebox.confirm('是否保存设置').then(() => {
          this.$store.state.user.name = this.$refs.name.innerText;
          this.$store.state.user.sex = this.$refs.sex.innerText;
          this.$store.state.user.address = this.$refs.address.innerText;
          this.$store.state.user.birth = this.$refs.birth.innerText;
          this.$store.state.user.style = this.$refs.style.innerText;

          sessionStorage.setItem('user', JSON.stringify(this.$store.state.user));


          this.$store.dispatch('set', {
            icon: '',
            name: this.$refs.name.innerText,
            sex: this.$refs.sex.innerText,
            address: this.$refs.address.innerText,
            birth: this.$refs.birth.innerText,
            style: this.$refs.style.innerText,
            username:this.$store.state.login.username,
            password:this.$store.state.login.password
          });
        }).catch(() => {
          next();
        });
      } else {
        next();
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .set-icon img
    width 40%
    height 40%
    border-radius 50%
    margin-left 50%


</style>
