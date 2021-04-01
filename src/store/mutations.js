export const state ={
    //这里sessionStorage.getItem("userInfo") 是一个字符串  userInfo 需要的是对象
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}


// 保存数据到sessionStorage
// sessionStorage.setItem('key', 'value');
 
// 从sessionStorage获取数据
// sessionStorage.getItem('key');

export const mutations = {
    changeUserInfo(state,info){
        //传过来的是一个对象
        state.userInfo =  info
        if(info.id){ 
            //在本地存储存一份 这里存储的是字符串
            sessionStorage.setItem("userInfo",JSON.stringify(info))
        }else{
            //清空本地存储
            sessionStorage.removeItem("userInfo")
        }
       
       
    }
}

export const getters = {
    userInfo(state){
        return state.userInfo
    }
}