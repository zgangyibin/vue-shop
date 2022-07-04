import { createRouter,createWebHashHistory } from "vue-router";
import Home from "../pages/home/home.vue"
import Type from "../pages/type/type.vue"
import List from "../pages/list/list.vue";
import Detail from "../pages//detail/detail.vue";
import Login from "../pages/login/login.vue";
import Profile from "../pages/profile/profile.vue"
import Paypal from "../pages/paypal/paypal.vue"
import Cart from "../pages/cart/cart.vue"
import Buyok from "../pages/buyok/buyok.vue"
import Orders from "../pages/orders/orders.vue"

const router= createRouter({//创建vue-router对象
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            name:"home",
            component:Home
        },
        {
            path:"/type",
            name:"type",
            component:Type
        },
        {
            path:"/list/:id+",//可以传递多个变量，为一个数组，第一个参数是typeid的值，第二个是搜索关键词key的值
            name:"list",
            component:List
        },
        {
            path:"/detail/:id",
            name:"detail",
            component:Detail,
            props:true,//把id参数作为props属性
        },
        {
            path:"/login",
            name:"login",
            component:Login,
        },
        {
            path:"/profile",
            name:"profile",
            component:Profile,
        },
        {
            path:"/paypal",
            name:"paypal",
            component:Paypal,
        },
        {
            path:"/cart",
            name:"cart",
            component:Cart,
        },
        {
            path:"/buyok",
            name:"buyok",
            component:Buyok,
        },
        {
            path:"/orders",
            name:"orders",
            component:Orders,
        },
    ]
})
//路由守卫判断用户是否登录
const REQUIRE_TOKEN = ["profile","paypal","cart",];
router.beforeEach((to,from,next)=>{
    if(REQUIRE_TOKEN.indexOf(to.name)>-1&&!localStorage.getItem("token")){
        next("/login");
        return false;
    }
    next();//跳转路由
})



export default router;