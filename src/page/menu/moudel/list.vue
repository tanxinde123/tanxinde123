 <template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>

      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
          <el-button type="primary" @click="updata(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          <!-- <v-del @del= "del1()"></v-del> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "menu/reqChangeList",
    }),
    //删除按钮
    del(id) {
      this.$confirm("确定删除嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMenuDel(id).then((res) => {
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