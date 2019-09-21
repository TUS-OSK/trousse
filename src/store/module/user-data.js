import { fetchMain } from '../../api'

export default {
  state: {
    user: {},
    cosmes: {
      base: [],
      cheek: [],
      lip: []
    },
    cosmeIdCount: 0,
    cosmeId: null
  },
  getters: {
    user: state => state.user,
    cosmeTypes: state => Object.keys(state.cosmes),
    cosmes: state => state.cosmes,
    cosmeIdCount: state => state.cosmeIdCount,
    cosmeId: state => state.cosmeId
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
    },
    memoryCosmeId(state, payload){
      state.cosmeId = payload || null
    },
    deleteCosmeInformation(state, cosmeId){
      for(const type of Object.keys(state.cosmes)){
        state.cosmes[type] = state.cosmes[type].filter(v => v.id !== cosmeId)
      }
    }
  },

  actions: {
    async loadMain({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    },
    registerCosmeInformation({ commit }, item) {
      commit('registerCosmeInformation', item)
    },
    memoryCosmeId({ commit }, id){
      commit('memoryCosmeId', id)
    },
    deleteCosmeInformation({ commit }, id){
      commit('deleteCosmeInformation', id)
    }
  }
}
