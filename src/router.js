import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/Login.vue'
import MainPage from './views/Main.vue'
import UserPage from './views/User.vue'
import ResultPage from './views/Result.vue'
import EditPage from './views/Edit.vue'
import FirstPage from './views/First.vue'
import store from '@/store'
import { STATUS } from '@/constant'
import { unreachable } from './util'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/first',
      name: 'first',
      component: FirstPage,
      children: [{
        path: 'main',
        name: 'main',
        component: MainPage
      }, {
        path: 'user',
        name: 'user',
        component: UserPage
      }, {
        path: 'edit/:type',
        name: 'edit',
        component: EditPage,
        props: true
      }]
    },
    {
      path: '/main/result',
      name: 'result',
      component: ResultPage
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    switch (store.state.userData.user.status) {
      case STATUS.UNCHECKED:
        return next()
      case STATUS.LOGIN:
        return next()
      case STATUS.LOGOUT:
        return next({ name: 'login' })
      default:
        return unreachable(store.state.userData.user.status)
    }
  }
})

export default router
