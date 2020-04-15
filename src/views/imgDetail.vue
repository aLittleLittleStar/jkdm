<template>
  <div class="content">
   <el-card shadow="hover" class="imgItem">
    <div slot="header" class="clearfix">
      <span class="maintitle">{{imgData.title}} - 详情</span>
    </div>
    <img :src="imgData.picture" class="image">
    </img>
    <div class="mainInfo">
      <span>{{imgData.itemTitle}}</span>
      <span :class="imgData.purchase ?'isDownLoad' : ''"><strong>{{imgData.price}}</strong> 金币</span>
    </div>
    <div class="bottom clearfix">
      <div class="time">{{imgData.create_time}}</div>
      <el-button type="text" class="button" @click="downLoadImg(imgData)">{{downLoadText}}</el-button>
    </div>
  </el-card>
  </div>
</template>

<script>
import { getCartoonInfo, setIntegral } from "../request/api.js";
import { downFlie } from "../utils/tool.js";
export default {
  name: "imgDetail",
  data() {
    return {
      isLogin: false,
      imgData: {
        price: 0,
        create_time: '',
        itemTitle: '',
        title: '',
        picture: '',
      },
      downLoadText: '下载'
    }
  },
  mounted() {
    let id = this.$route.params.id
    let cartoon_info_id = this.$route.query.cartoon_info_id
    let search = `${id}?cartoon_info_id=${cartoon_info_id}`
    console.log("search:", search);
    this.getData(search);
    this.userInfo()
  },
  methods: {
    userInfo() {
      this.isLogin = this.$store.state.isLogin
      this.integral = this.$store.state.integral
    },
    getData(id) {
      getCartoonInfo(id).then(res=>{
        if(res.code == 1){
          console.log("res:", res);
          this.imgData = res.data.cartoon_info[0]
          this.imgData.create_time = res.data.create_time
          this.imgData.itemTitle = res.data.title
          if (this.imgData.purchase) {
            this.downLoadText = '已下载(可免费下载)'
          }
          this.imgData.isDownload = false
        }
      }).catch(err => {
        this.$message({ showClose: true,message: err.message,duration:2000,type: "error"})
      });
    },
    downLoadImg(img) {
      console.log("img:", img);
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
        downFlie(img.title, img.picture);
        let id = this.$route.params.id
        let search = `${id}?cartoon_info_id=${img.id}`
        this.getData(search);
        return;
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.content
  min-height: 800px
  padding: 40px 0
  display: flex;
  justify-content: center;
  background: #eee
  .el-card
    margin: 10px 20px
    width: 100%

.el-card__body >>> 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;



.maintitle
  font-size: 20px;
  font-weight: 800;

.imgInfo
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;



.isDownLoad
  text-decoration: line-through;
  color: #aaa;

.time {
  font-size: 13px;
  color: #999;
  float: left;
}

.bottom {
  width: 400px;
  height: 40px;
  line-height: 40px
  margin: 0 auto;
}

.mainInfo
  display: flex;
  justify-content: space-between;
  width: 400px;
  padding-top: 30px
  padding-bottom: 10px
  margin: 0 auto;
  span:nth-child(1)
    font-size: 18px

.bottom span {
  float: left;
}

.button {
  padding: 0;
  float: right;
  line-height: 40px;
}

.image {
  width: 400px;
  display: block;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 4px;
  background:#eee
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

</style>
