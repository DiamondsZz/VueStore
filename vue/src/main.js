import Vue from 'vue'
import App from './App'
import store from './store'

import router from './router'
import LyTab from 'ly-tab'
import VueLazyLoad from 'vue-lazyload'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(LyTab);
Vue.use(VueLazyLoad, {
  //error: '',
  loading: require('./pages/Home/imgs/load.gif'),
});
Vue.use(MintUI);


new Vue({
    el: "#app",
    router,
    store,
    //render:h=>h(App)
    components: {App},
    template: '<App/>'
  }
);
