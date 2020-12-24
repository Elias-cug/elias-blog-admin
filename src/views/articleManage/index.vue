<template>
  <div class="article">
    <el-form
      :inline="true"
      :model="filter"
      class="demo-form-inline filter-header"
    >
      <span>筛选：</span>
      <el-form-item>
        <el-select v-model="filter.selectedCategory" placeholder="文章分类">
          <el-option
            v-for="category in categorys"
            :key="category._id"
            :label="category.name"
            :value="category._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filter.selectedSource" placeholder="文章来源">
          <el-option
            v-for="source in sources"
            :key="source.id"
            :label="source.text"
            :value="source.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filter.key" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <div v-for="article in articles" :key="article._id" class="article-list">
      <h3>{{ article.title }}</h3>
      <div class="article-info">
        <span>{{ article.original }}</span>
        <span>{{ article.add_time | parseTime('{y}年{m}月{d} {h}:{i}') }}</span>
      </div>
      <div class="article-handler">
        <a @click="editArticle(article._id)">编辑</a>
        <a @click="removeArticle(article._id)">删除</a>
      </div>
      <div class="clear-float" />
    </div>
  </div>
</template>

<script>
import { findCategory } from '@/api/blog/category.js'
import { findArticle, removeArticle } from '@/api/blog/article.js'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'Article',
  filters: {
    parseTime (time, cFormat) {
      return parseTime(time, cFormat)
    }
  },
  data () {
    return {
      filter: {
        selectedSource: '',
        selectedCategory: '',
        key: ''
      },
      articles: [],
      categorys: [],
      sources: [
        {
          id: 'original',
          text: '原创'
        },
        {
          id: 'repost',
          text: '转载'
        },
        {
          id: 'translate',
          text: '翻译'
        }
      ]
    }
  },
  mounted () {
    this.getCategory()
    this.getArticle()
  },
  methods: {
    getCategory () {
      const data = { status: 1 }
      console.log(data)
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
    getArticle () {
      return new Promise((resolve, reject) => {
        findArticle({})
          .then(response => {
            this.articles = response.data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editArticle () {},
    removeArticle (id) {
      const data = {
        _id: id
      }
      return new Promise((resolve, reject) => {
        removeArticle(data)
          .then(response => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  margin: 10px;
  .filter-header {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: rgb(197, 193, 193);
    .el-form-item {
      margin: 0 20px 0 0;
    }
  }
  .article-list {
    padding: 10px 0;
    border-bottom: 1px solid rgb(207, 204, 204);
    h3 {
      margin-bottom: 10px;
    }
    .article-info {
      float: left;
      font-size: 12px;
      span {
        margin-right: 20px;
      }
    }
    .article-handler {
      float: right;
      font-size: 12px;
      a {
        padding: 0 10px;
        border-right: 1px solid rgb(207, 204, 204);
      }
      a:last-child {
        color: red;
        border: none !important;
      }
    }
  }
}
</style>
