import { routerMap, constantRoutes } from '@/router/index.js'
import { getRoutes } from '@/api/route.js'
import router from '@/router/index.js'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

function generateAsyncRouter(routerMap, serverRouterMap) {
  serverRouterMap.forEach(function(item, index) {
    item.component = routerMap[item.component]
    if (item.children && item.children.length > 0) {
      generateAsyncRouter(routerMap, item.children)
    }
  })
  return serverRouterMap
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    router.addRoutes(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRoutes().then(res => {
        const asyncRouterMap = generateAsyncRouter(routerMap, res.data)
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRouterMap || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
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
