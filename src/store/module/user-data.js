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
    updateUserData(state, payload) {
      state.user.isLogged = payload.isLogged
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
