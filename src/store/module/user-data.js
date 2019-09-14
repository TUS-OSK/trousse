import { fetchMain } from '../../api'

export default {
  state: {
    user: {},
    cosmes: {
      base: [],
      cheek: [],
      lip: []
    },
    cosmeIdCount: 6
  },
  getters: {
    user: state => state.user,
    cosmeTypes: state => Object.keys(state.cosmes),
    cosmes: state => type => state.cosmes[type],
    cosmeIdCount: state => {
      return state.cosmeIdCount
    }
  },
  mutations: {
    updateMainData(state, payload) {
      state.user = payload.user
      state.cosmes = payload.cosmes
    },
    registerCosmeInformation(state, payload){
      state.cosmes[payload.type].push(payload.info)
    },
    idIncrement(state) {
      state.cosmeIdCount++
    }
  },
  actions: {
    async loadMain({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    },
    idIncrement({ commit }){
      commit('idIncrement')
    }
  }
}
