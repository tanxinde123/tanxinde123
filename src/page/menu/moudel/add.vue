<template>
  <div>
    <el-dialog :title="info.isAdd?'添加菜单':'修改菜单'" :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="changepid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio :label="1" v-model="form.type"  disabled>目录</el-radio>
          <el-radio :label="2" v-model="form.type"  disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择上级菜单">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择上级菜单">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">提 交</el-button>
        <el-button type="primary" @click="alter" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRouters } from "../../../router/index";
import { reqMenuAdd, getMenuOne,reqMenuAlter} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      indexRouters: indexRouters,

      //图标
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],

      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
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
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },

    //添加按钮
    add() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //浅拷贝 列表
    ...mapActions({
      reqChangeList: "menu/reqChangeList",
    }),
     //pid改变 type 也要改变
    changepid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //获取一条数据
    getOne(id){
      //接口
      getMenuOne(id).then(res=>{
           this.form = res.data.list
           this.form.id = id
      })
    },
    //修改按钮
    alter(){
         reqMenuAlter(this.form).then(res=>{
            if(res.data.code == 200){
              successAlert(res.data.msg)
              //刷新页面
              this.reqChangeList()
              //关闭弹窗并重置数据
              this.cancel()
            }else{
              warningAlert(res.data.msg)
            }
         })
    }
  },
};
</script>

<style>
</style>