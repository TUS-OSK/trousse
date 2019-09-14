export default {
  state: {
    cosmeStates: {
      base: {
        isChecked: true,
        isOpend: false
      },
      cheek: {
        isChecked: true,
        isOpend: false
      },
      lip: {
        isChecked: true,
        isOpend: false
      }
    }
  },
  getters: {
    cosmeStates: state => state.cosmeStates
  },
  mutations: {
    changeDisplayState(state, payload) {
      state.cosmeStates[payload].isOpend = !state.cosmeStates[payload].isOpend
      alert(state.cosmeStates[payload].isOpend)
    }
  },
  actions: {
    loadDisplayState({ commit }, payload) {
      commit('changeDisplayState', payload)
    }
  }
}
