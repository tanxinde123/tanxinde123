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
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>

      <el-table-column prop="phone" label="手机号"> </el-table-column>
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "member/reqChangeList",
    }),
    //删除按钮

    //编辑按钮
    updata(uid) {
      //去通知父级做某些事   子传父
      this.$emit("updata", uid);
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