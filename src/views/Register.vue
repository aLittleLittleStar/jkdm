<template>
  <div class="content">
    <el-card class="boxCard">
      <div class="header">
        <span>注册-极客动漫网</span>
      </div>
      <el-form
        :model="registerInfo"
        :rules="registerRules"
        ref="registerInfo">
        <el-form-item prop="email">
          <el-input
            type="email"
            v-model.trim="registerInfo.email"
            auto-complete="off" 
            prefix-icon="el-icon-user"
            placeholder="邮箱"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model.trim="registerInfo.name"
            auto-complete="off"
            prefix-icon="el-icon-user"
            placeholder="姓名"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="idNumber">
          <el-input
            v-model.trim="registerInfo.idNumber"
            auto-complete="off"
            prefix-icon="el-icon-key"
            placeholder="身份证号"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            show-password
            type="password"
            v-model.trim="registerInfo.pass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="登录密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            show-password
            type="password"
            v-model.trim="registerInfo.checkPass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="确认密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <span class="span">
            <el-checkbox v-model="checked">同意</el-checkbox>
            <router-link to="/agreement">《注册协议》和《隐私政策》</router-link>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitRegister('registerInfo')"
            class="registerBtn">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          已有账号  
          <router-link to="/login">
            <el-button type="text">
               登录
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from "../request/api.js";
export default {
  name: 'Register',
  data () {
    let checkEmail = (rule, value, callback) => {
      // 验证邮箱格式
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else if (!emailReg.test(value)) {
        return callback(new Error("请输入正确的邮箱格式"));
      }
      callback();
    }
    let checkIdNumber = (rule, value, callback) => {
      //验证长度与格式规范性的正则
      //第一代身份证15位
      const reg15 = new RegExp(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/)
      // 第二代身份证18位
      const reg18 = new RegExp(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)
      if (!value) {
        return callback(new Error('身份证号不能为空！'))
      } else if (!reg15.test(value) && !reg18.test(value)) {
        return callback(new Error('身份证号格式不正确'))
      }
      callback()
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录密码'))
      } else {
        if (this.registerInfo.checkPass !== '') {
          this.$refs.registerInfo.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerInfo.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      checked: true,
      registerInfo: {
        eamil: '',
        pass: '',
        checkPass: '',
        idNumber: ''
      },
      registerRules: {
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        idNumber: [{ required: true, validator: checkIdNumber, trigger: 'blur' }],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitRegister (formName) {
      if (!this.checked) {
        this.$message({message: "需同《意用户协议》及《隐私政策》才可注册！", type: "warning", showClose: true});
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('valid:', valid)
          let user = {}
          user.email = this.registerInfo.email
          user.pwd = this.registerInfo.pass
          user.name = this.registerInfo.name
          user.again_pwd = this.registerInfo.checkPass
          user.card = this.registerInfo.idNumber
          console.log("user:", user);
          register(user).then(res=>{
            console.log("res:", res)
            if(res.code == 1) {
              this.$message({message: "恭喜你，注册成功，正跳转至登录页面", type: "success", showClose: true, onClose: () => {
                this.$router.push('/login')
              }});
            }
          }).catch(err => {
            this.$message({message: err.message, type: "error", showClose: true});
          })
        } else {
          this.$message({message: "请输入正确的信息", type: "error", showClose: true});
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
a
  text-decoration: none
  color: #3ea9c1

.content
  width: 100%
  height: 100%
  text-align: center
  display: flex
  justify-content: center
  align-items: center
  .boxCard
    min-width: 480px
    .header
      font-size: 22px
      padding: 20px 0 40px
      letter-spacing: 1px
      font-weight: bold
    .el-form
      padding: 0 30px

.sendBtn
  width: 60%
  margin-left: 20px

.registerBtn
  width: 100%

.el-form-item__content
  .span
    float: left

</style>
