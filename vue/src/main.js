import  Vue from 'vue'
import  App from './App'
import store from './store'

import router from './router'
import  LyTab from 'ly-tab'
import VueLazyLoad from 'vue-lazyload'

Vue.use(LyTab);
Vue.use(VueLazyLoad,{
  //error: '',
  loading: require('./pages/Home/imgs/load.gif'),
});
new  Vue({
    el:"#app",
    router,
    store,
    render:h=>h(App)
  }
);
