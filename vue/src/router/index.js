import Vue from 'vue'
import VueRouter from 'vue-router'



/*const Home=()=>import ('./../pages/Home/Home');
const Chat=()=>import ('./../pages/Chat/Chat');
const My=()=>import ('./../pages/My/My');
const Recommend=()=>import ('./../pages/Recommend/Recommend');
const Search=()=>import ('./../pages/Search/Search');*/

import  Home from './../pages/Home/Home'
import  Chat from './../pages/Chat/Chat'
import  My from './../pages/My/My'
import  Recommend from './../pages/Recommend/Recommend'
import  Search from './../pages/Search/Search'
import  Login from './../pages/Login/Login'


/*
const Hot=()=>import ('./../pages/Home/Children/Hot/Hot');
const Sport=()=>import ('./../pages/Home/Children/Sport/Sport');
const Bag=()=>import ('./../pages/Home/Children/Bag/Bag');
const Computer=()=>import ('./../pages/Home/Children/Computer/Computer');
const Man=()=>import ('./../pages/Home/Children/Man/Man');
const Food=()=>import ('./../pages/Home/Children/Foods/Food');
const Dress=()=>import ('./../pages/Home/Children/Dress/Dress');
const Phone=()=>import ('./../pages/Home/Children/Phone/Phone');
const Goods=()=>import ('./../pages/Home/Children/Goods/Goods');
*/


import  Hot from './../pages/Home/Children/Hot/Hot'
import  Sport from './../pages/Home/Children/Sport/Sport'
import  Bag from './../pages/Home/Children/Bag/Bag'
import  Computer from './../pages/Home/Children/Computer/Computer'
import  Man from './../pages/Home/Children/Man/Man'
import  Food from './../pages/Home/Children/Foods/Food'
import  Dress from './../pages/Home/Children/Dress/Dress'
import  Phone from './../pages/Home/Children/Phone/Phone'
import  Goods from './../pages/Home/Children/Goods/Goods'
import  Person from './../pages/My/children/Person'
import  Set from './../pages/My/children/Set'
Vue.use(VueRouter);

export  default  new VueRouter({
  routes:[
    {
      path:'/home',
      component: Home,
      children:[
        {
          path:'hot',
          component: Hot,
        },
        {
          path:'bag',
          component: Bag,
        },
        {
          path:'foods',
          component: Food,
        },
        {
          path:'computer',
          component: Computer,
        },
        {
          path:'dress',
          component: Dress,
        },
        {
          path:'man',
          component: Man,
        },
        {
          path:'phone',
          component: Phone,
        },
        {
          path:'sport',
          component: Sport,
        },
        {
          path:'goods',
          component: Goods,
        },
        {
          path:'/home',
          redirect:'/home/hot'
        }
      ]
    },
    {
      path:'/search',
      component: Search,
    },
    {
      path:'/chat',
      component: Chat,
    },
    {
      path:'/my',
      component: My,
      children:[
        {
          path:'person',
          component: Person,
        },
        {
          path:'set',
          component: Set,
        },
        {
          path:'/my',
          redirect:'/my/person'
        }
      ]
    },
    {
      path:'/recommend',
      component: Recommend,
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})

