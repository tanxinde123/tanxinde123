<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="*规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="inpTop">
            <el-input v-model="item.value"></el-input>
            <el-button
              type="primary"
              @click="addArr"
              v-if="index == 0"
              v-model="form.attrs"
              >新增规格属性</el-button
            >
            <el-button
              type="danger"
              @click="delArr(index)"
              v-else
              v-model="form.attrs"
              >删除</el-button
            >
          </div>
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
  reqSpecsAdd,
  reqSpecsOne,
  reqSpecsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "[]",
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
      reqChangeList: "specs/reqChangeList",
      reqChangeTotal: "specs/reqChangeTotal",
 
    }),
    addArr() {
      this.attrArr.push({ value: "" });
    },
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    //取消
    cancel() {
      this.info.isShow = false;
      this.clear();
    },

    //清除弹框内容
    clear() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrArr = [{ value: "" }, { value: "" }]
    },
    //添加按钮
    add() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
         this.reqChangeList();
          this.reqChangeTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getOne(id) {
      //接口
      reqSpecsOne(id).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(this.form.attrs).map(item=>({value:item}))  
      });
    },
    //修改按钮
    alter() {
      reqSpecsUpdate(this.form).then((res) => {
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
    },
  },
  mounted() {
    // if (this.list.length === 0) {
    //   this.reqChangeList();
    // }
  },
};
</script>

<style>
.inpTop {
  width: 350px;
  position: relative;
}
.inpTop button {
  position: absolute;
  left: 0;
  left: 350px;
}
.el-dialog {
  width: 600px;
}
</style>