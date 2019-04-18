import Vue from 'vue'
import App from './App'
import store from './store'

import router from './router'
import LyTab from 'ly-tab'
import VueLazyLoad from 'vue-lazyload'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import VueSocketIo from 'vue-socket.io';
import socketIo from 'socket.io-client';





Vue.use(LyTab);
Vue.use(VueLazyLoad, {
  //error: '',
  loading: require('../static/img/load1.gif'),
});
Vue.use(MintUI);

Vue.use(VueSocketIo, socketIo('http://localhost:3000'));


new Vue({
    el: "#app",
    router,
    store,
    //render:h=>h(App)
    components: {App},
    template: '<App/>',
  }
);
