import router from '../../router'

import {
  fetchCosme,
  creatCosme,
  changeCosme,
  deleteCosme,
  dragCosme,
  fetchMain,
  postImage
} from '../../api'
import { STATUS } from '@/constant'
import { auth, login, logout } from '@/api/auth'

export default {
  state: {
    user: {
      name: null,
      token: null,
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
    themes: ['spring', 'summer', 'autumn', 'winter', 'cute'],
    cosmesStatus: {
      allLoaded: false,
      changeLoaded: true,
      imageLoaded: true
    }
  },
  getters: {
    user: state => state.user,
    userName: state => state.user.name,
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
    status: state => state.user.status,
    cosmesStatus: state => state.cosmesStatus
  },
  mutations: {
    updateUserData(state, payload) {
      state.user.name = payload.name
      state.user.token = payload.token
    },
    updateCosmeData(state, payload) {
      state.cosmes = {
        ...state.cosmes,
        ...payload.cosmes
      }
    },
    updateCosmes(state, payload) {
      state.cosmes[payload.type] = payload.cosmes
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
    updateCosmesLoadStatus(state) {
      state.cosmesStatus.allLoaded = true
    },
    updateCosmeStatus(state, payload) {
      state.cosmesStatus.changeLoaded = payload
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

            if (router.currentRoute.name === 'login') {
              router.replace({ name: 'main' })
            }

            const token = await user.getIdToken()
            commit('updateUserData', {
              name: user.displayName,
              token
            })
            const cosmeData =
              process.env.NODE_ENV === 'production' ||
                process.env.VUE_APP_AUTHENTICATION === 'production'
                ? await fetchCosme(token)
                : await fetchMain()
            commit('updateCosmeData', cosmeData)
            // コスメがロードし終わったかのstatus
            commit('updateCosmesLoadStatus')
          } else {
            commit('updateLogin', false)

            if (router.currentRoute.name !== 'login') {
              router.replace({ name: 'login' })
            }
          }
        })
      }
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
    async registerCosmeInfo({ commit, state }, item) {
      const { token } = state.user
      if (item.imageFile) {
        item.info.imageURL = await postImage(item.imageFile)
      }
      commit('updateCosmeStatus', false)
      const res = await creatCosme.cosme('api/cosmes', { item, token })
      item.info.id = res.id
      commit('registerCosmeInformation', item)
      commit('updateCosmeStatus', true)
    },
    async changeCosmeInfo({ commit, state }, item) {
      const { token } = state.user
      if (item.imageFile) {
        item.info.imageURL = await postImage(item.imageFile)
      }
      commit('changeCosmeInformation', item)
      await changeCosme.cosme('api/cosmes', { item, token })
    },
    async deleteCosmeInfo({ commit, state }, item) {
      const { token } = state.user
      commit('deleteCosmeInformation', item)
      await deleteCosme.cosme('api/cosmes', { item, token })
    },
    async reorderCosmeInfo({ commit, state }, { cosmeIds, type }) {
      const { token } = state.user
      void dragCosme.cosme('api/cosmes/order', {
        item: { type, array: cosmeIds },
        token
      })
      const cosmes = cosmeIds
        .map(id => state.cosmes[type].find(cosme => cosme.id === id))
        .filter(cosme => cosme !== undefined)
      commit('updateCosmes', { type, cosmes })
    }
  }
}
