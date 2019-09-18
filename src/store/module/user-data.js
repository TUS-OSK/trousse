import { fetchMain } from '../../api'

export default {
  state: {
    user: {},
    cosmes: {
      base: [],
      cheek: [],
      lip: []
    },
    cosmeIdCount: 0
  },
  getters: {
    user: state => state.user,
    cosmeTypes: state => Object.keys(state.cosmes),
    allCosmeIds: (state, getters) => {
      const allCosmeIds = {}
      getters.cosmeTypes.forEach(type => {
        allCosmeIds[type] = getters.cosmes[type].map(item => item.id)
      })
      return allCosmeIds
    },
    cosmes: state => state.cosmes,
    cosmeIdCount: state => state.cosmeIdCount
  },
  mutations: {
    updateMainData(state, payload) {
      state.user = payload.user
      state.cosmes = payload.cosmes
      let flattenCosmes = []
      for (const key in payload.cosmes) {
        flattenCosmes = flattenCosmes.concat(payload.cosmes[key])
      }
      state.cosmeIdCount = Math.max(...flattenCosmes.map(cosme => +cosme.id))
    },
    registerCosmeInformation(state, payload) {
      state.cosmes[payload.type].push({
        id: '' + ++state.cosmeIdCount,
        ...payload.info
      })
    }
  },
  actions: {
    async loadMain({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    },
    registerCosmeInformation({ commit }, item) {
      commit('registerCosmeInformation', item)
    }
  }
}
