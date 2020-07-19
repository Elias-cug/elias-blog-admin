const getters = {
  permission_routes: state => state.permission.routes,
  name: state => state.user.name,
  roles: state => state.user.roles,
  introduction: state => state.user.introduction,
  token: state => state.user.token
}
export default getters
