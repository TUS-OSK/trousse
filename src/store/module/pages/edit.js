
export default {
  state: {
    formShow: false,
    cosmeIdCount: 6,
  },

  getters: {
    formShow: state => {
      return state.formShow;
    },
    cosmeIdCount: state => {
      return state.cosmeIdCount;
    }

  },
  mutations: {
    displayAddForm(state) {
      state.formShow = !state.formShow
      state.isShow = state.formShow
    },
    idIncrement(state) {
      state.cosmeIdCount++
    }
  },
  actions: {
    loadForm({ commit }) {
      commit('displayAddForm')
    }
  }
}