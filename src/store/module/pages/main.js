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
    }
    // updateCheckedModules(state, payload) {
    //   state.checkedTypes = payload.checkedTypes
    //   state.checkedItems = payload.checkedItems
    // }
  },
  actions: {
    loadDisplayState({ commit }, payload) {
      commit('changeDisplayState', payload)
    }
    // loadCheckedModules({ commit }, payload) {
    //   commit('updateCheckedModules', payload)
    // }
  }
}
