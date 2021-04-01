<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '修改菜单'"
      :visible.sync="info.isShow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="*活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item class="time">
          <span class="demonstration">活动期限 &nbsp;</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
          
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类">
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
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeSecond">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in thirdArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
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
  reqSeckillAdd,
  reqSeckillOne,
  reqSeckillUpdate,
  reqCateList,
  reqGoodsList,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 用于渲染二级分类
      secondArr: [],
      //渲染商品
      thirdArr: [],

      shortcuts: [
        {
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
      ],
      value1: [],
    };
  },

  computed: {
    ...mapGetters({
      cateList: "cate/list",
      list: "seckill/list",
      goodsList: "goods/list",
    }),
  },
  mounted() {
    this.reqChangeList();
    this.reqFirstList();
    this.reqSecondList();
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
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    //添加按钮 提交
    add() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      reqSeckillAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);

          this.cancel();
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    changeFirst() {
      reqCateList(this.form.first_cateid).then((res) => {
        //清空form里面的second_cateid
        this.form.second_cateid = "";
        //渲染二级分类
        this.secondArr = res.data.list;
      });
    },
    //三级联动
    changeSecond() {
      reqGoodsList({ id: this.form.second_cateid }).then((res) => {
        //清空form里面的second_cateid
        this.form.goodsid = "";
        //渲染二级分类
        this.thirdArr = res.data.list;
      });
    },
    changetime(){
       this.value1 = []
    },
    //浅拷贝 列表
    ...mapActions({
      reqChangeList: "seckill/reqChangeList",
      // 一级分类的action
      reqFirstList: "cate/reqChangeList",
      reqSecondList: "goods/reqChangeList",
    }),
    //获取一条数据
    getOne(id) {
      //接口
      reqSeckillOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;

        this.value1 = [];
        this.value1.push(time(res.data.list.begintime));
        this.value1.push(time(res.data.list.endtime));

        console.log(this.value1);
      });
    },

    //修改按钮

    alter() {
      this.form.begintime =String(this.value1[0].getTime())  ;
      this.form.endtime = String(this.value1[1].getTime()) ;
      console.log(this.form);
      reqSeckillUpdate(this.form).then((res) => {
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
};
function time(params) {
  var a = new Date(Number(params));
  var nian = a.getFullYear(); //年
  var yue = String(a.getMonth() + 1).padStart(2, 0); //月
  var tian = String(a.getDate()).padStart(2, 0); //天
  var hours = String(a.getHours()).padStart(2, 0); //小时
  var fen = String(a.getMinutes()).padStart(2, 0); //分钟
  var miao = String(a.getSeconds()).padStart(2, 0); //分钟
  console.log(nian + "," + yue + "," + tian + "," + hours + "," + fen);
  var time =
    nian + "-" + yue + "-" + tian + " " + hours + ":" + fen + ":" + miao;
  return time;
}
</script>

<style>
.time {
  margin-left: -67px;
}
</style>