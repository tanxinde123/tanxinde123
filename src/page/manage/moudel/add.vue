<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >提 交</el-button
        >
        <el-button type="primary" @click="alter" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqManageAdd,
  reqManageOne,
  reqManageUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    //浅拷贝 列表
    ...mapActions({
      reqChangeList: "role/reqChangeList",
      reqManageList: "manage/reqChangeList",
      reqChangeTotal:"manage/reqChangeTotal"
    }),

    //取消
    cancel() {
      this.info.isShow = false;
      this.clear();
    },

    //清除弹框内容
    clear() {
      this.form = {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加按钮
    add() {
      reqManageAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqManageList();
          this.reqChangeTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getOne(uid) {
      //接口
      reqManageOne(uid).then((res) => {
        this.form = res.data.list;
        this.form.roleid = res.data.list.roleid;
        this.form.password = "";
      });
    },
    //修改按钮
    alter() {
      reqManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //刷新页面
          this.reqManageList();
          //关闭弹窗并重置数据
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.list.length === 0) {
      this.reqChangeList();
    }
  },
};
</script>

<style>
</style>