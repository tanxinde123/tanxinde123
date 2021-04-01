<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '修改菜单'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="list"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { indexRouters } from "../../../router/index";
import { reqRoleAdd, getRoleOne, reqRoleAlter } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        menus: "[]",
        rolename: "",
        status: 1,
      },
    };
  },
  mounted() {
    if (this.list.length === 0) {
      this.reqChangeList();
    }
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
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
        menus: "[]",
        rolename: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },

    //添加按钮 提交
    add() {
      //后台需要字符串数组   this.$refs.tree.getCheckedKeys() 是一个数组 需要 JSON.stringify 转化为字符串
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqRoleAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);

          this.cancel();

          this.reqRoleChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //浅拷贝 列表
    ...mapActions({
      reqChangeList: "menu/reqChangeList",
      reqRoleChangeList: "role/reqChangeList",
    }),

    //获取一条数据
    getOne(id) {
      //接口
      getRoleOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // 设置树形控件
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    //修改按钮
    alter() {
      //别的类型都加上了   但是menus需要再转成字符串数组
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAlter(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //刷新页面
          this.reqRoleChangeList();
          //关闭弹窗并重置数据
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>