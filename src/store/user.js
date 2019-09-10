import { fetchMain } from '../api'

export default {
  state: {
    user: {},
    cosmes: {
      base: [],
      cheek: [],
      lip: []
    }
  },
  getters: {
    user: state => state.user,
    cosmeTypes: state => Object.keys(state.cosmes),
    cosmes: state => type => state.cosmes[type]
  },
  mutations: {
    updateMainData (state, payload) {
      state.user = payload.user
      state.cosmes = payload.cosmes
    }
  },
  actions: {
    async loadMain ({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    }
  }
}
