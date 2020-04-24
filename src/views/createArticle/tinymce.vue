<template>
  <div class="editor-content">
    <div class="title-wrapper">
      <el-input v-model="articleTitle" placeholder="请输入文章标题" class="title-input" />
      <el-button>保存草稿</el-button>
      <el-button>发布</el-button>
      <el-button>清空</el-button>
    </div>
    <div>
      <tinymce v-model="content" :height="800" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ``,
      articleTitle: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-content{
  margin: 10px;
  .title-wrapper {
    margin-bottom: 10px;
    .title-input {
      width: calc(100% - 300px);
      margin-right: 20px;
    }
  }
}
</style>
