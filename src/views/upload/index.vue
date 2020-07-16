<template>
  <div>
    <input ref="file" type="file">
    <button @click="save">保存</button>
  </div>
</template>

<script>
// import { uploadFileRequest } from '@/api/index.js'
// import axios from 'axios'
export default {
  data() {
    return {
      name: 'Upload'
    }
  },
  methods: {
    save() {
      // const formData = new FormData()
      // const headers = {
      //   'Content-Type': 'multipart/form-data'
      // }
      // formData.append('img', this.$refs.file.files[0])
      // return new Promise((resolve, reject) => {
      //   axios.post('http://127.0.0.1:3000/admin/timeline/addImg', formData, headers)
      //     .then(res => {
      //       console.log(res)
      //     })
      // })
      const file = this.$refs.file.files[0]
      const xhr = new XMLHttpRequest()
      const fd = new FormData()
      fd.append('file', file)
      xhr.open('POST', 'http://127.0.0.1:3000/admin/timeline/addImg', true)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          alert(xhr.responseText)
        }
      }
      xhr.send(fd)
    }
  }
}
</script>
