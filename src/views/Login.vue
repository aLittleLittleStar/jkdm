<template>
  <div class="content">
    <el-card class="boxCard">
      <div class="header">
        <span>登录-极客动漫网</span>
      </div>
      <el-form
        :model="loginInfo"
        :rules="loginRules"
        ref="loginInfo">
        <el-form-item prop="email">
          <el-input
            type="email"
            v-model="loginInfo.email"
            auto-complete="off"
            prefix-icon="el-icon-user"
            placeholder="用户名(邮箱)"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            show-password
            type="password"
            v-model="loginInfo.pass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" class="inputCode">
          <el-input v-model="loginInfo.captcha" placeholder="验证码" clearable></el-input>
          <el-tooltip content="点击刷新验证码" placement="top">
            <img class="showCode" src="/manage/verify" @click="changeCodeImg" alt="验证码">
          </el-tooltip>
        </el-form-item>
<!--         <el-form-item>
          <router-link to="/retrieve">
            忘记密码
          </router-link>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitLogin('loginInfo')"
            class="registerBtn">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          还没账号？立即
          <router-link to="/register">
            注册
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "../request/api.js";
export default {
  name: "Login",
  data() {
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
    return {
      loginInfo: {
        email: "",
        pass: "",
        captcha: ""
      },
      loginRules: {
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    }
  },
  methods: {
    submitLogin(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let user = {};
          user.email = this.loginInfo.email;
          user.pwd = this.loginInfo.pass;
          user.captcha = this.loginInfo.captcha;
          console.log("user:", user);

          login(user).then(res=>{
            console.log("res:", res);
            if (res.code === 1) {
              const onLine = (res.code === 1) ? true : false;
              console.log(onLine)
              this.$store.commit("login",
                {
                  userid: res.data.id,
                  username: res.data.email,
                  integral: res.data.integral, // 金币
                  onLine: onLine
                })
              this.$message({message: "恭喜你，登录成功", type: "success",showClose: true, onClose: () => {
                this.$router.push("/");
              }});
            }
          }).catch(err => {
            this.$message.error(err.message);
            this.changeCodeImg();
          })
        } else {
          this.$message({message: "请输入正确的信息", type: "error", showClose: true});
          this.changeCodeImg();
        }
      });
    },
    // 点击验证码图片更新验证码
    changeCodeImg() {
      let img = document.querySelector(".showCode");
      img.setAttribute("src", "/manage/verify");
    }
  }
};
</script>

<style scoped lang="stylus">
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

.registerBtn
  width: 100%

// .el-form .el-form-item:nth-child(4)
//   display: flex
//   justify-content: flex-end
//   margin-bottom: 0


.inputCode >>>
  .el-form-item__content
    display: flex
    .showCode
      border: 1px solid #dcdfe6
      border-radius: 4px
      min-width: 120px
      margin-left: 20px
      height: 36px
      cursor: pointer
</style>
