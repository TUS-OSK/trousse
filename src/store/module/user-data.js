import router from '../../router'

import { fetchMain } from '../../api'
import { auth, login, logout } from '@/api/auth'
import { STATUS } from '@/constant'

export default {
  state: {
    user: {
      status: STATUS.UNCHECKED
    },
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
    themes: state => state.themes,
    status: state => state.user.status
  },
  mutations: {
    updateMainData(state, payload) {
      state.user.name = payload.user.name
      state.user.token = payload.user.token
      state.cosmes = payload.cosmes
    },

    updateLogin(state, payload) {
      state.user.status = payload ? STATUS.LOGIN : STATUS.LOGOUT
    },
    registerCosmeInformation(state, payload) {
      state.cosmes[payload.type].push({
        id: '' + state.cosmeIdCount++,
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
        state.cosmes[type] = state.cosmes[type].filter(v => v.id !== payload)
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
        const mainData = await fetchMain()
        commit('updateMainData', mainData)

        auth(user => {
          if (user) {
            commit('updateLogin', true)

            if (router.currentRoute.name === 'login') {
              console.log(router.replace)
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
    loadMain() {
      console.log('データをロードしました')
    },
    async login({ state }) {
      if (state.user.status == STATUS.LOGIN) {
        console.log('ログアウトしてください')
      } else {
        await login()
      }
    },
    async logOut({ state }) {
      if (state.user.status === STATUS.LOGOUT) {
        console.log('ログインしてください')
      } else {
        await logout()
      }
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
