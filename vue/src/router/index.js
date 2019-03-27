import Vue from 'vue'
import VueRouter from 'vue-router'

import  Home from './../pages/Home/Home'
import  Chat from './../pages/Chat/Chat'
import  My from './../pages/My/My'
import  Recommend from './../pages/Recommend/Recommend'
import  Search from './../pages/Search/Search'

import  Hot from './../pages/Home/Children/Hot/Hot'
import  Sport from './../pages/Home/Children/Sport/Sport'
import  Bag from './../pages/Home/Children/Bag/Bag'
import  Computer from './../pages/Home/Children/Computer/Computer'
import  Man from './../pages/Home/Children/Man/Man'
import  Food from './../pages/Home/Children/Foods/Food'
import  Dress from './../pages/Home/Children/Dress/Dress'
import  Phone from './../pages/Home/Children/Phone/Phone'
import  Goods from './../pages/Home/Children/Goods/Goods'


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
    },
    {
      path:'/recommend',
      component: Recommend,
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})
