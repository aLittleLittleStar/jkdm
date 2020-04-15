<template>
  <div class="content">
    <div class="link">
      <span
        @click="clickItem(item.name)"
        v-for="item in dataList"
        :key="item.id"
        v-text="item.title"></span>
    </div>
    <div class="company">{{company}}</div>
    <div class="info">
      <span v-for="item in info">{{item}}</span>
    </div>
    <div class="item">{{copyright}}</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      dataList: [
        {id: 1, title: "关于我们", name: "aboutus"},
        {id: 2, title: "注册协议", name: "register"},
        {id: 3, title: "联系我们", name: "aboutus"},
        {id: 4, title: "纠纷处理制度", name: "rulesData"},
        {id: 5, title: "投诉指引", name: "complaintData"}
      ],
      company: '北京极客梦想科技有限公司',
      info: [
        "北京市朝阳区金盏乡金盏村512号东区2层205",
        "联系电话：010-65288428",
      ],
      copyright: 'Copyright 2019 Jkdmwh.com. All Rights Reserved'
    }
  },
  methods: {
    clickItem(name) {
      console.log("name:", name);
      this.$store.commit('changeAboutUsitem', name)
      this.$router.push('/aboutus')
    }
  }
};
</script>

<style scoped lang="stylus">
a
  text-decoration: none

.content
  height: 200px
  margin: 0 auto
  width: 100%
  background: #282828
  font-size: 14px
  color: #fff

.link
  line-height: 40px
  padding-top: 40px
  span
    margin: 0 4px
    &:hover
      cursor: pointer

.item-list
  line-height: 20px

.info
  line-height: 32px
  span
    margin-left: 10px
    &:hover
      cursor: pointer

.item
  line-height: 32px

.company
  font-size: 16px
  line-height: 32px

</style>
