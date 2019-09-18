export default {
	state: {
    openChangeFormId: null
	},
	getters: {
    openChangeFormId: state => state.openChangeFormId
	},
	mutations: {
    openChangeForm(state, payload) {
      state.openChangeFormId = payload || null
    }
	},
	actions: {
    openChangeForm({ commit }, id) {
      commit('openChangeForm', id)
    }
	}
}
