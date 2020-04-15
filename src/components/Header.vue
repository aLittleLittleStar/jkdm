<template>
  <el-header>
    <div class="header_wrap">
      <div class="sys_title">
        <h3 class="title">
          极客动漫网
        </h3>
      </div>
      <div class="menu_wrap">
        <el-menu
          :default-active="menu"
          active-text-color="#ffd04b"
          mode="horizontal"
          text-color="#000000"
          router
          @select="changeMenu">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/comic">动漫</el-menu-item>
          <el-menu-item index="/usercenter" v-if="isLogin">个人中心</el-menu-item>
          <el-menu-item index="/aboutus">关于我们</el-menu-item>
        </el-menu>
      </div>
      <div class="user_wrap">
        <el-dropdown trigger="click" v-if="isLogin" @command="handleCommand">
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-switch-button" command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="unLogin" v-else>
          <router-link to="/login">
            <span>登录</span>
          </router-link>
          / 
          <router-link to="/register">
            <span>注册</span>
          </router-link>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import { logout } from "../request/api.js";
export default {
  name: "VHeader",
  data() {
    return {
      userName: this.$store.state.username
    }
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    },
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    // 切换菜单
    changeMenu(menu) {
      this.$store.commit("menuPath", menu);
    },
    handleCommand(command) {
      if(command == "logout"){
        this.logout();
      }
    },
    // 退出
    logout() {
      logout().then(res=>{
        if(res.code == 1){
          this.$store.commit("logout", "");
          this.$router.push("/login");
        }
      }).catch(err => {
        this.$message({ showClose: true,message: err.message,duration:2000,type: "error"})
      });
    }
  },
  computed: {
    // 是否登录
    isLogin() {
      return this.$store.state.isLogin;
    },
    menu() {
      return this.$store.state.menu;
    }
  }
};
</script>

<style scoped lang="stylus">
.el-menu.el-menu--horizontal
  border-bottom: none

.el-header
  box-shadow: 0 0px 6px rgba(0,0,0,0.4);
  width: 100%;
  display: flex;
  justify-content: center;

.el-dropdown-link
  line-height: 60px

.header_wrap
  display: flex
  justify-content: space-between
  align-items: center
  width: 1000px
  .sys_title
    .title
      font-size: 20px;
      letter-spacing: 1px;
  .menu_wrap
    ul
      li
        font-size: 16px
  .user_wrap
    font-size: 16px
    .unLogin
      a
        text-decoration: none
        color: #000000
</style>
