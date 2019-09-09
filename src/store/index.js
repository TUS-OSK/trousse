import Vue from 'vue'
import Vuex from 'vuex'
import edit from './edit'
import login from './login'
import main from './main'
import result from './result'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    edit,
    login,
    main,
    result,
    user
  }
})
