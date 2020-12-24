<template>
  <div>
    <input ref="file" type="file" />
    <button @click="save">保存</button>
  </div>
</template>

<script>
import { getRoutes } from '@/api/route.js'
export default {
  data () {
    return {
      name: 'Upload'
    }
  },
  methods: {
    save () {
      return new Promise((resolve, reject) => {
        getRoutes().then(res => {
          this.$store.dispatch('permission/generateRoutes', res.data)
        })
      })
    }
  }
}
</script>
