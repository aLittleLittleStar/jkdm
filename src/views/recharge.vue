<template>
  <div class="content">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <h3>充值</h3>
      </div>
      <div class="subTitle">
        <div class="subinfo">账户余额</div>
        <div class="submoney"><strong>{{nowMoney}}</strong> 金币</div>
      </div>
      <div class="rechargeWrap">
        <div class="rulesInfo">
          <span>1元人民币 = 100金币</span>
        </div>
        <div class="paymoneyItems">
          <div class="item" :class="{'active': select == item.value}" v-for="item in money" @click="selectPayMoney(item)" ref="item">
            <span class="name">{{item.name}}金币</span>
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="payStyle">
        <div class="rulesInfo"><span>选择支付方式</span></div>
        <div class="payList">
          <div class="payItem">
            <img src="../assets/weixin.jpg" alt="微信支付">
            <div class="desc">微信支付</div>
            <el-radio v-model="payType" label="1">微信支付</el-radio>
          </div>
          <div class="payItem">
            <img src="../assets/zhifubao.jpg" alt="支付宝支付">
            <div class="desc">支付宝支付</div>
            <el-radio v-model="payType" label="2">支付宝支付</el-radio>
          </div>
        </div>
      </div>
      <el-button @click="payMoney">立即充值</el-button>
    </el-card>

    <div class="recharge-wrap" v-if="payImg">
      <div class="img-content">
        <div class="item">
          <img src="../assets/pay.jpg" alt="微信支付" v-if="payType == 1">
          <img src="../assets/zfb.jpg" alt="支付宝支付" v-else>
        </div>
      </div>
      <div class="tips">
        支付成功之后请截图联系客服人员
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Recharge",
  data() {
    return {
      payType: "1",
      select: "1",
      payImg: false,
      money: [
        {id: 1, name: 100, title: '需支付1元', value: 1},
        {id: 2, name: 500, title: '需支付5元', value: 5},
        {id: 3, name: 1000, title: '需支付10元', value: 10},
        {id: 4, name: 5000, title: '需支付50元', value: 50},
        {id: 5, name: 10000, title: '需支付100元', value: 100}
      ]
    }
  },
  computed: {
    nowMoney() {
      return this.$store.state.integral
    }
  },
  methods: {
    selectPayMoney(item) {
      console.log("item:", item);
      this.select = item.value
    },
    payMoney() {
      let data = {}
      data.pay_type = this.payType
      data.type = this.select
      this.payImg = !this.payImg
    }
  }
};
</script>

<style lang="stylus" scoped>
.content
  display: flex;
  justify-content: center;
  padding: 40px 0;
  min-height: 800px
  background: #eee


.box-card
  width: 800px
  width: 100%
  margin: 10px 20px
  .clearfix
    h3
      font-size: 24px

.subTitle
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: #666;
  line-height: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;

.rulesInfo
  width: 100%;
  height: 40px;
  background: #eee;
  span
    font-size: 18px
    color: #888;
    line-height: 40px;
    float: left;

.paymoneyItems
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 10px;
  .item
    width: 100px
    height: 80px
    background: #f7f6f9
    color: #aaa
    display: flex;
    flex-direction: column;
    margin-bottom: 10px
    border-radius: 4px
    cursor: pointer
    .name
      font-size: 18px;
      font-weight: 800;
      padding: 14px 0;

.paymoneyItems .active
  color: #fff;
  background: #02c294;
  box-shadow: 0 2px 3px #019c77

.payList
  display: flex;
  flex-direction: column;
  margin:  30px 0
  .payItem
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    line-height: 40px;
    margin: 10px 0;
    img
      width: 40px
      height: 40px
      box-shadow: none
    .desc
      font-size: 18px
      color: #444




.recharge-wrap
  position: absolute;
  background: #fff;
  z-index: 999;
  padding-top: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);


.recharge-wrap img
  width: 240px
  border-radius: 4px;

.tips
  margin: 20px
  font-size: 18px
  color: #666
</style>
