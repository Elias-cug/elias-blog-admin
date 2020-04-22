<template>
  <div>
    <el-menu :router="true">
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
export default {
  name: 'Sidebar',
  components: { SidebarItem },
  data() {
    return {}
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>

</style>
