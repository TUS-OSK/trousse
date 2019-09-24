import * as firebase from 'firebase/app'

export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    loginUser() {
      const user = firebase.auth().currentUser

      if (!user) {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
        console.log('ログインしました')
      } else {
        console.log('ログアウトしてください')
      }

    },
    logoutUser() {
      const user = firebase.auth().currentUser

      if (user) {
        firebase.auth().signOut().then(() => {
          console.log('ログアウトしました')
        })
      } else {
        console.log('ログインしてください')
      }
    },
    init: {
      root: true,
      handler() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log('ログインを感知しました')
          } else {
            console.log('ログアウトを感知しました')
          }
        })
        console.log('オブザーバーをセットしました')
      }
    }
  }
}
