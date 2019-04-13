import {
  getHomeCarousel,
  getHomeNav,
  getHomeShopList,
  userLogin,
  getMyShopList,
  userSet,
  userGet
} from './../api'


import {
  HOME_CAROUSEL,
  HOME_NAV,
  HOME_SHOPLIST,
  LOGIN,
  MY_SHOPLIST,
  USER_SET,
  BUS
} from './mutation-types';

export default {
  //请求首页轮播图
  async reqHomeCarousel({commit}) {
    const result =await getHomeCarousel() ;
    commit(HOME_CAROUSEL, {homecarousel:result.message});
  },
  //请求首页导航图
  async reqHomeNav({commit}) {
    const result =await getHomeNav() ;
    commit(HOME_NAV, {homenav:result.message.data});
  },
  //请求首页商品列表
  async reqHomeShopList({commit},{pageSize,count}) {
    const result =await getHomeShopList({pageSize,count}) ;
    commit(HOME_SHOPLIST, {homeshoplist:result.message});
  },
  //登录验证
  async login({commit},{username,password}) {
    const result =await userLogin({username,password}) ;
    if(result.message==='ok')
    {
      commit(LOGIN, {login:{username,password}});
    }

  },
  //请求个人中心商品列表
  async reqMyShopList({commit}) {
    const result =await getMyShopList() ;
    commit(MY_SHOPLIST, {myshoplist:result.message});
  },
   //修改个人信息
  async set({commit},{icon,name,sex,address,birth,style,username,password}){
    const result =await userSet({icon,name,sex,address,birth,style,username,password});

  },

  //查询个人信息
  async get({commit},{username,password}){
    const result =await userGet({username,password});
    commit(USER_SET, {user:result.message});
    //console.log(result);
  },
  //添加商品
    addShop({commit},{shopId,count}){
    commit(BUS,{shopId,count});
    //console.log({shopId,count});
  }
}
