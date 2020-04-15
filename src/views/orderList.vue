<template>
  <div>
    <VTable :tableHead="tableHead" :tableData="tableData"></VTable>
    <v-page :pageInfo="pageInfo" @changePage="changePage"></v-page>
  </div>
</template>

<script>
import VTable from './../components/table.vue';
import VPage from './../components/Page.vue';
import { getIntegralList } from "../request/api.js";
export default {
  name: "PayList",
  data() {
    return {
      pageInfo:{page:1,limit:10,count:0},
      tableData: [],
      tableHead: [
        { id:1, prop:"id", label:"ID", width:"60"},
        { id:2, prop:"order_num", label:"订单号", width:"200"},
        { id:3, prop:"cartoon_info.price", label:"消耗金币", width:"auto"},
        { id:4, prop:"cartoon_info.title", label:"图片名称", width:"auto"},
        { id:5, prop:"money", label:"剩余金币", width:"auto", type: "number"},
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
      getIntegralList(search).then(res=>{
        if(res.code == 1){
          this.tableData = res.data
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
