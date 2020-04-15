<template>
  <div>
    <VTable :tableHead="tableHead" :tableData="tableData"></VTable>
    <v-page :pageInfo="pageInfo" @changePage="changePage"></v-page>
  </div>
</template>

<script>
import VTable from './../components/table.vue';
import VPage from './../components/Page.vue';
import { getOrderList } from "../request/api.js";
export default {
  name: "OrderList",
  data() {
    return {
      pageInfo:{page:1,limit:10,count:0},
      tableData: [],
      tableHead: [
        { id:1, prop:"id", label:"ID", width:"60"},
        { id:2, prop:"money", label:"充值金额", width:"100"},
        { id:3, prop:"pay_type_name", label:"支付方式", width:"auto"},
        { id:4, prop:"front_gold", label:"充值前金币", width:"auto", type: "number"},
        { id:5, prop:"after_gold", label:"充值后金币", width:"auto", type: "number"},
        { id:6, prop:"create_time", label:"创建时间", width:"160"},
      ],
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      let search = `?p=${this.pageInfo.page}&limit=${this.pageInfo.limit}`
      getOrderList(search).then(res=>{
        if(res.code == 1){
          this.tableData = JSON.parse(JSON.stringify(res.data))
          this.tableData.forEach(item => {
            item.pay_type_name = ['', '支付宝', '微信'][item.pay_type]
          })
          this.pageInfo.count = res.count;
        }
      }).catch(err => {
        this.$message({ showClose: true,message: err.message,duration:2000,type: "error"})
      });
    },
    changePage:function(pageInfo){
      this.pageInfo = pageInfo;
      this.getDataList();
    },
  },
  components: {
    VTable,
    VPage
  }
};
</script>
