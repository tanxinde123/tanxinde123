import { reqCateList } from "../../util/request";

const state = {
  list: [],
};
// 修改数据
const mutations = {
  changeList(state, arr) {
    state.list = arr;
  },
};
// 请求
const actions = {
  reqChangeList(context) {
    reqCateList().then((res) => {
      context.commit("changeList", res.data.list);
    });
  },
};
// 导出数据
const getters = {
  list(state) {
    return state.list;
  },
};

export default {  
    state,
    mutations,
    actions,
    getters,
    // 命名空间
    namespaced: true,
};