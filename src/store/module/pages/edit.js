
export default {
  state: {
    formShow: false
    // chengeForm: false
  },
  getters: {
    formShow: state => {
      return state.formShow
    }
    // chengeForm: state => {
    //   return state.chengeForm
    // }
  },
  mutations: {
    displayAddForm(state) {
      state.formShow = !state.formShow
      state.isShow = state.formShow
    }
    // displayChengeForm(state){
    //   state.chengeForm = !state.chengeForm
    //   state.showChengeForm = state.chengeForm
    // }
  },
  actions: {
    loadForm({ commit }) {
      commit('displayAddForm')
    }
    // loadChengeForm({ commit }){
    //   commit('displayChengeForm')
    // }
  }
}
