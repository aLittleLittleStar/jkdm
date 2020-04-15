<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header">
        <span>个人中心</span>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="item">
            <div class="item-title">姓名：</div>
            <div class="item-info">{{info.name}}</div>
          </div>
          <div class="item">
            <div class="item-title">注册邮箱：</div>
            <div class="item-info">{{info.email}}</div>
          </div>
          <div class="item">
            <div class="item-title">金币：</div>
            <div class="item-info">{{info.integral}}</div>
            <router-link to="/recharge">
              <el-button class="gopay" type="text">金币不足? 去充值</el-button>
            </router-link>
          </div>
          <div class="item">
            <div class="item-title">身份证：</div>
            <div class="item-info">{{info.card}}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="充值记录" name="second">
          <PayList></PayList>
        </el-tab-pane>
        <el-tab-pane label="购买记录" name="third">
          <OrderList></OrderList>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import PayList  from './payList.vue'
import OrderList  from './orderList.vue'
import { getUserInfo } from "../request/api.js";
export default {
  name: "UserCenter",
  data() {
    return {
      activeName: 'first',
      info: {},
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res=>{
        if(res.code == 1){
          this.info = res.data
          console.log("res:", res);
        }
      }).catch(err => {
        this.$message({ showClose: true,message: err.message,duration:2000,type: "error"})
      });
    },
  },
  components: {
    PayList,
    OrderList
  }
};
</script>

<style scoped lang="stylus">
.content
  min-height: 900px
  display: flex
  justify-content: center
  padding: 40px 0
  background: #eee
  .el-card
    margin: 10px 20px
    width: 100%
    div
      span
        font-size: 20px

.item
  display: flex
  margin: 20px
  font-size: 18px
  color: #444
  line-height: 40px;
  height: 40px;

.gopay
  margin-left: 20px
  
.page
  float: left

</style>
