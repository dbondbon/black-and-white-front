import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Buy from '@/pages/buy/buy'
import Sell from '@/pages/sell/sell'
import Msg from '@/pages/msg/msg'
import Cart from '@/pages/cart/cart'
import Mine from '@/pages/mine/mine'
import Home from '@/pages/home/home'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, 
    {
      path:'/home',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/home/buy'
        },
        {
          path:'buy',
          name:'buy',
          component: Buy,
        },
        {
          path:'sell',
          name:'sell',
          component: Sell,
        },
        {
          path:'msg',
          name:'msg',
          component: Msg,
        },
        {
          path:'cart',
          name:'cart',
          component: Cart,
        },
        {
          path:'mine',
          name:'mine',
          component: Mine,
        },
      ]
    },
  ]
})

export default router
