<template>
  <div class="content">
    <div class="wrapper">
      <div class="box-card" v-for="item in dataList" :key="item.id">
       <div slot="header" class="titleWrap">
         <span class="title">{{item.title}}</span>
         <div class="right">
           <span>{{item.cartoon_info.length}}个表情</span>
         </div>
       </div>

       <div class="imgItems">
         <el-card shadow="hover" v-for="child in item.cartoon_info" :key="child.id" class="imgItem">
            <img :src="child.picture" :alt="child.title" lazy @click="goToDetail(item.id, child)" class="img">
            </img>
            <div class="bottom clearfix">
              <span :class="child.purchase ?'isDownLoad' : ''"><strong>{{child.price}}</strong> 金币</span>
              <el-button class="downLoad" @click="downLoadImg(child)" type="text">{{child.downLoadText}}</el-button>
            </div>
          </el-card>
       </div>
     </div>
    </div>
    <v-page :pageInfo="pageInfo" @changePage="changePage"></v-page>
  </div>
</template>

<script>
import vPage from "../../components/Page.vue";
import { downFlie } from "../../utils/tool.js";
import { getCartoonList, setIntegral } from "../../request/api.js";
export default {
  name: "Comic",
  data() {
    return {
      isLogin: false,
      integral: 0,
      pageInfo:{page: 1, limit: 2, count: 0},
      dataList: [],
    }
  },
  mounted() {
    this.$store.commit("menuPath", '/comic');
    this.userInfo();
    this.getDataList();
  },
  methods: {
    userInfo() {
      this.isLogin = this.$store.state.isLogin
      this.integral = this.$store.state.integral
    },
    // 获取动漫列表
    getDataList() {
      let search = `?p=${this.pageInfo.page}&limit=${this.pageInfo.limit}&ishot=1`;
      getCartoonList(search).then(res=>{
        if(res.code == 1) {
          console.log("res:", res);
          this.dataList = res.data;
          this.pageInfo.count = res.count;
          this.dataList.forEach(item => {
            item.cartoon_info.forEach(idx => {
              if (idx.purchase) {
                idx.downLoadText = '已下载'
              } else {
                idx.downLoadText = '下载'
              }
            })
            console.log("this.dataList:", this.dataList);
          })
        }
      }).catch(err => {
        this.$message({message: err.message, type: "error", showClose: true});
      })
    },
    // 下载图片
    downLoadImg(img) {
      // 先判断是否登录 -> 是否有金币 
      // 1. 如果尚未注册跳转到注册页面 
      // 2. 如果注册但是账号里面没有金币，跳转到人民币兑换金币的界面
      // 3. 如果注册登录且有金币进行下载
      console.log("img:",img);
      if (!this.isLogin) {
        this.$message({ showClose: true, message: "你还未登录,正跳转至登录页面", duration:2000, type: 'warning', onClose: () => {
          this.$router.push('/login')
        }});
      } else if(img.purchase) {
        downFlie(img.title, img.picture);
      } else if(this.integral*100 <= 0  && !img.purchase) {
        this.$message({ showClose: true, message: "你的账户暂无金币,正跳转至充值页面", duration:2000, type: 'warning', onClose: () => {
          this.$router.push('/recharge')
        }});
      } else {
        this.buyInfo(img);
      }
    },
    changePage:function(pageInfo) {
      this.pageInfo = pageInfo;
      this.getDataList();
    },
    buyInfo(img) {
      this.$confirm(`购买此图片需花费${img.price}金币`, '购买提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 下载并扣除金币
        if (this.integral < img.price) {
          this.$message({ showClose: true, message: "你的账户金币不足,正跳转至充值页面", duration:2000, type: 'warning', onClose: () => {
            this.$router.push('/recharge');
          }});
          return;
        }
        this.integral -= img.price;
        this.setIntegral(img.id);
        console.log("img:", img);
        this.$store.commit('changeIntegral', this.integral);
        console.log("this.integral:",this.integral);
        downFlie(img.title, img.picture);
        this.getDataList();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消购买',
          duration:2000,
          showClose: true
        });
      });
    },
    // 消耗积分
    setIntegral(id) {
      setIntegral(id).then(res=>{
        if(res.code == 1) {
          this.$message({ showClose: true, message: "下载成功", duration:2000, type: 'success'});
        }
      }).catch(err => {
        this.$message({message: err.message, type: "error", showClose: true});
      })
    },
    goToDetail(item, info) {
      let id =  `${item}?cartoon_info_id=${info.id}`
      this.$router.push('/imgDetail/'+id)
    }
  },
  components: {
    vPage
  }
};
</script>

<style scoped lang="stylus">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.content
  padding: 20px 0
  min-height: 900px
  background: #eee

.wrapper
  display: flex;
  flex-direction: column;
  align-items: center;

.box-card
  margin: 40px 20px
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1236px

.imgItems
  display: flex;
  flex-wrap: wrap;
  width: 1200px;

.el-card
  margin: 4px

.el-card >>> .el-card__body
  padding: 18px;
  width: 190px;
  // height: 200px;
  box-sizing: border-box;


.img
  height: 140px;
  border-radius: 2px;
  cursor: pointer;
  margin: 0 -100%;

.right
  margin: 10px 0;
  line-height: 40px;
  height: 40px;
  span
    display: block;
    margin: 0 auto;

.titleWrap
  .title
    font-weight: 800
    font-size: 20px
  .subtitle
    font-weight: 800
    font-size: 18px

.downLoad
  margin-left: 10px;

.bottom
  display: flex
  align-items: center
  justify-content: space-around

.isDownLoad
  text-decoration: line-through;
  color: #aaa;

</style>
