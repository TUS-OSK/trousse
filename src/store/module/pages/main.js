export default {
  state: {
    cosmeStates: {
      base: {
        isChecked: true,
        isOpened: false
      },
      cheek: {
        isChecked: true,
        isOpened: false
      },
      lip: {
        isChecked: true,
        isOpened: false
      }
    }
  },
  getters: {
    cosmeStates: state => state.cosmeStates
  },
  mutations: {
    changeDisplayState(state, payload) {
      state.cosmeStates[payload].isOpened = !state.cosmeStates[payload].isOpened
    }
  },
  actions: {
    loadDisplayState({ commit }, payload) {
      commit('changeDisplayState', payload)
    }
  }
}
