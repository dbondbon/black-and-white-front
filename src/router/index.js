import Vue from 'vue'
import store from '@/store/global'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Register from '@/pages/register/register'
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
      path: '/register',
      name: 'register',
      component: Register
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

//登录校验
router.beforeEach((to, from, next) => {
  if(store.user != null) {
    next();
  } else {
    if(to.name == "login" || to.name == "register") {
      next();
      return;
    }
    next({ path: '/' });
  }
  next();
})

export default router
