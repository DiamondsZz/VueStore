import {
  getHomeCarousel,
  getHomeNav,
  getHomeShopList,
  userLogin,
  getMyShopList
} from './../api'


import {
  HOME_CAROUSEL,
  HOME_NAV,
  HOME_SHOPLIST,
  LOGIN,
  MY_SHOPLIST
} from './mutation-types';

export default {
  async reqHomeCarousel({commit}) {
    const result =await getHomeCarousel() ;
    commit(HOME_CAROUSEL, {homecarousel:result.message});
  },

  async reqHomeNav({commit}) {
    const result =await getHomeNav() ;
    commit(HOME_NAV, {homenav:result.message.data});
  },
  async reqHomeShopList({commit},{pageSize,count}) {
    const result =await getHomeShopList({pageSize,count}) ;
    commit(HOME_SHOPLIST, {homeshoplist:result.message});
  },

  async login({commit},{username,password}) {
    const result =await userLogin({username,password}) ;
    if(result.message==='ok')
    {
      commit(LOGIN, {login:{username,password}});
    }

  },

  async reqMyShopList({commit}) {
    const result =await getMyShopList() ;
    commit(MY_SHOPLIST, {myshoplist:result.message});
  },

}
