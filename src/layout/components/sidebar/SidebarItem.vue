<template>
  <div v-if="!item.hidden">
    <template v-if="hasOnlyOneChild(item.children, item)">
      <el-menu-item
        :index="resolvePath(showRoute.path)"
      >
        {{ showRoute.meta.title }}
      </el-menu-item>
    </template>

    <el-submenu
      v-else
      :index="resolvePath(item.path)"
    >
      <template slot="title">
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.showRoute = null
    return {}
  },
  computed: {},
  methods: {
    hasOnlyOneChild(children = [], parent) {
      if (children.length === 1) {
        this.showRoute = children[0]
        return true
      } else if (children.length === 0) {
        this.showRoute = { ...parent, path: '' }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang='scss' scoped>
.menu {
  background-color: rgb(48, 65, 86);
}
</style>
