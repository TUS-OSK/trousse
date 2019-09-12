
export default {
  state: {
    formShow: false,
  },

  getters: {
    formShow: state => {
      return state.formShow;
    }

  },
  mutations: {
    displayAddForm(state) {
      state.formShow = !state.formShow
      state.isShow = state.formShow
    },
    

  },
  actions: {
    loadForm({ commit }) {
      commit('displayAddForm')
    }
  }
}