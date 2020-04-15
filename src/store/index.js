import Vue from 'vue'
import Vuex from 'vuex'
// 持久化,刷新不消失
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userid: '',
    username: '',
    menu:'/home',
    integral: '',
    aboutusItem: ''
  },
  mutations: {
    login (state, userInfo) {
      state.isLogin = true
      state.username = userInfo.username
      state.userid = userInfo.userid
      state.integral = userInfo.integral
    },
    logout (state) {
      state.username = ''
      state.userid = ''
      state.integral = ''
      state.isLogin = false
    },
    changeAboutUsitem(state, value) {
      state.aboutusItem = value
    },
    menuPath(state, value){
      state.menu = value
    },
    changeIntegral(state, value) {
      state.integral = value
    }
  },
  plugins: [createPersistedState()]
})
