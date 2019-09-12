export default {
  state: {
    cosmeStates: {
      base: {
        isChecked: true,
        isOpend: false,
        cosmeFlags: []
      },
      cheek: {
        isChecked: true,
        isOpend: false,
        cosmeFlags: []
      },
      lip: {
        isChecked: true,
        isOpend: false,
        cosmeFlags: []
      }
    },
  },
  getters: {
    cosmeStates: state => state.cosmeStates
  },
  mutations: {
    changeDisplayState(state, payload) {
      state.cosmeStates[payload].isOpend = !state.cosmeStates[payload].isOpend
      alert(state.cosmeStates[payload].isOpend)
    },
    updateCosmeFlags(state, payload) {
      payload.cosmeTypes.forEach(type => {
        state.cosmeStates[type].cosmeFlags = Array(payload.cosmeNumber[type]).fill(true)
      });
    }
  },
  actions: {
  }
}
