import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/Login.vue'
import MainPage from './views/Main.vue'
import UserPage from './views/User.vue'
import ResultPage from './views/Result.vue'
import EditPage from './views/Edit.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage
    },
    {
      path: '/main/result',
      name: 'result',
      component: ResultPage
    },
    {
      path: '/edit/:type',
      name: 'edit',
      component: EditPage,
      props: true
    },
  ]
})
