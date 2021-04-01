import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from "../store"
//开发环境
Vue.prototype.$imgUrl = "http://localhost:3000/"
let baseUrl = "/api"

//上线环境
// Vue.prototype.$imgUrl = ""
// let baseUrl = ""

//请求拦截
axios.interceptors.request.use(req=>{
    console.log(req)
    //判断是不是登录页  如果不是 就要添加 请求头 authorization  
    if(req.url !=baseUrl+"/api/login"){
        req.headers.authorization = store.state.userInfo.token
    }
  
    return req
})



// 响应拦截
axios.interceptors.response.use(res => {
    console.group("======本次请求的路径：" + res.config.url)
    console.log(res)
    console.groupEnd("请求结束")
    return res
})

/* ===================Menu菜单管理===================== */
//发送数据add
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}
//LIST列表
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}

//删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//获取一条数据
export const getMenuOne = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqMenuAlter = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}

/* ===================role角色管理===================== */
// role
//发送数据add
export const reqRoleAdd = (form) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(form)
    })
}
//LIST列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}

//删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//获取一条数据
export const getRoleOne = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqRoleAlter = (form) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(form)
    })
}

/* ===================manage管理员管理===================== */

//添加
export const reqManageAdd = (form) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 管理员总数（用于分页）
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}

//管理员列表（用于分页）
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}

// 删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid: uid })
    })
}

// 获取一条数据
export const reqManageOne = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

// 修改数据
export const reqManageUpdate = (form) => {   
    return axios({
        url: baseUrl + "/api/useredit",
        method: "POST",
        data: qs.stringify(form)
    })
}

//登录

export const reqLogin =(form)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post", 
        data:qs.stringify(form)
        
    })
}

/* ===================Cate商品分类===================== */
//发送数据add
export const reqCateAdd = (form) => {
    // 因为form中包含了文件，所以必须要这样传参
  let data = new FormData()
  // data.append("pid",1)
  // data.append("catename",'hahaha')
  // data.append("img",file)
  // data.append("status",1)

  for(let i in form){
    data.append(i,form[i])
  }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}
//LIST列表
export const reqCateList = (pid) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: {
            istree:true,
            pid:pid
        }
    })
}

//删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//获取一条数据
export const getCateOne = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqCateAlter = (form) => {
  // 因为form中包含了文件，所以必须要这样传参
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
}
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}

/* ===================specs商品规格===================== */

//添加
export const reqSpecsAdd = (form) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 管理员总数（用于分页）
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

//管理员列表（用于分页）
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}

// 删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

// 获取一条数据
export const reqSpecsOne = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改数据
export const reqSpecsUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "POST",
        data: qs.stringify(form)
    })
}

/* ===================goods商品管理===================== */

//添加
export const reqGoodsAdd = (form) => {
    let data = new FormData()
    // data.append("pid",form.pid)
    // data.append("catename",'form.catename')
    // data.append("img",form.img)
    // data.append("status",form.status)
    
    for(let i in form){
      data.append(i,form[i])
    }
  
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data:data
    })
}
// 商品总数（用于分页）
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}

//goods列表（用于分页）
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

// 删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

// 获取一条数据
export const reqGoodsOne = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改数据
export const reqGoodsUpdate = (form) => {
    let data = new FormData()

    for(let i in form){
      data.append(i,form[i])
    }
  
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "POST",
        data:data
    })
}

/* ===================member会员管理===================== */
//获取列表
export const reqMemberList = ()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"GET"
    })
}
//获取一条数据
export const reqMemberOne =(uid)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}
//修改
export const reqMemberAlter =(form)=>{
    return axios({
     url:baseUrl+"/api/memberedit",
     method:"post",
     data:qs.stringify(form)
    })
}


/* ===================banner轮播图===================== */
//发送数据add
export const reqBannerAdd = (form) => {
    // 因为form中包含了文件，所以必须要这样传参
  let data = new FormData()
  // data.append("pid",1)
  // data.append("catename",'hahaha')
  // data.append("img",file)
  // data.append("status",1)

  for(let i in form){
    data.append(i,form[i])
  }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}
//banner列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get"
    })
}

//删除
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//获取一条数据
export const getBannerOne = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqBannerAlter = (form) => {
  // 因为form中包含了文件，所以必须要这样传参
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
}
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}


/* ===================seckill秒杀活动===================== */
//添加
export const reqSeckillAdd = (form) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(form)
    })
}


//秒杀列表
export const reqSeckillList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get"
        
    })
}

// 删除
export const reqSeckillDel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

// 获取一条数据
export const reqSeckillOne = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改数据
export const reqSeckillUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "POST",
        data: qs.stringify(form)
    })
}
