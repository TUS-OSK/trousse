import { fetchMain } from '../../api'

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
    cosmes: state => state.cosmes,
    cosmeNumber: state => state.user.cosmeNumber
  },
  mutations: {
    updateMainData(state, payload) {
      state.user = payload.user
      state.cosmes = payload.cosmes
    },
    updateCosmeNumber(state) {
      state.user.cosmeNumber = {
        base: state.cosmes.base.length,
        cheek: state.cosmes.cheek.length,
        lip: state.cosmes.lip.length
      }
    }
  },
  actions: {
    async loadMain({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    },
    async loadAll({ dispatch, commit }) {
      await dispatch('loadMain')
      commit('updateCosmeNumber')
    }
  }
}