 <template>
  <div>
    <el-table
      :data="goodslist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="goodsname" label="分类名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格" sortable>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div class="imgBox">
            <img :src="$imgUrl + scope.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button v-if="scope.row.isnew == 1" type="primary" circle
              >是</el-button
            >
            <el-button v-else type="info" circle>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rolename" label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button v-if="scope.row.ishot == 1" type="primary" circle
              >是</el-button
            >
            <el-button v-else type="danger" circle>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="updata(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
import { reqGoodsDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      goodslist: "goods/list",
      size: "goods/size",
      total: "goods/total",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "goods/reqChangeList",
      reqChangeTotal: "goods/reqChangeTotal",
      reqchangePage: "goods/reqchangePage",
    }),
    changePage(e) {
      console.log(e);
      this.reqchangePage(e);
    },
    //删除按钮
    del(id) {
      this.$confirm("确定删除嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqGoodsDel(id).then((res) => {
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
    if (this.goodslist.length == 0) {
      this.reqChangeList();
    }
 
      this.reqChangeTotal();
   
  },
};
</script>

<style>
.imgBox img {
  width: 120px;
  height: 120px;
}
</style>