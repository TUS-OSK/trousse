import router from '../../router'

import { fetchMain, post } from '../../api'
import { STATUS } from '@/constant'
import { auth, login, logout } from '@/api/auth'

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
        auth(async user => {
          if (user) {
            // console.log('オブザーバーは君のことをみてるよ')
            commit('updateLogin', true)

            mainData.user.name = user.displayName
            mainData.user.token = await user.getIdToken()
            commit('updateMainData', mainData)

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
    loadMain() {
      console.log('データをロードしました')
    },
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
      const res = await post.cosme('api/cosmes', {
        item
      })
      console.log('regiterCosmeInfo', res)
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
