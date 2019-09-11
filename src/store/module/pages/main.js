import { fetchMain } from '../../../api'

export default {
  state: {
    user: {},
    cosmes: {
      base: [],
      cheek: [],
      lip: []
    },
    //コスメを制限して表示、か、全ての一覧を表示のトリガーにしようとしているけど無理そう
    cosmesState: {
      base: true,
      cheek: true,
      lip: true
    }
  },
  getters: {
    user: state => state.user,
    cosmeTypes: state => Object.keys(state.cosmes),
    cosmes: state => type => state.cosmes[type],
    limitedCosmes: state => type => state.cosmes[type].slice(0, 1)
  },
  mutations: {
    updateMainData(state, payload) {
      state.user = payload.user
      state.cosmes = payload.cosmes

      //cosme一つ一つに選択されているかされていないかを判別するプロパティが欲しかっただけなのに...
      //ここ、もっと他のやり方がありそう、助けてください神様
      const cosmeTypes = Object.keys(payload.cosmes)
      cosmeTypes.map(type => {
        state.cosmes[type].map(cosme => {
          cosme.state = true
          return cosme
        })
      })

    }
  },
  actions: {
    async loadMain({ commit }) {
      const mainData = await fetchMain()
      commit('updateMainData', mainData)
    }
  }
}
