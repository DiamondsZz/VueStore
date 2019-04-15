import {
  HOME_CAROUSEL,
  HOME_NAV,
  HOME_SHOPLIST,
  LOGIN,
  MY_SHOPLIST,
  USER_SET,
  BUS,
  BUS_SHOPLIST
} from './mutation-types'




export default {
  [HOME_CAROUSEL](state,{homecarousel}) {
    state.homecarousel = homecarousel;
  },
  [HOME_NAV](state,{homenav}) {
    state.homenav = homenav;
  },
  [HOME_SHOPLIST](state,{homeshoplist}) {
    state.homeshoplist =  state.homeshoplist .concat(homeshoplist);
  },
  //用户登录信息
  [LOGIN](state,{login}) {
    state.login  = login;
  },
  [MY_SHOPLIST](state,{myshoplist}) {
    state.myshoplist = myshoplist ;
  },
  //用户个人信息修改
  [USER_SET](state,{user}) {
    state.user=user;
  },

  //购物车商品信息记录
  [BUS](state,{shopId,count}) {
    if(state.bus[0]===undefined)
    {
      //state.bus=state.bus.concat([{shopId,count}]);
      state.bus.push({shopId,count});
    } else{
      for( let busshop in state.bus)
      {
        if(state.bus[busshop].shopId===shopId)
        {
          state.bus[busshop].count+=count;
          break;
        }else if(parseInt(busshop) === state.bus.length-1)
          {
            state.bus.push({shopId,count});
          }
      }
    }
    localStorage.setItem('bus',JSON.stringify(state.bus));
  },

  [BUS_SHOPLIST](state,{homeshop,shop,index}) {
    if(homeshop!==null)
    {
      state.busshoplist.push(homeshop);
    }else if(shop!==null&&index!==null)
    {
      state.busshoplist[index]=shop;
    }
    //设置购物车busshoplist本地缓存
    localStorage.setItem('busshoplist',JSON.stringify(state.busshoplist));
  },


}
