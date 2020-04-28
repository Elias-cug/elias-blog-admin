<template>
  <div class="markdown">
    <div class="title-wrapper">
      <el-input v-model="title" placeholder="请输入文章标题" class="title-input" />
      <el-button>保存草稿</el-button>
      <el-button @click="submit">发布</el-button>
      <el-button>清空</el-button>
    </div>
    <div class="container">
      <mavon-editor ref="md" v-model="content" style="min-height: 600px" @imgAdd="$imgAdd" @change="change" />
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible">
      <el-form :model="temp" label-width="100px" label-position="right">
        <el-form-item label="分类名称：">
          <el-select v-model="temp.category" placeholder="请选择分类">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入组件及组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: '',
  components: {
    mavonEditor
  },
  props: [],
  data() {
    return {
      content: '',
      html: '',
      configs: {},
      title: '',
      dialogVisible: false,
      temp: {
        category: {}
      }
    }
  },
  mounted() { },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      const formdata = new FormData()

      this.$upload.post('/上传接口地址', formdata).then(res => {
        console.log(res.data)
        this.$refs.md.$img2Url(pos, res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit() {
      this.dialogVisible = true
      console.log(this.content)
      console.log(this.html)
      // this.$message.success('提交成功，已打印至控制台！')
    }
  }
}
</script>

<style lang="scss">
.markdown {
  position: relative;
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
