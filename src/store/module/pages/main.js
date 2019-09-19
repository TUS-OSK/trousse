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
    },
    history: []
  },
  getters: {
    cosmeStates: state => state.cosmeStates,
    unCheckedTypes: state => state.cosmeStates.unCheckedTypes,
    unCheckedItems: state => state.cosmeStates.unCheckedItems,
    isOpened: state => state.cosmeStates.isOpened,
    history: state => state.history
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
    },
    updateHistory(state, payload) {
      state.history.push(payload)
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
    },
    loadHistory({ commit }, payload) {
      commit('updateHistory', payload)
    }
  }
}
