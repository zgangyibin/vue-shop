<script>
import { mapGetters } from 'vuex';

const SHOW_TABBAR=["home","type","profile"];//需要显示tabbar的路由名称
const ACTIVE_TABBAR = {//根据路由的name对应tabbar的索引
  home:0,
  type:1,
  cart:2,
  profile:3
}
export default{
  data(){
    return {
      showTabBar:true,//控制tabbar显示隐藏
      active:0,
      // active:Number(sessionStorage.getItem("ACTIVE"))||0, //tabbar选中的索引
    }
  },
  watch:{
    $route(next){
      this.showTabBar = SHOW_TABBAR.indexOf(next.name)>-1;
      this.active = ACTIVE_TABBAR[next.name];
    }
  },
  computed:{
    ...mapGetters("user",['profile'])
  },

}
</script>

<template>
  <router-view></router-view>
  <van-tabbar placeholder @change="changeActive" v-model="active" v-if="showTabBar" active-color="#fc5051">
    <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/type" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o" :badge="profile.shoppingcart?JSON.parse(profile.shoppingcart).length:0" :badge-props="{'show-zero':false}">购物车</van-tabbar-item>
    <van-tabbar-item to="/profile" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style src="./style/app.scss">

</style>
