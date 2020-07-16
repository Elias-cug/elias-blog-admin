<template>
  <div class="timeline">
    <div class="options">
      <el-radio-group v-model="tabPosition" class="line-options" @change="radioChange">
        <el-radio-button label="developTime">开发</el-radio-button>
        <el-radio-button label="readingTime">阅读</el-radio-button>
      </el-radio-group>
      <div class="line-button">
        <el-button @click="handleInsert">新增</el-button>
        <el-button @click="findTimeline">刷新</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="250" border>
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="image_src" label="图片" width="180" />
      <el-table-column
        prop="add_time"
        label="添加时间"
        width="180"
        :formatter="parseTime"
      />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="status" label="状态" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleModify(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="cancelData(scope.$index, scope.row)"
          >
            删除
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleCheck(scope.$index, scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form :model="temp" label-width="100px" label-position="right">
        <el-form-item label="标题：">
          <el-input v-model="temp.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片：">
          <el-upload
            ref="upload"
            :limit="5"
            action="#"
            :mutiple="true"
            :auto-upload="false"
            :file-list="fileList"
            list-type="picture-card"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="temp.content" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="isBtn" @click="dialogStatus === 'modify' ? modifyData() : insertImg()">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addTimeline, findTimeline, modifyTimeline, cancelTimeline } from '@/api/timeline/timeline.js'
import { parseTime } from '@/utils/index.js'
import { uploadFileRequest } from '@/api/index.js'
export default {
  name: 'TimelineManage',
  data() {
    return {
      tabPosition: 'developTime',
      tableData: [],
      dialogVisible: false,
      dialogStatus: '',
      title: '',
      temp: {},
      fileList: [],
      isBtn: false
    }
  },
  mounted() {
    this.findTimeline()
  },
  methods: {
    parseTime(row, column, cellValue, index) {
      return parseTime(cellValue, '{y}-{m}-{d} {h}:{m}:{s}')
    },
    findTimeline() {
      const data = { category: this.tabPosition }
      return new Promise((resolve, reject) => {
        findTimeline(data)
          .then(res => {
            this.tableData = res.data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleInsert() {
      this.title = '新增'
      this.isBtn = true
      this.dialogVisible = true
      this.temp = { title: '', content: '' }
    },
    insertImg() {
      const formData = new FormData()
      const fileArray = this.$refs.upload.uploadFiles
      for (let i = 0; i < fileArray.length; i++) {
        formData.append('avatar', fileArray[i].raw)
      }
      console.log(formData.getAll('avatar'))
      return new Promise((resolve, reject) => {
        uploadFileRequest('/admin/timeline/addImg', formData)
          .then(res => {
            console.log('success')
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    insertData() {
      const data = Object.assign({}, this.temp)
      data.category = this.tabPosition
      data.add_time = new Date()
      return new Promise((resolve, reject) => {
        addTimeline(data)
          .then(res => {
            this.dialogVisible = false
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    handleModify(index, row) {
      this.dialogVisible = true
      this.dialogStatus = 'modify'
      this.isBtn = true
      this.title = '修改'
      this.temp = Object.assign({}, row)
    },
    modifyData() {
      const tmp = Object.assign(this.temp)
      const update = {
        _id: tmp._id
      }
      const options = {
        title: tmp.title,
        content: tmp.content,
        update_time: new Date()
      }
      const reqJson = {
        update: update,
        options: options
      }
      return new Promise((resolve, reject) => {
        modifyTimeline(reqJson)
          .then(res => {
            this.dialogVisible = false
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    cancelData(index, row) {
      const data = {
        _id: row._id
      }
      return new Promise((resolve, reject) => {
        cancelTimeline(data)
      })
    },
    handleCheck(index, row) {
      this.dialogVisible = true
      this.dialogStatus = 'check'
      this.isBtn = false
      this.temp = Object.assign({}, row)
    },
    radioChange(value) {
      this.findTimeline()
    }
  }
}
</script>
<style lang='scss' scoped>
.timeline{
  padding: 5px;
  .options{
    padding: 10px 0;
    .line-button{
      float: right;
    }
  }
}
</style>
