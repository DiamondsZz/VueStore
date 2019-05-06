<template>


  <div class="search">


    <div class="search-box">
      <input type="text" class="search-box-input" placeholder="搜索" ref="search" @click="cancelShow"
             @input="searchChange">
      <span class="search-box-cancel" v-if="cancel" @click="cancelSearch">取消</span>
    </div>
    <ul class="search-list"  v-if="listShow">
         <li v-for="(item,index) in list" :key="index" @click="searchResult(item)">{{item}}</li>
    </ul>

    <TabBar/>
  </div>

</template>

<script>
  import TabBar from './../../commponents/TabBar/TabBar'

  export default {
    name: "search",
    components: {
      TabBar
    },
    data() {
      return {
        cancel: false,
        listShow:false,
        list:[],
        result: [
          '衣服', '冰箱', '女装', '女', '休闲', '漂亮', '裙子', '裤子', '裙', '男装','运动','鞋子',
          '车','手机','游戏', '保暖','车','手','游戏', '暖','车','机','新款', '保','车',
          '新','款', '保暖','车','手','游', '保暖','车','手机','游戏', '保暖','车',
          '车','闲','休', '裤','车','衣','上衣', '保暖','车','手机','游戏', '保暖','车','手机','鞋', '保暖',
        ]
      }
    },
    mounted() {
      this.$refs.search.focus();
    },
    methods: {

      //汉字转 unicode 16进制
        word2Unicode:function(word){
          let str='';
          for(let i=0;i<word.length;i++)
          {
            str+='\\u'+word[i].charCodeAt(0).toString(16);
          }
          return str;
        },
        //unicode 16进制 转汉字
        unicode2Word:function(str){
          let word='';
          for(let i=0;i<str.split('\\u').length;i++)
          {
            word+=String.fromCharCode(parseInt(parseInt(str.split('\\u')[i],16).toString(10)));
          }
          return word;
        },

      //搜索框文本改变
      searchChange: function () {
        this.listShow=true;

        if(this.$refs.search.value==='')
        {
          this.list=[];
        }

        if(this.$refs.search.value!=='')
        {
          this.list=[];
          let pattern=new RegExp(this.word2Unicode(this.$refs.search.value));

          this.result.forEach((value,index)=>{
            if(pattern.test(value)&&this.list.indexOf(value)===-1)
            {
              this.list.push(value);
            }
          })
        }


      },

      //取消搜索
      cancelSearch: function () {
        this.listShow=false;
        this.cancel =false;
        this.$refs.search.value='';
        this.$router.push('/home');
      },
      //取消按钮显示
      cancelShow: function () {
        this.cancel = true;
      },

      searchResult:function(item){
        let searchArr=[];
          let pattern=new RegExp('['+this.word2Unicode(item)+']');
          this.$store.state.homeshoplist.forEach((value)=>{
            console.log('aaa');
            console.log(value.goods_name);
            if(pattern.test(value.goods_name))
            {
              searchArr.push(value);
            }
          });
          this.$router.push({
            name:'Result',
            params:{
              searchArr
            }
          })
      }

    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .search-box
    height 40px
    display flex
    margin  2% 2%
    .search-box-input
      width 85%
      height 100%
      box-sizing border-box
      background-color #d9d9d9
      border-radius 10px
      border none
      outline none
      padding-left 20px
    .search-box-cancel
      display inline-block
      width 15%
      height 100%
      text-align center
      line-height 40px
      padding-left 5px
      font-size 14px
      color #9c9c9c
  .search-list
      li
       height 40px
       line-height 40px
       margin-left 5%
       border-bottom 1px solid #d9d9d9

</style>
