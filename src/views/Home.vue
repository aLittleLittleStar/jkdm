<template>
  <div class="content">
    <el-carousel
      indicator-position="outside"
      height="300px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.picture" :alt="item.title"></img>
      </el-carousel-item>
    </el-carousel>
    <div class="wrapper">
      <h3 class="hotImg">热门图片</h3>
      <div class="box-card" v-for="item in dataList" :key="item.id">
       <div slot="header" class="titleWrap">
         <span class="title">{{item.title}}</span>
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
  </div>
</template>

<script>
import { downFlie } from "../utils/tool.js";
import { getCartoonList, setIntegral, getBannerList } from "../request/api.js";
export default {
  name: "Home",
  data() {
    return {
      isLogin: false,
      integral: 0,
      dataList: [],
      bannerList: []
    }
  },
  mounted() {
    this.$store.commit("menuPath", '/home');
    this.userInfo();
    this.getBannerList();
    this.getDataList();
  },
  methods: {
    userInfo() {
      this.isLogin = this.$store.state.isLogin
      this.integral = this.$store.state.integral
      console.log("this.$store.state:", this.$store.state);
    },
    // 获取动漫列表
    getDataList() {
      let isindex = 1; // 1 表示首页 默认为 0
      let ishot = 1;
      let search = `?ishot=${ishot}&isindex=${isindex}`;
      getCartoonList(search).then(res=>{
        if(res.code == 1) {
          console.log("res:", res);
          this.dataList = res.data;
          this.dataList.forEach(item => {
            item.cartoon_info.forEach(idx => {
              if (idx.purchase) {
                idx.downLoadText = '已下载'
              } else {
                idx.downLoadText = '下载'
              }
            })
          })
        }
      }).catch(err => {
        this.$message({message: err.message, type: "error", showClose: true});
      })
    },
    getBannerList() {
      getBannerList().then(res=>{
        if(res.code == 1) {
          console.log("res:", res);
          this.bannerList = res.data;
        }
      }).catch(err => {
        this.$message({message: err.message, type: "error", showClose: true});
      })
    },
    // 下载图片
    downLoadImg(img) {
      // 先判断是否登录 -> 是否有金币 
      // 1. 如果尚未注册跳转到注册页面 再 判断是否下载过
      // 2. 如果注册但是账号里面没有金币，跳转到人民币兑换金币的界面
      // 3. 如果注册登录且有金币进行下载
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
  padding: 20px 0 40px 0
  min-height: 900px
  background: #eee

.el-carousel__item
  background: #fefefe
  box-shadow: 0 2px 4px rgba(0,0,0,.2)

.box-card
  margin: 40px 20px
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

.el-carousel__container img
  height: 300px

.imgItems
  display: flex;
  flex-wrap: wrap;

.el-card
  margin: 4px

.titleWrap
  margin-bottom: 10px;
  .title
    font-weight: 800
    font-size: 20px

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

.downLoad
  margin-left: 10px;

.hotImg
  padding: 30px 0 20px 0
  font-size: 22px
  border-bottom: 1px solid #eee

.bottom
  display: flex
  align-items: center
  justify-content: space-around

.isDownLoad
  text-decoration: line-through;
  color: #aaa;

</style>
