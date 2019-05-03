<template>
  <div class="shop">
    <mt-header title="商品详情">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="shop-message" @click="modalShow">
      <img :src="shops.thumb_url" alt="" style=" width:100%;height:70%;">
      <img src="./../../../static/img/shop/ad.jpg" alt="" style="height:10%;">
      <span class="shop-message-tip"><img src="./../../../static/img/shop/icon.png" alt="">超市尖货轮番抢</span>
      <span class="shop-message-title">{{shops.goods_name}}</span>
      <span class="shop-message-price">￥{{shops.price}}</span>
    </div>

    <div class="shop-comment">
      <span class="shop-comment-title">评价</span>
      <div class="shop-comment-tip">
        <span>完好无损(5)</span>
        <span>手感舒适(3)</span>
        <span>稳固结实(3)</span>
        <span>隔热不烫手(2)</span>
        <span>质地厚重(2)</span>
        <span>有分量感(2)</span>
      </div>

      <div class="shop-comment-content">
        <div class="shop-comment-content-user">
          <span class="shop-comment-content-user-icon"><img src="./../../../static/img/my/user.png"
                                                            alt="">Diamondszz</span>
          <span class="shop-comment-content-user-time">2019-4-10</span>
        </div>
        <div class="shop-comment-content-des">
          收到宝贝，杯子很漂亮，很有颜值，非常的喜欢，还送了小勺子。卖家态度也很好。物流也快
        </div>
      </div>
      <div class="shop-comment-content">
        <div class="shop-comment-content-user">
          <span class="shop-comment-content-user-icon"><img src="./../../../static/img/my/user.png"
                                                            alt="">Diamondszz</span>
          <span class="shop-comment-content-user-time">2019-4-10</span>
        </div>
        <div class="shop-comment-content-des">
          收到宝贝，杯子很漂亮，很有颜值，非常的喜欢，还送了小勺子。卖家态度也很好。物流也快
        </div>
      </div>
      <div class="shop-comment-content">
        <div class="shop-comment-content-user">
          <span class="shop-comment-content-user-icon"><img src="./../../../static/img/my/user.png"
                                                            alt="">Diamondszz</span>
          <span class="shop-comment-content-user-time">2019-4-10</span>
        </div>
        <div class="shop-comment-content-des">
          收到宝贝，杯子很漂亮，很有颜值，非常的喜欢，还送了小勺子。卖家态度也很好。物流也快
        </div>
      </div>
      <div class="shop-comment-content">
        <div class="shop-comment-content-user">
          <span class="shop-comment-content-user-icon"><img src="./../../../static/img/my/user.png"
                                                            alt="">Diamondszz</span>
          <span class="shop-comment-content-user-time">2019-4-10</span>
        </div>
        <div class="shop-comment-content-des">
          收到宝贝，杯子很漂亮，很有颜值，非常的喜欢，还送了小勺子。卖家态度也很好。物流也快
        </div>
      </div>
      <div class="shop-comment-content">
        <div class="shop-comment-content-user">
          <span class="shop-comment-content-user-icon"><img src="./../../../static/img/my/user.png"
                                                            alt="">Diamondszz</span>
          <span class="shop-comment-content-user-time">2019-4-10</span>
        </div>
        <div class="shop-comment-content-des">
          收到宝贝，杯子很漂亮，很有颜值，非常的喜欢，还送了小勺子。卖家态度也很好。物流也快
        </div>
      </div>
      <div class="shop-comment-content">
        <div class="shop-comment-content-user">
          <span class="shop-comment-content-user-icon"><img src="./../../../static/img/my/user.png"
                                                            alt="">Diamondszz</span>
          <span class="shop-comment-content-user-time">2019-4-10</span>
        </div>
        <div class="shop-comment-content-des">
          收到宝贝，杯子很漂亮，很有颜值，非常的喜欢，还送了小勺子。卖家态度也很好。物流也快
        </div>
      </div>


    </div>


    <mt-popup
      v-model="popupVisible"
      position="bottom"
      :modal="modal"
      class="shop-buy-container">
      <div class="shop-buy">
        <div class="shop-buy-title">
          <img :src="shops.thumb_url" alt="" width="20%">
          <span>￥{{shops.price}} </span>
        </div>
        <div class="shop-buy-count">
          <span>数量</span>
          <ul>
            <li class="shop-buy-count-decrease" @click="countDecrease">-</li>
            <li class="shop-buy-count-number">
              <input type="text" v-model="count" ref="input" @change="countChange">
            </li>
            <li class="shop-buy-count-increase" @click="countIncrease">+</li>
          </ul>
        </div>
        <div @click="addShop">
          <mt-button type="danger" class="shop-buy-submit">确认</mt-button>
        </div>
      </div>
    </mt-popup>


    <div class="shop-footer">
      <div class="shop-bus-icon" @click="busEnter"><img src="./../../../static/img/my/bus-icon.png" alt=""
                                                        style="width: 50%;height: 100%;"><span class="shop-bus-icon-count" v-if="$store.state.bus.length>0">{{$store.state.bus.length}}</span></div>
      <div class="shop-footer-bus" @click="shopBus">
        <mt-button type="primary" style="width: 100%;height: 100%;font-size:16px;">加入购物车</mt-button>
      </div>
      <div class="shop-footer-buy">
        <mt-button type="danger" style="width: 100%;height: 100%;font-size:16px;">立即购买</mt-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "shop",
    data() {
      return {
        shops: {
          thumb_url: require('./../../../static/img/shop/error.jpg')
        },  //当前页面商品数据
        popupVisible: false, //加入购物车功能显示
        count: 1,  //商品数量
        modal: false,
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        //console.log(vm.$store.state.homeshoplist);

        //根据路由id值决定当前商品详情页面数据信息
        vm.$store.state.homeshoplist.filter((value, index) => {
          if (value.id === parseInt(vm.$route.params.id)) {
            vm.shops = value;
          }
        });
        //console.log(vm.shops);
      });
    },
    methods: {

      modalShow: function () {
        this.popupVisible = false;
      },
      //加入购物车按钮显示
      shopBus: function () {
        this.popupVisible = true;
      },

      //count改变触发
      countChange: function () {
        if (this.count > 5) {
          this.count = 5
        }
      },


      //商品减少按钮
      countDecrease: function () {
        this.count--;
        if (this.count < 0) {
          this.count = 0;
          this.$toast({
            message: '不能再减啦！！！',
            position: 'middle',
            duration: 2000
          });
        }
      },
      //商品增加按钮
      countIncrease: function () {
        this.count++;
        if (this.count > 5) {
          this.count = 5;
          this.$toast({
            message: '该商品一次最多只能买5件',
            position: 'middle',
            duration: 2000
          });
        }
      },
      //进入购物车页面
      busEnter: function () {
        this.$router.push('/bus');
      },
      //将商品加入购物车
      addShop: function () {
        //console.log(this.$route.params.id);
        //console.log(this.count);
        if (this.$store.state.bus[0] === undefined) {
          this.$store.dispatch('addShop', {
            shopId: parseInt(this.$route.params.id),
            count: this.count
          }).then(() => {
            this.$toast({
              message: '添加成功',
              position: 'middle',
              duration: 2000,
            });
          });
          return;
        }

        if (this.$store.state.bus[0] !== undefined) {
          for (let index in this.$store.state.bus) {
            if (this.$store.state.bus[index].shopId === parseInt(this.$route.params.id) && this.$store.state.bus[index].count + this.count > 20) {
              this.$toast({
                message: '亲，购物车最多放20件哦',
                position: 'middle',
                duration: 2000
              });
              break;
            } else if (this.$store.state.bus[index].shopId === parseInt(this.$route.params.id)) {
              this.$store.dispatch('addShop', {
                shopId: parseInt(this.$route.params.id),
                count: this.count
              }).then(() => {
                this.$toast({
                  message: '添加成功',
                  position: 'middle',
                  duration: 2000,
                });
              });
              break;
            } else if (this.$store.state.bus[index].shopId !== parseInt(this.$route.params.id)) {
              if (parseInt(index) === this.$store.state.bus.length - 1) {
                this.$store.dispatch('addShop', {
                  shopId: parseInt(this.$route.params.id),
                  count: this.count
                }).then(() => {
                  this.$toast({
                    message: '添加成功',
                    position: 'middle',
                    duration: 2000,
                  });
                });
                break;
              }
            }
          }
        }

      }
    },

  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">


  .shop
    height 100%
    .shop-message
      height 450px
      display flex
      flex-direction column
      .shop-message-tip
        height 20px
        margin 2% 2% 0
        font-size 12px
        color #999
        img
          width 15%
          height 90%
          vertical-align text-bottom
          margin-right 2%
      .shop-message-title
        width 80%
        margin 2% 2%
      .shop-message-price
        color #e4393c
        font-size 14px
        font-weight 600
        margin 0 2%
    .shop-comment
      //background-color darkkhaki
      display flex
      flex-direction column
      .shop-comment-title
        margin 6% 0
        text-align center
        color #333
        font-weight 600
      .shop-comment-tip
        height 80px
        //background-color #86faff
        display flex
        flex-wrap wrap
        span
          background-color #fdf0f0
          color #666
          font-size 10px
          margin 1% 1%
          padding 1% 1%
          height 16px
          line-height 16px
          border-radius 5px
      .shop-comment-content
        height 100px
        display flex
        flex-direction column
        margin 2% 0
        padding-bottom 2%
        .shop-comment-content-user
          display flex
          justify-content space-between
          .shop-comment-content-user-icon
            font-size 14px
            color #333
            img
              width 20%
              height 80%
              border-radius 50%
              vertical-align middle
              margin-right 3%
          .shop-comment-content-user-time
            color #999
            font-size 10px
        .shop-comment-content-des
          height 40px
          font-size 14px
          margin 3% 2%
          line-height 20px
    .shop-buy-container
      width 100%
      height 300px
      .shop-buy
        display flex
        flex-direction column
        margin 0 5%
        .shop-buy-title
          margin-bottom 5%
          img
            margin-top -5%
            margin-right 5%
          span
            color #e4393c
            font-size 10px
            font-weight 600
        .shop-buy-count
          display flex
          justify-content space-between
          ul
            width 20%
            display flex
            justify-content space-between
            .shop-buy-count-number input
              width 60%
              margin-left 20%
              background-color #f7e4e1
              text-align center
              border none
              outline none
        .shop-buy-submit
          width 100%
          position fixed
          bottom 0
          left 0

    .shop-footer
      width 100%
      height 50px
      background-color #fffde6
      position fixed
      bottom 0
      left 0
      display flex
      .shop-bus-icon
        position relative
        width 40%
        text-align right
        .shop-bus-icon-count
          display inline-block
          position absolute
          top 0
          right 8%
          width 15%
          height 35%
          border-radius 50%
          color #fff
          font-size 10px
          text-align center
          line-height 15px
          background-color #09b4ff
      .shop-footer-bus
        width 35%
        height 100%
      .shop-footer-buy
        width 30%
        height 100%

</style>
