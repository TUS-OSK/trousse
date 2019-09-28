import * as firebase from 'firebase/app'

const USER = {}
const DEFAULT_USER = USER
let authCb = null
export const auth =
  process.env.NODE_ENV === 'production'
    ? firebase.auth().onAuthStateChanged
    : cb => {
      authCb = cb
      setTimeout(() => {
        authCb(DEFAULT_USER)
      }, 500)
    }

export const login = async() => {
  if (process.env.NODE_ENV === 'production') {
    const provider = await new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  } else {
    setTimeout(() => {
      authCb(USER)
    }, 500)
    return
  }
}

export const logout = async() => {
  if (process.env.NODE_ENV === 'production') {
    await firebase.auth().signOut()
  } else {
    setTimeout(() => {
      authCb(null)
    }, 500)
    return
  }
}
