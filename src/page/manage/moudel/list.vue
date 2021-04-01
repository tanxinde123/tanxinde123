 <template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="updata(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
          <!-- <v-del @del= "del1()"></v-del> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      page-size：每页显示的条数
      total：总数据条数
     -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "manage/list",
      size: "manage/size",
      total: "manage/total",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "manage/reqChangeList",
      reqChangeTotal: "manage/reqChangeTotal",
      reqchangePage: "manage/reqchangePage",
    }),
    //删除按钮
    del(uid) {
      this.$confirm("确定删除嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqManageDel(uid).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.reqChangeList();
              this.reqChangeTotal();
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
    updata(uid) {
      //去通知父级做某些事   子传父
      this.$emit("updata", uid);
    },
    changePage(e) {
      this.reqchangePage(e);
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqChangeList();
    }
   
      this.reqChangeTotal();
    
  },
};
</script>

<style>
</style>