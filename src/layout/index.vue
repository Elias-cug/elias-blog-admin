<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="content-wrapper">
      <navbar class="fixed-header" />
      <app-main class="main-wrapper" />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components/index.js'

export default {
  components: { AppMain, Navbar, Sidebar },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/variables.scss';
.app-wrapper {
  position: relative;
  .content-wrapper {
    position: relative;
    height: 100%;
    margin-left: #{$sideBarWidth};
    width: calc(100% - #{$sideBarWidth});
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      height: 50px;
      margin-left: #{$sideBarWidth};
      width: calc(100% - #{$sideBarWidth});
      background-color: #fff;
      border-bottom: 1px solid #f9f7f8;
      z-index: 1600;
    }
  }
}
</style>
