import { fetchMain } from '../../api'

export default {
  state: {
    user: {},
    cosmes: {
      base: [],
      cheek: [],
      lip: []
    },
    themes: ['spring', 'summer', 'autumn', 'winter', 'cute'],
    cosmeIdCount: 6
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
    cosmeIdCount: state => state.cosmeIdCount,
    themes: state => state.themes
  },
  mutations: {
    updateMainData(state, payload) {
      state.user = payload.user
      state.cosmes = payload.cosmes
    },
    registerCosmeInformation(state, payload) {
      state.cosmes[payload.type].push({
        id: '' + state.cosmeIdCount++,
        ...payload.info
      })
    },
    changeCosmeInformation(state, payload) {
      state.cosmes[payload.type] = state.cosmes[payload.type].map(cosmeInfo => {
        if (cosmeInfo.id === payload.id) {
          return payload.info
        } else {
          return cosmeInfo
        }
      })
    },
    deleteCosmeInformation(state, payload) {
      for (const type of Object.keys(state.cosmes)) {
        state.cosmes[type] = state.cosmes[type].filter(v => v.id !== payload)
      }
    },
    dragCosmeIcon(state, payload) {
      state.cosmes[payload.type] = payload.array
    }
  },

  actions: {
    async loadMain({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    },
    registerCosmeInfo({ commit }, item) {
      commit('registerCosmeInformation', item)
    },
    changeCosmeInfo({ commit }, item) {
      commit('changeCosmeInformation', item)
    },
    deleteCosmeInfo({ commit }, id) {
      commit('deleteCosmeInformation', id)
    },
    dragCosme({ commit }, payload) {
      commit('dragCosmeIcon', payload)
    }
  }
}
