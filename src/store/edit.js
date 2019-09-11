
export default {
  state: {
    formShow : false,
  },

  getters: {
    formShow : state =>{
      return state.formShow;
    }

    },
  mutations: {
    DisplayAddForm( state ){
      state.formShow = !state.formShow
      state.isShow = state.formShow
    }

},
  actions: {
    loadForm({ commit }){
      commit ('DisplayAddForm')
    }
  }
}