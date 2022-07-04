import { createStore } from "vuex";
import global from "./modules/global";//创建global模块
import user from "./modules/user";

export default createStore({
    modules:{
        global,
        user
    }
})