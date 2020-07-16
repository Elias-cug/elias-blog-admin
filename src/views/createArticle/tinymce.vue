<template>
  <div class="editor-content">
    <div class="title-wrapper">
      <el-input v-model="articleTitle" placeholder="请输入文章标题" class="title-input" />
      <el-button @click="saveAsDraf">保存草稿</el-button>
      <el-button @click="fillOutInfo">发布</el-button>
      <el-button @click="clearForm">清空</el-button>
    </div>
    <div>
      <tinymce v-model="content" :height="800" />
    </div>

    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
    >
      <el-form :model="temp" label-width="100px" label-position="right">
        <el-form-item label="分类名称：">
          <el-select v-model="temp.category" placeholder="请选择分类">
            <el-option
              v-for="category in categorys"
              :key="category._id"
              :label="category.name"
              :value="category._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章来源：">
          <el-select v-model="temp.source">
            <el-option
              v-for="source in sources"
              :key="source.id"
              :label="source.text"
              :value="source.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否置顶：">
          <el-switch v-model="temp.is_top" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="文章描述：">
          <el-input v-model="temp.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitArticle">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { findCategory } from '@/api/blog/category.js'
import { addArticle } from '@/api/blog/article.js'
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ``,
      articleTitle: '',
      temp: {
        category: '',
        source: '',
        desc: '',
        is_top: false
      },
      isDraf: false,
      dialogVisible: false,
      categorys: [],
      sources: [{
        id: 'original',
        text: '原创'
      }, {
        id: 'repost',
        text: '转载'
      }, {
        id: 'translate',
        text: '翻译'
      }]
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    fillOutInfo() {
      this.dialogVisible = true
      this.isDraf = false
    },
    saveAsDraf() {
      this.dialogVisible = true
      this.isDraf = true
    },
    getCategory() {
      const data = { status: 1 }
      return new Promise((resolve, reject) => {
        findCategory(data)
          .then(response => {
            this.categorys = response.data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    submitArticle() {
      const data = {
        title: this.articleTitle,
        desc: this.temp.desc,
        source: this.temp.source,
        is_top: this.temp.is_top,
        cid: this.temp.category,
        content: this.content,
        status: this.isDraf ? 'Draf' : 'republic',
        update_time: new Date()
      }
      return new Promise((resolve, reject) => {
        addArticle(data)
          .then(reponse => {
            this.$notify({
              title: 'Success',
              message: 'add Successfully',
              type: 'success',
              duration: 2000
            })
            resolve()
          })
          .catch(err => {
            this.$notify({
              title: 'Success',
              message: err,
              type: 'success',
              duration: 2000
            })
            reject(err)
          })
      })
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
