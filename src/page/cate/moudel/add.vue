<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品分类' : '修改商品分类'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" />
            <input type="file" @change="changeFile" v-if="info.isShow" />
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
        <el-button type="info" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >提 交</el-button
        >
        <el-button type="primary" @click="alter" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqCateAdd, getCateOne, reqCateAlter } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },

  methods: {
    //取消
    cancel() {
      this.info.isShow = false;
      this.clear();
    },

    //浅拷贝 列表
    ...mapActions({
      reqChangeList: "cate/reqChangeList",
    }),
    //清除弹框内容
    clear() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    changeFile(e) {
      let file = e.target.files[0];
      // 限制大小file.size      限制大小为2M     B-->1024KB   1024KB-->1M
      if (file.size > 1 * 1024 * 1024) {
        warningAlert("图片大小超出限制");
        return;
      }
      // URL.createObjectURL   可以将图片信息转换成具体的图片
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //添加按钮
    add() {
      reqCateAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取一条数据
    getOne(id) {
      //接口
      getCateOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgUrl + res.data.list.img;
      });
    },
    //修改按钮
    alter() {
      reqCateAlter(this.form).then((res) => {
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
    if (this.list.length == 0) {
      this.reqChangeList();
    }
  },
};
</script>

<style>
.fileBox {
  width: 150px;
  height: 150px;
  border: 1px dashed #424242;
  position: relative;
}
.fileBox input {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 11;
}
.fileBox h3 {
  font-size: 50px;
  font-weight: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fileBox img {
  width: 150px;
  height: 150px;
  position: absolute;
  z-index: 10;
}
</style>