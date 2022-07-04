
<script>
import { mapActions,mapGetters } from "vuex";//引入vuex相关的助手函数
import { imgUrl } from "../../api/api";
import { getBanner,getAllProType,getPro } from "../../service/pageservice"
import ProductList from "../../components/proList/productList.vue";
import searchkeyVue from "../../components/searchkey/searchkey.vue";
export default {
    data() {
        return {
            subNavList: [
                { img: "1_09.png", title: "购物车" },
                { img: "1_11.png", title: "优惠券" },
                { img: "1_03.png", title: "我的订单" },
                { img: "1_06.png", title: "我的收藏" },
            ],
            // bannerList:[],
            // recommendList:[],
            recommendListColor: ["#e1e8f8", "#e0f3fb", "#fcf7ee", "#e2dff6"],
            dataList: {
                id: [],
                sales: []
            },
            imgUrl,
            dataType: "sales", //当前展示商品列表的类型
        };
    },
    computed: {
        ...mapGetters("global",["getTypeList", "getHotTypeList", "getBannerList"]), //从global命名空间的typeList生成对应的计算属性
    },
    mounted() {
        this.init();
        this.getDataList("sales"); //获取热门商品
    },
    methods: {
        ...mapActions("global",["setTypeListAction", "setBannerListAction"]),
        init() {
            if (this.getBannerList.length === 0) {
                getBanner((res) => {
                    this.setBannerListAction({ data: res.data[0] });
                });
            }
            if (this.getTypeList.length === 0) {
                getAllProType((res) => {
                    // this.$store.commot("global/setTypeList",{name:1});
                    let arr = res.data[0].data;
                    this.setTypeListAction({ data: arr }); //把后端返回的分类数据存到vuex里面
                    // this.recommendList = arr
                    // console.log(this.recommendList)
                });
            }
        },
        getDataList(type) {
            this.dataType = type;
            if (this.dataList[type].length === 0) {
                getPro({ orderbytype: type, page: 1 }, (res) => {
                    console.log(res);
                    this.dataList[type] = res.data[0].data;
                });
            }
        },
    },
    components: { ProductList,searchkeyVue }
}
</script>
<template>
    <!-- banner -->
    <div class="search">
        <searchkeyVue/>
   
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for = "x in getBannerList" :key = "x.id">
                <img :src="imgUrl+x.img" alt=""/>
            </van-swipe-item> 
        </van-swipe> 
     </div>
    <div class="sub-nav">
         <van-row>
            <van-col span="6" v-for="item in subNavList" :key="item.title">
                <van-image width="1.07rem" height="1.07rem" :src="'/src/assets/'+item.img" />
                <h3>{{item.title}}</h3>
            </van-col>
        </van-row>
    </div>
     <div class="recommend">
        <div :style="{backgroundColor:recommendListColor[index]}" span="6" v-for="(item,index) in getHotTypeList" :key="item.id">
         <router-link :to="{name:'list',params:{id:item.id}}">
            <h3>{{item.title}}</h3>
            <p>{{item.subtitle}}</p>
            <van-image width="1.64rem" height="1.32rem" style="padding:10px" :src="imgUrl+item.img" />
        </router-link>
        </div>
    </div>
    <div class="container mt-24">
        <div class="title">
            <span v-show="dataType ==='id'" @click="getDataList('sales')" class="iconfont icon-left-circle"></span>
            <span>{{dataType=="sales"? "超值热卖":"最新上架" }}</span>
            <span v-show="dataType ==='sales'" @click="getDataList('id')" class="iconfont icon-roundright"></span>
            <em>{{dataType ==='sales' ? "1/2":"2/2"}}</em>
        </div>
        <product-list :data="dataList[dataType]"/>
    </div>
   
</template>