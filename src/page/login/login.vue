<template>
  <div class="login">
    <div class="box">
      <h3 class="center marginBottom">登录</h3>
      <div class="marginBottom">
        <el-input placeholder="请输入用户名" v-model="info.username" clearable></el-input>
      </div>
      <div class="marginBottom">
        <el-input placeholder="请输入密码" v-model="info.password" clearable  show-password></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import {reqLogin} from '../../util/request'
import { successAlert, warningAlert } from "../../util/alert";
export default {
  data(){
    return{
      info:{
        username:"",
        password:""
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods: {
    ...mapActions({
     reqUserInfoAction:"reqUserInfoAction"
    }),
    login(){
        reqLogin(this.info).then(res=>{
           console.log(res)
           if(res.data.code ===200){
             successAlert(res.data.msg)

             this.reqUserInfoAction(res.data.list)

             this.$router.push("/")
           }else{
             warningAlert(res.data.msg)
           }
        })
    }
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, rgb(59, 41, 63) 40%,rgb(21, 13, 22) 100% ) ;
  position: relative;
}
.box {
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
}
.center {
  text-align: center;
}
.center button{
  width: 400px;
  line-height: 10px;
  font-size: 16px;
}
.marginBottom {
  margin-bottom: 20px;
}
</style>