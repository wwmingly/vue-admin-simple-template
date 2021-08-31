<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <!-- <h3 class="title">Login Form</h3> -->
        <img src="../../assets/images/logo.png" alt="">
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model.trim="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model.trim="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.native="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="code" class="code_item">
        <el-input
          ref="code"
          v-model.trim="loginForm.code"
          placeholder="请输入验证码"
          name="code"
          type="text"
        />
        <div v-loading="codeLoading" class="bg_image">
          <img :src="codeUrl" @click="codeChange">
        </div>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <el-form-item prop="rememberPword" class="remember_item">
        <el-checkbox v-model="loginForm.rememberPword">记住密码</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Api from '@/api/login'
import { checkRequired } from '@/validator/index.js'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    return {
      codeLoading: false,
      loginForm: {
        username: '',
        password: '',
        rememberPword: false,
        code: ''
      },
      loginRules: {
        username: [...checkRequired('请输入用户名')],
        password: [...checkRequired('请输入密码')],
        code: [...checkRequired('请输入验证码')]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      codeUrl: '',
      uuid: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.initData()
    this.getCode()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    initData() {
      const userInfo = Cookies.get('userInfo')
      const json = userInfo ? JSON.parse(userInfo) : {}
      this.loginForm = {
        ...this.loginForm,
        ...json,
        code: ''
      }
    },
    codeChange() {
      this.throttle(this.getCode, this)
    },
    getCode() {
      this.codeLoading = true
      Api.getCode()
        .then(({ code, img, uuid, msg }) => {
          if (code === 200) {
            this.codeUrl = `data:image/jpg;base64,${img}`
            this.uuid = uuid
          } else {
          }
          console.log(this.codeUrl)
        })
        .finally(() => {
          this.codeLoading = false
        })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', { ...this.loginForm, uuid: this.uuid })
            .then(res => {
              if (res.code === 200) {
                this.$router.push({
                  path: this.redirect || '/',
                  query: this.otherQuery
                })
                if (this.loginForm.rememberPword) {
                  Cookies.set('userInfo', this.loginForm)
                } else {
                  Cookies.remove('userInfo')
                }
              } else {
                this.$message.error(res.msg)
                this.getCode()
              }
            })
            .catch((err) => {
              this.$message.error(res.msg)
              this.getCode()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 限制多次点击
    throttle(method, context) {
      clearTimeout(method.timer)
      method.timer = setTimeout(function() {
        method.call(context)
      }, 800)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg: #283443;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #889aa4;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item,
  .code_item .el-input {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .code_item {
    .el-form-item__content {
      display: flex;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background-image: url(../../assets/images/login_background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 100px;

    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
    .remember_item,
    .code_item {
      background-color: initial;
    }
    .remember_item {
      text-align: right;
    }
    .el-button {
      margin-bottom: 0px !important;
      height: 49px;
    }
    .bg_image {
      height: 46px;
      width: 160px;
      margin-left: 12px;
      cursor: pointer;
      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
