<template>
  <div class="login-wrapper">
    <div class="login">
      <h2 class="title">系统登录</h2>

      <el-form class="login-form" :model="loginForm">
        <el-form-item>
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.username" placeholder="账号" />
        </el-form-item>
        <el-form-item>
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
          />
        </el-form-item>

        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: '/' })
        this.$store.dispatch('permission/generateRoutes', ['admin'])
        console.log('登录成功')
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
.login-wrapper {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 10px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(45, 58, 75);
  height: 100%;
  .login {
    text-align: center;
    .title {
      margin-bottom: 30px;
      color: #fff;
    }
    .login-form {
      width: 400px;
      .svg-container {
        padding: 6px;
        color: $dark_gray;
        vertical-align: middle;
        width: 20px;
        display: inline-block;
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
