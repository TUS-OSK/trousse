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
    checkedTypes: state => state.cosmeStates.checkedTypes,
    checkedItems: state => state.cosmeStates.checkedItems,
    isOpened: state => state.cosmeStates.isOpened
  },
  mutations: {
    changeDisplayState(state, payload) {
      state.cosmeStates.isOpened[payload] = !state.cosmeStates.isOpened[payload]
    },
    updateCheckedTypes(state, payload) {
      state.cosmeStates.checkedTypes = payload
    },
    updateCheckedItems(state, payload) {
      state.cosmeStates.checkedItems[payload.type] = payload.cosmes
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
