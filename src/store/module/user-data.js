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
    registerCosmeInfo(state, payload) {
      state.cosmes[payload.type].push({
        id: '' + ++state.cosmeIdCount,
        ...payload.info
      })
    },
    deleteCosmeInfo(state, payload){
      for(const type of Object.keys(state.cosmes)){
        state.cosmes[type] = state.cosmes[type].filter(v => v.id !== payload)
      }
    },
    dragCosmeInfo(state, payload){
      state.cosmes[payload.type] = payload.array
    }
  },

  actions: {
    async loadMain({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    },
    registerCosmeInfo({ commit }, item) {
      commit('registerCosmeInfo', item)
    },
    deleteCosmeInfo({ commit }, id){
      commit('deleteCosmeInfo', id)
    },
    dragCosmeInfo({ commit }, payload){
      commit('dragCosmeInfo', payload)
    }
  }
}
