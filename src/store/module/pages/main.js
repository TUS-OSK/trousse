export default {
  state: {
    cosmeStates: {
      isOpened: {
        base: false,
        cheek: false,
        lip: false
      },
      unCheckedTypes: [],
      unCheckedItems: {
        base: [],
        cheek: [],
        lip: []
      }
    }
  },
  getters: {
    cosmeStates: state => state.cosmeStates,
    unCheckedTypes: state => state.cosmeStates.unCheckedTypes,
    unCheckedItems: state => state.cosmeStates.unCheckedItems,
    isOpened: state => state.cosmeStates.isOpened
  },
  mutations: {
    changeDisplayState(state, payload) {
      state.cosmeStates.isOpened[payload] = !state.cosmeStates.isOpened[payload]
    },
    updateCheckedTypes(state, payload) {
      state.cosmeStates.unCheckedTypes = payload
    },
    updateCheckedItems(state, payload) {
      state.cosmeStates.unCheckedItems[payload.type] = payload.cosmes
    }
  },
  actions: {
    loadDisplayState({ commit }, payload) {
      commit('changeDisplayState', payload)
    },
    loadCheckedTypes({ commit }, payload) {
      commit('updateCheckedTypes', payload)
    },
    loadCheckedItems({ commit }, payload) {
      commit('updateCheckedItems', payload)
    }
  }
}
