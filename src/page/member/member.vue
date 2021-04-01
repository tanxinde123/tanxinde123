<template>
  <div>
    <v-list @updata="childUpdata"></v-list>
    <v-add :info="isShow" ref="aaa"></v-add>
  </div>
</template>

<script>
import vList from "./moudel/list"
import vAdd from "./moudel/add"
export default {
 data() {
    return {
      isShow: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    vList,
    vAdd,
  },
  methods: {
    //修改
    childUpdata(uid) {
      this.isShow.isShow = true;

      this.$refs.aaa.getOne(uid);
    },
  },
};

</script>

<style>

</style>