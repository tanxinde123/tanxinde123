import Vue from "vue"
import vDel from "./common/del.vue"
let obj = {
    vDel
}

for(let i in obj){
    Vue.filter(i,obj[i])
}