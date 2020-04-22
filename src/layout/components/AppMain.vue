<template>
  <section class="app-main">
    <router-view key="" />
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
<style lang='scss' scoped>
@import '~@/styles/variables.scss';
.app-main {
  position: relative;
  min-height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}
</style>
