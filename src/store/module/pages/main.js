export default {
  state: {
    cosmesListStates: {
      isOpened: {
        makeupbase: false,
        foundation: false,
        facepowder: false,
        eyeshadow: false,
        eyeliner: false,
        mascara: false,
        eyebrow: false,
        cheek: false,
        lipstick: false,
        lipgloss: false
      },
      unCheckedTypes: [
        'makeupbase',
        'foundation',
        'facepowder',
        'eyeshadow',
        'eyeliner',
        'mascara',
        'eyebrow',
        'cheek',
        'lipstick',
        'lipgloss'
      ],
      unCheckedItems: {
        makeupbase: [],
        foundation: [],
        facepowder: [],
        eyeshadow: [],
        eyeliner: [],
        mascara: [],
        eyebrow: [],
        cheek: [],
        lipstick: [],
        lipgloss: []
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
    updateCosmesListState(state, payload) {
      state.cosmesListStates.isOpened[payload] = !state.cosmesListStates
        .isOpened[payload]
    },
    updateCheckedTypes(state, payload) {
      state.cosmesListStates.unCheckedTypes = payload
    },
    updateCheckedItems(state, payload) {
      state.cosmesListStates.unCheckedItems[payload.type] = payload.cosmes
    },
    filterChecked(state, payload) {
      payload.newUnCheckedTypes.forEach(type => {
        state.cosmesListStates.unCheckedItems[type] = payload.cosmes[type].map(
          cosme => cosme.id
        )
      })
    },
    addChecked(state, payload) {
      const oldCheckedTypes = payload.cosmeTypes.filter(
        type => !state.cosmesListStates.unCheckedTypes.includes(type)
      )
      const dif = payload.newCheckedTypes.filter(
        type => !oldCheckedTypes.includes(type)
      )
      dif.forEach(type => (state.cosmesListStates.unCheckedItems[type] = []))
    },
    updateHistory(state, payload) {
      state.history.push(payload)
    }
  },
  actions: {
    loadCosmesListState({ commit }, payload) {
      commit('updateCosmesListState', payload)
    },
    loadCheckedTypes({ commit }, payload) {
      commit('updateCheckedTypes', payload)
    },
    loadCheckedItems({ commit }, payload) {
      commit('updateCheckedItems', payload)
    },
    loadHistory({ commit }, payload) {
      commit('updateHistory', payload)
    },
    filterCheckedItems({ commit }, payload) {
      commit('filterChecked', payload)
    },
    addCheckedItems({ commit }, payload) {
      commit('addChecked', payload)
    }
  }
}
