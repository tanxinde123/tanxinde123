<template>
  <div>
    <el-button type="primary" @click="changAdd">添加</el-button>
    <v-list @updata="childUpdata"></v-list>
    <v-add :info = "isShow" ref="aaa"></v-add>
  </div>
</template>

<script>
import vList from "./moudel/list";
import vAdd from "./moudel/add";

export default {
  data() {
    return {
      isShow: {
        isShow: false,
        isAdd: true
      },
    };
  },
  components: {
    vList,
    vAdd,
  },
  methods: {
    //添加
    changAdd() {
      this.isShow.isShow= true
      this.isShow.isAdd = true
    },
    //修改
    childUpdata(id){
      this.isShow.isShow=true
      this.isShow.isAdd = false  
      this.$refs.aaa.getOne(id)
    }
  },
};
</script>

<style>
</style>