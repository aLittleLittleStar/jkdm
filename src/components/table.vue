<template>
  <div class="table">
    <el-table 
      :data="tableData" border style="width: 100%"
      :row-key="getRowKeys"
      :show-summary="showSummary">
      </el-table-column>
      <el-table-column :data='tableHead'
        v-for="(headitem, index) in tableHead" :key="headitem.id" 
        :prop="headitem.prop" :label="headitem.label" :width="headitem.width"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: ['tableData','tableHead', 'showSummary', 'showTotalArr'],
    data() {
      return {}
    },
    methods: {
      getRowKeys(row) {
        return row.id;
      },
      // 展示前处理数据
      beforeUpdate(){
        var data = this.tableData
        if(!data){return}
        for(var i = 0;i<data.length;i++){
          if(data[i].set_time){
            data[i].set_time = moment(data[i].set_time).format('YYYY-MM-DD HH:mm:ss')
          } else {
            data[i].set_time = '---';
          }
          if(data[i].createdAt){
            data[i].createdAt = moment(data[i].createdAt).format('YYYY-MM-DD')
          } else {
           data[i].createdAt = '---'
          }
        }
      this.tableData = data
    }
  }
}
</script>

<style lang='stylus' scoped>
.el-table
  margin:16px 0;
.operaWarp
  display:inline-block;
  .el-button
    margin-right:8px
.switch-box{
  display:flex;
  flex-direction: row;
}
.switch-title{
  white-space: nowrap;
  margin-right:6px;
  font-weight: 600;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  background-color: #ececec;
}
.el-input--medium.inline-block 
  display: inline-block;
  width: 100px;
</style>