<template>
  <div class="category">
    <div class="filter-header">
      <el-button size="small" @click="handleInsert">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      height="393"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="cate_id" label="分类编号" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="article_num" label="文章数量" />
      <el-table-column
        label="操作"
        width="260"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form :model="temp" label-width="100px" label-position="right">
        <el-form-item label="分类编号：">
          <el-input v-model="temp.cate_id" :disabled="isDisabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-input v-model="temp.cate_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStatus === 'update' ? updateData() : insertData()">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findCategory } from '@/api/blog/category.js'
export default {
  data() {
    return {
      tableData: [
        {
          cate_id: 'A01',
          cate_name: 'JS',
          article_num: '5'
        },
        {
          cate_id: 'A02',
          cate_name: 'html5',
          article_num: '5'
        },
        {
          cate_id: 'A03',
          cate_name: 'vue',
          article_num: '5'
        },
        {
          cate_id: 'A04',
          cate_name: 'node',
          article_num: '5'
        },
        {
          cate_id: 'A05',
          cate_name: 'JS',
          article_num: '5'
        }
      ],
      dialogVisible: false,
      dialogStatus: '',
      title: '',
      isDisabled: false,
      temp: { cate_id: '', cate_name: '' }
    }
  },
  mounted() {
    // this.findCategory({})
  },
  methods: {
    findCategory(data) {
      return new Promise((resolve, reject) => {
        findCategory(data)
          .then(response => {
            this.tableData = response
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleUpdate(row) {
      this.title = '修改'
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.isDisabled = true
      this.temp = row
    },
    updateData() {
      const updateJson = Object.assign({}, this.temp)
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].cate_id === updateJson.cate_id) {
          this.tableData.splice(i, 1, updateJson)
          break
        }
      }

      this.dialogVisible = false
    },
    handleInsert() {
      this.title = '新增'
      this.dialogStatus = 'insert'
      this.dialogVisible = true
      this.isDisabled = false
    },
    insertData() {
      const insertJson = Object.assign({}, this.temp)
      insertJson.article_num = 0
      this.tableData.push(insertJson)
      this.dialogVisible = false
    },
    handleDelete(row) {
      const index = this.tableData.indexOf(row)
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  padding: 20px;
  position: relative;
  .filter-header {
    float: right;
    margin-bottom: 5px;
  }
}
</style>
