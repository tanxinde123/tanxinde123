<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '修改菜单' : '修改菜单'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="*手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="*昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="alter">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMemberOne, reqMemberAlter } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },

  methods: {
    //取消
    cancel() {
      this.info.isShow = false;
      this.clear();
    },

    //清除弹框内容
    clear() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },

    //浅拷贝 列表
    ...mapActions({
      reqChangeList: "member/reqChangeList",
    }),
    //获取一条数据
    getOne(uid) {
      //接口
      reqMemberOne(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    //修改按钮

    alter() {
      if (this.form.password) {
        reqMemberAlter(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //刷新页面
            this.reqChangeList();
            //关闭弹窗并重置数据
            this.cancel();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }else{
        warningAlert("请输入密码")
      }
    },
  },
};
</script>

<style>
</style>