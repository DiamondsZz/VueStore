import {
  HOME_CAROUSEL,
  HOME_NAV,
  HOME_SHOPLIST
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
  }
}
