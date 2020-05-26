<template>
  <div class="category">
    <div class="filter-header">
      <el-button size="small" @click="handleInsert">新增</el-button>
      <el-button size="small" @click="handleRefresh">刷新</el-button>
    </div>
    <el-table
      :data="tableData"
      height="393"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="desc" label="分类描述" />
      <el-table-column prop="articleNum" label="文章数量" />
      <el-table-column prop="status" label="状态" />
      <el-table-column
        label="操作"
        width="260"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form :model="temp" label-width="100px" label-position="right">
        <el-form-item label="分类名称：">
          <el-input v-model="temp.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分类描述：">
          <el-input v-model="temp.desc" autocomplete="off" />
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
import { findCategory, addCategory, cancelCategory, updateCategory } from '@/api/blog/category.js'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogStatus: '',
      title: '',
      temp: { name: '', desc: '' }
    }
  },
  mounted() {
    this.findCategory({})
  },
  methods: {
    findCategory(data) {
      return new Promise((resolve, reject) => {
        findCategory(data)
          .then(response => {
            this.tableData = response.data
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
      const reqJson = {
        update: { _id: this.temp._id },
        options: Object.assign({}, this.temp)
      }
      return new Promise((resolve, reject) => {
        updateCategory(reqJson)
          .then(response => {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.dialogVisible = false
            resolve()
          })
          .catch(err => {
            this.dialogVisible = false
            reject(err)
          })
      })
    },
    handleInsert() {
      this.title = '新增'
      this.dialogStatus = 'insert'
      this.dialogVisible = true
      this.isDisabled = false
    },
    insertData() {
      const insertJson = Object.assign({}, this.temp)
      return new Promise((resolve, reject) => {
        addCategory(insertJson)
          .then(response => {
            this.$notify({
              title: 'Success',
              message: 'Add Successfully',
              type: 'success',
              duration: 2000
            })
            this.dialogVisible = false
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleDelete(row) {
      const updateJson = {
        _id: row._id
      }
      return new Promise((resolve, reject) => {
        cancelCategory(updateJson)
          .then(response => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleRefresh() {
      this.findCategory({})
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
