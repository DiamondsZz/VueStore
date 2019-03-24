import {
  getHomeCarousel,
  getHomeNav,
  getHomeShopList
} from './../api'


import {
  HOME_CAROUSEL,
  HOME_NAV,
  HOME_SHOPLIST
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
  async reqHomeShopList({commit}) {
    const result =await getHomeShopList() ;
    commit(HOME_SHOPLIST, {homeshoplist:result.message.goods_list});
  }
}
