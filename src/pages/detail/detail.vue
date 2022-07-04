<script setup>
import moment from "moment";
</script>
<script>
import { mapGetters,mapActions } from "vuex";
import { Notify } from "vant";
import { updateProfile } from "../../service/userService";
import { getDetail,updatePopular,getArticle } from "../../service/productService"
import { imgUrl } from "../../api/api";
export default {
    props:["id"],
    data(){
        return {
            data:{},
            imgUrl,
            timeoutIndex:null,
            articleData:'',
        }
    },
    mounted(){
        this.init();
        this.timeoutIndex = setTimeout(this.updatePopular,15*1000);//停留5秒添加人气
    },
    unmounted(){
        clearTimeout(this.timeoutIndex);//离开该组件时清除计时器
    },
    computed:{
        ...mapGetters("user",['profile'])
    },
    methods:{
        ...mapActions("user",["profileAction"]),
        init(){
            getDetail({id:this.id},(res)=>{
                let data = res.data[0].data[0];
                data.img = data.img.split(",");
                data.detail = data.detail.replace(/src\="/g,`src="https://8i98.com`)
                this.data = data;
                // 获取商品评价
                getArticle({
                    proid:this.data.id,
                    page:1,
                },(res)=>{
                    console.log(res);
                    this.articleData = res.data[0].data;
                });
            });
          
        },
        updatePopular(){//添加商品人气
            updatePopular({id:this.data.id},()=>{})
        },
        onClickLeft(){
            this.$router.go(-1);//返回上一级路由
        },
        handleCart(){//添加购物车
            if(!localStorage.getItem("token")){
                return Notify("请登录成功后再加入购物车");
            }
            let carData = this.profile.shoppingcart;
            if(!carData){
                carData = JSON.stringify([]);
            }
            carData = JSON.parse(carData);
            for(let i = 0;i <carData.length;i ++){
                if(carData[i].title===this.data.title){
                    return Notify("该商品已存在");
                }
            }
            carData.push({
                id:this.data.id,
                title:this.data.title,
                img:this.data.img[0],
                price:this.data.price*this.data.discount, // 商品单价
                stock:1, // 商品数量
                addTime: new Date().getTime() // 加入购物车的时间
                });
            // carData=[];
            updateProfile({//更新后端用户购物车数据
                filedname:"shoppingcart",
                filedvalue:JSON.stringify(carData)
            },(res)=>{
                Notify({type:"primary",message:"添加成功"})
                this.profileAction({//后端数据库更新成功再更新localStorage里的购物车数据
                    data:{
                        ...this.profile,
                        shoppingcart:JSON.stringify(carData)
                    }
                })
            })
        },
   
    }
}
</script>
<template>
<van-nav-bar
  fixed
  placeholder
  title="产品详情"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    <van-swipe class="my-swipe"  indicator-color="white">
        <van-swipe-item v-for="x in data.img" :key="x">
            <van-image :src="imgUrl+x" />
        </van-swipe-item>
    </van-swipe>
    <div class="container context mt-24">
        <h3>{{data.title}}</h3>
        <p>
            <span class="price">￥{{(data.price * data.discount).toFixed(2)}}</span> 
            <del style="margin-left:.15rem">￥{{data.price}}</del>
        </p>
    </div>
    <div class="container context mt-24">
        <dl class="dl" v-if="data.color">
            <dt>颜色:</dt>
            <dd><van-button v-for="x in data.color.split(',')" :key="x" size="small">{{x}}</van-button></dd>
            <dd class="last-dd"><van-icon name="arrow"/></dd>
        </dl>
          <dl class="dl" v-if="data.size">
            <dt>规格:</dt>
            <dd><van-button v-for="x in data.size.split(',')" :key="x" size="small">{{x}}</van-button></dd>
            <dd class="last-dd"><van-icon name="arrow"/></dd>
        </dl>
        <dl class="dl">
            <dt>品牌:</dt>
            <dd>{{data.brand}}</dd>
        </dl>
        <dl class="dl">
            <dt>销量:</dt>
            <dd>{{data.sales}}</dd>
        </dl>
         <dl class="dl">
            <dt>库存:</dt>
            <dd>{{data.stock}}</dd>
        </dl>
        <dl class="dl">
            <dt>折扣:</dt>
            <dd>{{data.discount*10}}</dd>
        </dl>
        <div class="container context">
            <dl class="dl" >
                <dt>评论:</dt>
                <dd></dd>
                <dd class="last-dd"><van-icon name="arrow"/></dd>
            </dl>
            <div  v-for="x in articleData" :key="x">
                <dl class="dl no-border">
                    <dt class="first-dd"><van-image
            width=".53rem"
            height=".53rem"
            :src="imgUrl+x.avatar"
          /></dt>
                    <dd>{{x.nick}}</dd>
                    <dd class="article-dd">{{moment(x.createtime).format("YYYY-MM-DD hh:mm:ss")}}</dd>
                </dl>
                <p><van-rate v-model="x.score" readonly /> </p>
                <p>{{x.text}}</p>
            </div>
        </div>
        <div class="container context mt-24 respanse-img" v-html="data.detail">

        </div>
    </div>
    <div class="add-cart-placeholder"></div>
    <ul class="add-cart">
        <li><span class="iconfont icon-zixun"></span><p>咨询</p></li>
        <li><span class="iconfont icon-shoucang"></span><p>收藏</p></li>
        <li>
            <van-badge :content="profile.shoppingcart?JSON.parse(profile.shoppingcart).length:0" :show-zero="false">
                <router-link to="/cart">
                    <span class="iconfont icon-gouwuche"></span>
                    <p>购物车</p>
                </router-link>
            </van-badge>
        </li>
        <li @click="handleCart"><span></span><p>加入购物车</p></li>
    </ul>
</template>
<style src="./detail.scss" scoped>

</style>