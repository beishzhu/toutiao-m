import Vue from 'vue'
import Vuex from 'vuex'
import {
  setItem,
  getItem
} from './storage'

Vue.use(Vuex)
const TOOKEN_KEY = "TOUTIAO_USER"
export default new Vuex.Store({
  state: {
    // user 存储用户登录的token信息
    user: getItem(TOOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
