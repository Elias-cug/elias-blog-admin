<template>
  <div>
    <el-menu
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  // computed: {
  //   routes() {
  //     return this.$router.options.routes
  //   }
  // },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
