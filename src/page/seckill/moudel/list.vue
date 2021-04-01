 <template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" label="活动名称" sortable width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status == 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="updata(scope.row.id)" 
            >编辑</el-button
          >
           <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqSeckillDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "seckill/reqChangeList",
    }),
  //删除按钮
    del(id) {
      this.$confirm("确定删除嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqSeckillDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.reqChangeList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑按钮
    updata(id) {
      //去通知父级做某些事   子传父
      this.$emit("updata", id);
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
</style>