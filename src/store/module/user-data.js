import { fetchMain } from '../../api'
import * as firebase from 'firebase/app'

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
    updateUserData(state, payload) {
      state.user.isLogged = payload.isLogged
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
        console.log('ユーザーデータをロードしました')

        await firebase.auth().onAuthStateChanged(user => {
          const userData = {
            user
          }

          if (user) {
            userData.isLogged = true
            console.log('ログイン状態です')
          } else {
            userData.isLogged = false
            console.log('未ログイン状態です')
          }
          commit('updateUserData', userData)
        })

        console.log('オブザーバーをセットしました')
      }
    },
    loadMain() {
      console.log('ロードしました')
    },
    async logIn({ state }) {
      if (!state.user.isLogged) {
        const provider = await new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
      } else {
        console.log('ログアウトしてください')
      }
    },
    async logOut({ state }) {
      if (state.user.isLogged) {
        await firebase.auth().signOut()
        console.log('ログアウトしました')
      } else {
        console.log('ログインしてください')
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
