export default {
  state: {
    cosmesListStates: {
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
    cosmesListStates: state => state.cosmesListStates,
    unCheckedTypes: state => state.cosmesListStates.unCheckedTypes,
    unCheckedItems: state => state.cosmesListStates.unCheckedItems,
    isOpened: state => state.cosmesListStates.isOpened,
    history: state => state.history
  },
  mutations: {
    changeCosmesListState(state, payload) {
      state.cosmesListStates.isOpened[payload] = !state.cosmesListStates.isOpened[payload]
    },
    updateCheckedTypes(state, payload) {
      state.cosmesListStates.unCheckedTypes = payload
    },
    updateCheckedItems(state, payload) {
      state.cosmesListStates.unCheckedItems[payload.type] = payload.cosmes
    },
    updateHistory(state, payload) {
      state.history.push(payload)
    }
  },
  actions: {
    loadCosmesListState({ commit }, payload) {
      commit('changeCosmesListState', payload)
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
