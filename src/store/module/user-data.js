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
    },
    deleteCosmeInformation(state, payload) {
      for (const type of Object.keys(state.cosmes)) {
        state.cosmes[type] = state.cosmes[type].filter(v => v.id !== payload)
      }
    },
    dragCosmeInformation(state, payload) {
      state.cosmes[payload.type] = payload.array
    }
  },

  actions: {
    init: {
      root: true,
      async handler({ commit }) {
        const mainData = await fetchMain()
        commit('updateMainData', mainData)
        console.log('ユーザーデータをロードしました')
      }
    },
    registerCosmeInformation({ commit }, item) {
      commit('registerCosmeInformation', item)
    },
    deleteCosmeInformation({ commit }, id) {
      commit('deleteCosmeInformation', id)
    },
    dragCosmeInformation({ commit }, payload) {
      commit('dragCosmeInformation', payload)
    }
  }
}
