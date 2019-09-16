export default {
  state: {
    cosmeStates: {
      isOpened: {
        base: false,
        cheek: false,
        lip: false
      },
      checkedTypes: [],
      checkedItems: {
        base: [],
        cheek: [],
        lip: []
      }
    }
  },
  getters: {
    cosmeStates: state => state.cosmeStates,
    isOpened: state => state.cosmeStates.isOpened
  },
  mutations: {
    changeDisplayState(state, payload) {
      state.cosmeStates.isOpened[payload] = !state.cosmeStates.isOpened[payload]
    },
    updateCheckedTypes(state, payload) {
      if (state.checkedTypes)
        state.checkedTypes = payload
    },
    updateCheckedCosmes(state, payload) {
      state.checkedCosmes = payload
    }
  },
  actions: {
    loadDisplayState({ commit }, payload) {
      commit('changeDisplayState', payload)
    },
    loadCheckedTypes({ commit }, payload) {
      commit('updateCheckedTypes', payload)
    },
    loadCheckedCosmes({ commit }, payload) {
      commit('updateCheckedCosmes', payload)
    }
  }
}
