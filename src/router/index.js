import Vue from 'vue'
import store from '@/store/global'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Register from '@/pages/register/register'
import Buy from '@/pages/buy/buy'
import Sell from '@/pages/sell/sell'
import SellingDetails from '@/pages/sellingDetails/sellingDetails'
import Msg from '@/pages/msg/msg'
import Cart from '@/pages/cart/cart'
import Mine from '@/pages/mine/mine'
import Home from '@/pages/home/home'
import Setting from '@/pages/setting/setting'
import BuyOrder from '@/pages/buyOrder/buyOrder'
import BuyOrderDetails from '@/pages/BuyOrderDetails/BuyOrderDetails'
import SellOrder from '@/pages/sellOrder/sellOrder'
import SendMsg from '@/pages/sendMsg/sendMsg'
import OnSale from '@/pages/onSale/onSale'
import ChatFrame from '@/pages/chatFrame/chatFrame'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
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
          path:'msg',
          name:'msg',
          component: Msg,
        },
        {
          path:'mine',
          name:'mine',
          component: Mine,
        },
      ]
    },
    {
      path:'/sell',
      name:'sell',
      component: Sell,
    },
    {
      path:'/sellingDetails',
      name:'sellingDetails',
      component: SellingDetails,
    },
    {
      path:'/cart',
      name:'cart',
      component: Cart,
    },
    {
      path:'/setting',
      name:'setting',
      component: Setting,
    },
    {
      path:'/buyOrder',
      name:'buyOrder',
      component: BuyOrder,
    },
    {
      path:'/buyOrderDetails',
      name:'buyOrderDetails',
      component: BuyOrderDetails,
    },
    {
      path:'/sellOrder',
      name:'sellOrder',
      component: SellOrder,
    },
    {
      path:'/sendMsg',
      name:'sendMsg',
      component: SendMsg,
    },
    {
      path:'/onSale',
      name:'onSale',
      component: OnSale,
    },
    {
      path:'/chatFrame',
      name:'chatFrame',
      component: ChatFrame,
    },
  ]
})

//登录校验
router.beforeEach((to, from, next) => {
    if(localStorage.token) {   // 获取当前的token是否存在
      next();
    } else {
      if(to.name == "login" || to.name == "register") {
        next();
        return;
      }
      next({ path: '/' });
    }
})

export default router
