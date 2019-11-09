import router from '../../router'

import {
  fetchCosme,
  creatCosme,
  changeCosme,
  deleteCosme,
  dragCosme
} from '../../api'
import { STATUS } from '@/constant'
import { auth, login, logout } from '@/api/auth'

export default {
  state: {
    user: {
      status: STATUS.UNCHECKED
    },
    cosmes: {
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
    },
    themes: ['spring', 'summer', 'autumn', 'winter', 'cute']
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
    themes: state => state.themes,
    status: state => state.user.status
  },
  mutations: {
    updateUserData(state, payload) {
      state.user.name = payload.name
      state.user.token = payload.token
    },
    updateCosmeData(state, payload) {
      state.cosmes = payload.cosmes
    },

    updateLogin(state, payload) {
      state.user.status = payload ? STATUS.LOGIN : STATUS.LOGOUT
    },
    registerCosmeInformation(state, payload) {
      state.cosmes[payload.type].push({
        ...payload.info
      })
    },
    changeCosmeInformation(state, payload) {
      state.cosmes[payload.type] = state.cosmes[payload.type].map(cosmeInfo => {
        if (cosmeInfo.id === payload.info.id) {
          return payload.info
        } else {
          return cosmeInfo
        }
      })
    },
    deleteCosmeInformation(state, payload) {
      for (const type of Object.keys(state.cosmes)) {
        state.cosmes[type] = state.cosmes[type].filter(
          v => v.id !== payload.id
        )
      }
    },
    dragCosmeIcon(state, payload) {
      state.cosmes[payload.type] = payload.array
    }
  },

  actions: {
    init: {
      root: true,
      async handler({ commit }) {
        auth(async user => {
          if (user) {
            // console.log('オブザーバーは君のことをみてるよ')
            commit('updateLogin', true)

            const token = await user.getIdToken()
            commit('updateUserData', {
              name: user.displayName,
              token
            })
            const cosmeData = await fetchCosme(token)
            commit('updateCosmeData', cosmeData)

            if (router.currentRoute.name === 'login') {
              router.replace({ name: 'main' })
            }
          } else {
            commit('updateLogin', false)

            if (router.currentRoute.name !== 'login') {
              router.replace({ name: 'login' })
            }
          }
        })
      }
    },
    loadMain() { },
    async login({ state }) {
      if (state.user.status == STATUS.LOGIN) {
        // console.log('ログアウトしてください')
      } else {
        login()
      }
    },
    async logout({ state }) {
      if (state.user.status === STATUS.LOGOUT) {
        // console.log('ログインしてください')
      } else {
        logout()
      }
    },
    async registerCosmeInfo({ commit }, item) {
      auth(async user => {
        const token = await user.getIdToken()
        const res = await creatCosme.cosme('api/cosmes', { item, token })
        item.info.id = res.id
        commit('registerCosmeInformation', item)
      })
    },
    async changeCosmeInfo({ commit }, item) {
      auth(async user => {
        const token = await user.getIdToken()
        const res = await changeCosme.cosme('api/cosmes', { item, token })
        res.id = item.info.id
        commit('changeCosmeInformation', item)
      })
    },
    deleteCosmeInfo({ commit }, item) {
      commit('deleteCosmeInformation', item)
      auth(async user => {
        const token = await user.getIdToken()
        const res = await deleteCosme.cosme('api/cosmes', { item, token })
        res.id = item.id
      })
    },
    dragCosme({ commit }, item) {
      auth(async user => {
        const token = await user.getIdToken()
        await dragCosme.cosme('api/cosmes/order', {
          item: { type: item.type, array: item.array.map(v => v.id) },
          token
        })
      })
      commit('dragCosmeIcon', item)
    }
  }
}
