import { login } from '@/api/user.js'
import { setToken } from '@/utils/auth.js'
const state = {
  name: '',
  introduction: '',
  roles: [],
  token: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_NAME', data.username)
          commit('SET_ROLES', data.roles)
          commit('SET_INTRODUCTION', data.introduction)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
