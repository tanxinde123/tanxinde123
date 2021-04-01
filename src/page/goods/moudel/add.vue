<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '修改菜单'"
      :visible.sync="info.isShow"
      @close="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="*一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" />
            <input type="file" @change="changeFile" v-if="info.isShow" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specsArr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <div id="div1">
             
          </div>
         
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
  reqCateList,
  reqGoodsAdd,
  reqGoodsOne,
  reqGoodsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 用于渲染二级分类
      secondArr: [],
      // 用于渲染图片
      imgUrl: "",
      // 用于渲染规格属性
      specsArr: [],
    };
  },

  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },

  methods: {
    //监听一级分类 改变时 获取二级分类目录
    changeFirst() {
      reqCateList(this.form.first_cateid).then((res) => {
        // 清空form里面的second_cateid
        this.form.second_cateid = "";
        // 用于渲染二级分类
        this.secondArr = res.data.list;
      });
    },

    changeSpecs() {
      // 清空规格属性
      this.specsArr = [];
      this.form.specsattr = [];

      // 找到specsList里面id是我需要的那一条数据
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      console.log(obj);
      // 把那一条数据的attrs赋值给我的specsArr
      this.specsArr = obj.attrs;
    },
    ...mapActions({
      // 一级分类的action
      reqFirstList: "cate/reqChangeList",
      // 商品规格的action
      reqSpecs: "specs/reqChangeList",
      // 请求列表数据
      reqChangeList: "goods/reqChangeList",
      // 总数量
      reqChangeTotal: "goods/reqChangeTotal",
    }),
    //取消
    cancel() {
      this.info.isShow = false;
      this.clear();
    },
    close() {
      this.info.isShow = false;
      this.clear();
    },
    opened(){
      this.editor = new E('#div1')
      this.editor.create()
      this.editor.txt.html(this.form.description)
    },
    //清除弹框内容
    clear() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      this.secondArr = [];
      this.specsArr = [];
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
      this.form.description = this.editor.txt.html()
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      
      reqGoodsAdd(data).then((res) => {
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
      reqGoodsOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgUrl + res.data.list.img;
        reqCateList({ pid: this.form.first_cateid }).then((res) => {
          // 用于渲染二级分类
          this.secondArr = res.data.list;
        });
        this.form.specsattr = JSON.parse(this.form.specsattr);
        // 找到specsList里面id是我需要的那一条数据
        let obj = this.specsList.find((item) => item.id == this.form.specsid);

        // 把那一条数据的attrs赋值给我的specsArr
        this.specsArr = obj.attrs;
      });
    },
    //修改按钮
    alter() {
      this.form.description = this.editor.txt.html()
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsUpdate(data).then((res) => {
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
    if (this.cateList.length === 0) {
      this.reqFirstList();
    }
    if (this.specsList.length === 0) {
      this.reqSpecs(true);
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