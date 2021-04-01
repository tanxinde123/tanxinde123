<template>
  <div>
    <!-- 容器 -->
    <div id="box"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqChangeList",
    }),
  },
  // watch: {
  //   list: {
  //     handler() {

  //     },
  //     deep: true,
  //   },
  // },
  mounted() {
    this.reqList();
    var myChart = echarts.init(document.getElementById("box"));
    // 指定图表的配置项和数据
var option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style>
#box {
  width: 1100px;
  height: 450px;
}
</style>