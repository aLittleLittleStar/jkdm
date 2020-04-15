<template>
  <div class="content">
    <el-card class="boxCard">
      <div class="header">
        <span>找回密码-极客动漫网</span>
      </div>
      <el-form
        :model="Info"
        :rules="loginRules"
        ref="Info">
        <el-form-item prop="email">
          <el-input
            type="email"
            v-model="Info.email"
            auto-complete="off"
            prefix-icon="el-icon-user"
            placeholder="用户名(邮箱)"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" class="inputCode">
          <el-input
            v-model.trim="Info.code"
            auto-complete="off"
            prefix-icon="el-icon-message"
            placeholder="验证码"
            clearable>
          </el-input>
          <el-button
            @click="getCodeInfo()"
            class="sendBtn"
            :disabled="titleDisabled">
            发送验证码
          </el-button>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            show-password
            type="password"
            v-model="Info.pass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            show-password
            type="password"
            v-model="Info.checkPass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="确认密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitLogin('Info')"
            class="registerBtn">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import { login } from "../request/api.js";
export default {
  name: "Retrieve",
  data() {
    const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let checkEmail = (rule, value, callback) => {
      // 验证邮箱格式
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else if (!emailReg.test(value)) {
        return callback(new Error("请输入正确的邮箱格式"));
      }
      callback();
    }
    return {
      title: '发送邮箱验证码',
      titleDisabled: false,
      timer: null,
      count: '',
      Info: {
        email: "",
        code: "",
        pass: "",
        checkPass: ""
      },
      loginRules: {
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入确认密码", trigger: "blur" }],
      }
    }
  },
  methods: {
    submitLogin(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let user = {};
          user.email = this.Info.email;
          user.pwd = this.Info.pass;

          console.log("user:", user);
          // login(user).then(res=>{
          //   console.log("res:", res);
          //   if (res.code === 1) {
          //     this.$message({message: "恭喜你，登录成功", type: "success",showClose: true});
          //     const onLine = (res.code == 1) ? true : false;
          //     console.log(onLine)
          //     this.$store.commit("login",
          //       {
          //         username: res.data.email,
          //         realname: res.data.real_name,
          //         userid: res.data.id,
          //         onLine: onLine
          //       })
          //     this.$router.push("/");
          //     this.$store.commit("menuPath", "/home");
          //   }
          // }).catch(err => {
          //   this.$message.error(err.message);
          // })
        } else {
          this.$message({message: "请输入正确的信息", type: "error", showClose: true});
        }
      });
    },
    getCodeInfo() {
      const TIME_COUNT = 60;
      // 检查邮箱是否填写且格式是否正确
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!this.Info.email) {
        this.$message({message: "邮箱不能为空！", type: "error", showClose: true});
      } else if(!(emailReg.test(this.Info.email))) {
        this.$showMessage('error', '请输入正确的邮箱格式')
      } else {
        // 获取短息验证码
        let search = `?email=${this.Info.email}`
        // get_code(search).then(res=>{
        //   console.log("res:", res)
        //   if(res.code == 1) {
        //     this.$message({message: "请输入正确的信息", type: "error", showClose: true});
        //     this.$showMessage('success', '已成功发送验证码，请注意查看')
        //     if (!this.timer) {
        //       this.count = TIME_COUNT
        //       this.titleDisabled = true
        //     }
        //     this.timer = setInterval(() => {
        //       if(this.count > 0 && this.count <= TIME_COUNT){
        //         this.count --
        //         this.title = `${this.count}s 后重新发送`
        //       } else {
        //         this.title = '发送邮箱验证码'
        //         this.titleDisabled = false
        //         clearInterval(this.timer)
        //         this.timer = null
        //       }
        //     }, 1000) 
        //   }
        // }).catch(err => {
        //   this.$message({message: err.message, type: "error", showClose: true});
        // })
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.content
  width: 100%
  height: 100%
  text-align: center
  display: flex
  justify-content: center
  align-items: center
  .boxCard
    margin: 0 auto
    max-width: 480px
    .header
      font-size: 22px
      padding: 20px 0 40px
      letter-spacing: 1px
      font-weight: bold
    .el-form
      padding: 0 30px

.el-form >>> .inputCode .el-form-item__content
  display: flex
  flex-direction: row

.sendBtn
  width: 60%
  margin-left: 20px

.registerBtn
  width: 100%




</style>
