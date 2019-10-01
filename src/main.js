import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'

import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyARevSHtst7JXJdLdYT_GDN5SABf7g8SDQ',
  authDomain: 'oskweb-trousse.firebaseapp.com',
  databaseURL: 'https://oskweb-trousse.firebaseio.com',
  projectId: 'oskweb-trousse',
  storageBucket: '',
  messagingSenderId: '180108532162',
  appId: '1:180108532162:web:efd452b8adebccd4659e5b'
}
firebase.initializeApp(firebaseConfig)

Vue.use(VModal)

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('init')
  },
  render: h => h(App)
}).$mount('#app')
