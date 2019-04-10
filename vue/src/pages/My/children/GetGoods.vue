<template>
  <div class="get-goods">
    <span class="get-goods-tip">暂无收获地址</span>
    <div class="get-goods-btn" @click="addAddress">
      <mt-button type="danger" style="width: 100%">手动添加</mt-button>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="middle" class="get-goods-add">
      <span class="get-goods-add-title">添加收获地址</span>
      <div class="get-goods-add-username">
        <mt-field placeholder="收货姓名" v-model="username"> </mt-field>
      </div>
      <div class="get-goods-add-phone">
        <mt-field placeholder="手机号" type="tel" v-model="phone"> </mt-field>
      </div>
      <div @click="addressSelect" class="get-goods-add-address">
        <mt-cell
          :title="addressEnd"
          is-link ref="address">
        </mt-cell>
      </div>
      <div class="get-goods-add-moreAddress">
        <mt-field placeholder="详细地址（如街道、小区、乡镇、村）" v-model="moreAddress"><img width="50%" height="50%" style="margin-left: 40%" src="../../../../static/img/my/position.png" alt=""></mt-field>
      </div>
      <mt-button type="danger" style="width: 80%; margin-top: 5%">添加</mt-button>
    </mt-popup>

    <mt-picker v-show="addressShow" :slots="address" @change="onAddressChange"
               class="get-goods-addressPicker"> </mt-picker>
    <div class="addressShow-cover" v-show="addressShowCover" @click="onAddressShowCover">

    </div>
  </div>
</template>


<script>

  export default {
    name: "get-goods",
    data() {
      return {
        popupVisible: false,
        username: null,
        phone: null,
        addressShow: false,
        addressShowCover: false,
        addressEnd:'选择地区',
        address: [
          {
            flex: 1,
            values: ['','河南', '浙江', '上海', '湖北'],
            className: 'slot1',
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['','郑州', '安阳', '洛阳', '焦作', '新乡', '鹤壁'],
            className: 'slot3',
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['','登封', '新密', '新郑', '巩义'],
            className: 'slot3',
          }
        ],
        moreAddress: null,
      }
    },
    methods: {
      addAddress: function () {
        this.popupVisible = true;
      },
      addressSelect: function () {
        this.addressShow = true;
        this.addressShowCover = true;
      },
      onAddressShowCover: function () {
        this.addressShowCover = false;
        this.addressShow = false;
      },
      onAddressChange: function (picker, values) {
        console.log(values);
        switch (values[0]) {
          case '河南':
            picker.setSlotValues(1, ['郑州', '安阳', '洛阳']);
            break;
          case '湖北':
            picker.setSlotValues(1, ['武汉', '武汉1']);
            break;
          case '浙江':
            picker.setSlotValues(1, ['杭州']);
            break;
          case '上海':
            picker.setSlotValues(1, ['陆家嘴']);
            break;
        }
        switch (values[1]) {
          case '郑州':
            picker.setSlotValues(2, ['登封', '新密', '新郑', '巩义']);
            break;
          case '安阳':
            picker.setSlotValues(2, ['安阳工学院', '安阳工学院1', '安阳工学院2']);
            break;
          case '洛阳':
            picker.setSlotValues(2, ['牡丹', '牡丹1', '牡丹2', '牡丹3']);
            break;
          case '武汉':
            picker.setSlotValues(2, ['黄鹤楼', '黄鹤楼1']);
            break;
          case '武汉1':
            picker.setSlotValues(2, ['长江', '长江1', '长江2']);
            break;
          case '杭州':
            picker.setSlotValues(2, ['西湖', '西湖1', '西湖2', '西湖3']);
            break;
          case '陆家嘴':
            picker.setSlotValues(2, ['不知道', '不知道1']);
            break;
        }
        if(values[0]==='')
        {
          this.addressEnd='选择地区'
        }else
        {
          this.addressEnd = values[0] + '-' + values[1] + '-' + values[2];
        }

      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .get-goods
    width 100%
    height 100%
    background-color floralwhite
    display flex
    flex-direction column
    justify-content center
    align-items center
    .get-goods-tip
      color #5fa2ff
      margin-bottom 10%
    .get-goods-btn
      width 80%
      margin-bottom 50%
    .get-goods-add
      width 90%
      height 50%
      display flex
      flex-direction column
      justify-content center
      align-items center
      border-radius 10px
      .get-goods-add-title
        font-size 18px
        margin-bottom 5%
      .get-goods-add-address, .get-goods-add-username, .get-goods-add-phone, .get-goods-add-moreAddress
        width 100%
        margin-top -1px
    .get-goods-addressPicker
      width 100%
      height 30%
      position absolute
      bottom -51px
      left 0
      color #fff
      background-color #fff
      z-index 9999
    .addressShow-cover
      width 100%
      height 100%
      background-color #000
      opacity 0.5
      position absolute
      z-index 9998
</style>
