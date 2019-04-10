<template>
  <div class="set">
    <div class="set-icon">
      <mt-cell title="头像"><img src="../../../../static/img/my/user.png" alt="" ref="icon"></mt-cell>
    </div>
    <div class="set-name" @click="updateName">
      <mt-cell title="昵称" is-link><span style="color: green" ref="name">{{this.$store.state.user.name}}</span></mt-cell>
    </div>
    <div class="set-sex" @click="updateSex">
      <mt-cell title="性别" is-link><span style="color: purple" ref="sex">{{this.$store.state.user.sex}}</span></mt-cell>
    </div>
    <div class="set-address" @click="updateAddress">
      <mt-cell title="地址" is-link><span style="color: tomato" ref="address">{{this.$store.state.user.address}}</span>
      </mt-cell>
    </div>
    <div class="set-birth" @click="updateBirth">
      <mt-cell title="生日" is-link><span style="color: blue" ref="birth">{{this.$store.state.user.birth}}</span>
      </mt-cell>
    </div>
    <div class="set-style" @click="updateStyle">
      <mt-cell title="个性签名" is-link><span style="color: red" ref="style">{{this.$store.state.user.style}}</span>
      </mt-cell>
    </div>

    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      @confirm="handleBirth"
      :startDate="startDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>



  </div>
</template>

<script>
  export default {
    name: "set",
    data() {
      return {
        pickerValue: new Date('1997-12-17'),
        startDate: new Date('1960-1-1'),
        endDate: new Date(),
      }
    },
    methods: {
      updateStyle: function () {
        this.$messagebox.prompt(' ', '个性签名').then((val) => {
          //console.log(val.value);
          if (val.value !== null) {
            if (!val.value.trim() === false) {
              this.$refs.style.innerText = val.value;
            }
          }
        })
      },
      updateName: function () {
        this.$messagebox.prompt(' ', '名字').then((val) => {
          if (val.value !== null) {
            if (!val.value.trim() === false) {
              this.$refs.name.innerText = val.value;
            }
          }
        })
      },
      updateSex: function () {

          this.$messagebox.prompt(' ', '性别').then((val) => {
            if (val.value !== null) {
              if (!val.value.trim() === false) {
                this.$refs.sex.innerText = val.value;
              }
            }
          })

      },
      updateAddress: function () {
        this.$messagebox.prompt(' ', '地址').then((val) => {
          if (val.value !== null) {
            if (!val.value.trim() === false) {
              this.$refs.address.innerText = val.value;
            }
          }
        })
      },
      updateBirth: function () {
        this.$refs.picker.open();
      },
      handleBirth: function (value) {
        this.$refs.birth.innerText = value.toLocaleDateString();
        this.$refs.picker.close();
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
            username: this.$store.state.login.username,
            password: this.$store.state.login.password
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
  .set-icon, .set-name, .set-sex, .set-address, .set-birth, .set-style
    margin-top -1px
  .set-icon img
    width 40%
    height 40%
    border-radius 50%
    margin-left 50%


</style>
