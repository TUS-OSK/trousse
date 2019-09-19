import Vue from 'vue'
import Vuex from 'vuex'
import cosmelist from './module/pages/cosmelist'
import edit from './module/pages/edit'
import login from './module/pages/login'
import main from './module/pages/main'
import result from './module/pages/result'
import user from './module/pages/user'
import userData from './module/user-data'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pages: {
      namespaced: true,
      modules: {
        cosmelist: {
          namespaced: true,
          ...cosmelist
        },
        edit: {
          namespaced: true,
          ...edit
        },
        login: {
          namespaced: true,
          ...login
        },
        main: {
          namespaced: true,
          ...main
        },
        result: {
          namespaced: true,
          ...result
        },
        user: {
          namespaced: true,
          ...user
        }
      }
    },
    userData: {
      namespaced: true,
      ...userData
    }
  }
})
