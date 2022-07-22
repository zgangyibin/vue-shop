<script>
import ProductList from '../../components/proList/productList.vue'
import { getPro } from "../../service/pageservice"
import searchkeyVue from "../../components/searchkey/searchkey.vue";

export default {
    data(){
        return {
            dataList:[],
            value:"",
            typeid:'',
            loading:false,
            finished:false,
            count:0,//后端总共的商品数，每次后端只会返回10条数据，用count/10,可以计算出共有多少页
            page:1,//当前分页的页码
            refreshing:false,
        }
    },
    components:{
        ProductList,searchkeyVue
    },
    mounted(){
       this.init();
    },
    watch:{
        $route(next,pre){//监听路由变化,同一个路由，不同参数，不会跳转，所以需要手动调用请求后端数据方法
            if(next.name == "list"){
                this.init();
                this.page = 1;//重置
                this.finished=false;
                this.loading = false;

            }
        }
    },
    methods:{
        init(){
            const {id} = this.$route.params;
            this.typeid = id[0];
            this.getData({typeid: id[0]=== "-1" ? "" : id[0],key:id[1]});//根据二级分类id号获取对应数据
        },
        getData(params){
            getPro({
                page:1,
                orderbytype:"popular",//按最新发布在前面
                ...params,
            },(res)=>{
                console.log(res)
                this.dataList = res.data[0].data;
                this.count = res.data[1].data[0].count;
                this.refreshing = false;
            })
        },
        onClickLeft(){
            this.$router.go(-1);//返回上一级路由
        },
        onClickRight(){//获取所有商品,navBar右边的按钮点击获取所有商品，变化路由参数的形式请求数据
        //    this.getData();
            const {id} = this.$route.params;
            this.$router.replace({name:"list",params:{id:[-1,id[1]]}});
        },
        onRefresh(){//下拉刷新
            this.refreshing= true;
            this.init();
            this.page =1;
            this.finished= false;
        },
        onLoad () {//上拉加载
        let pageAll = Math.ceil(this.count/10);
        if(this.page < pageAll){
            this.finished = false;//为true不会触发onload事件
            this.loading = true;
            const {id} = this.$route.params;
            getPro({
                page:++this.page,
                orderbytype:"id",//按最新发布在前面
                typeid: id[0]=== "-1" ? "" : id[0],
                key:id[1]
            },(res)=>{
                this.loading = false;
                this.dataList=[...this.dataList,...res.data[0].data];

            })
        }else {
            this.finished = true;
        }
       
        },
        onSearch(){
            console.log(this.value)
        }
    }
}
</script>
<template>
<van-nav-bar
  fixed
  placeholder
  title="产品列表"
  left-text="返回"
  right-text="全部"

  left-arrow
  @click-left="onClickLeft"
   @click-right="onClickRight"
/>

    <searchkeyVue :typeid="typeid" replace/>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            offset="120"
        >
    <ProductList :data="dataList"/>
  </van-list>
</van-pull-refresh>

    <!-- <div class="container">
        <ProductList :data="dataList"/>
    </div>
   -->
</template>