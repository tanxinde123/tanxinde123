import { reqManageList ,reqManageCount} from "../../util/request";

const state = {
  list: [],
  size:2,
  total:0,
  page:1
};
// 修改数据
const mutations = {
  changeList(state, arr) {
    state.list = arr;
  },
  changeTotal(state,num){
    state.total = num

  },
  changePage(state,num){
    state.page = num
  }
};
// 请求
const actions = {
  reqChangeList(context) {
    reqManageList({page:context.state.page,size:context.state.size}).then((res) => {
     let list = res.data.list?res.data.list:[]
      if(context.state.page>1 && list.length ==0){
        context.commit("changePage",context.state.page-1)
        context.dispatch("reqChangeList")
        return

      }
      context.commit("changeList",list);
    });
  },
  reqChangeTotal(context){
    reqManageCount().then(res=>{
      context.commit("changeTotal",res.data.list[0].total)
    })
  },
  reqchangePage(context,num){
    context.commit("changePage",num)
    context.dispatch("reqChangeList")
    
  }
};
// 导出数据
const getters = {
  list(state) {
    return state.list;
  },
  size(state){
    return state.size
  },
  total(state){
    return state.total
  },
  page(state){
    return state.page
  }
};

export default {  
    state,
    mutations,
    actions,
    getters,
    // 命名空间
    namespaced: true,
};