<template>
  <div class="content">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VFooter from "@/components/Footer";
import VHeader from "@/components/Header";

export default {
  name: "Index",
  components: {
    VHeader,
    VFooter
  }
};
</script>

<style lang="stylus" scoped>
.content
  overflow: hidden
</style>
