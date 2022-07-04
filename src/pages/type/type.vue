<script>
import { mapGetters } from 'vuex'
import { imgUrl } from '../../api/api'
import searchkeyVue from "../../components/searchkey/searchkey.vue";
export default {
  data(){
        return {
            imgUrl,
            active:0,//侧边导航栏索引
            id:"",//当前一级导航的id号
        }
    },
    components:{
        searchkeyVue
    },
    mounted(){
        if(this.getTypeListLevel0.length>0){//进入type页面的时候，一级分类的id默认没有，需要第一个一级分类的id赋值给id变量

            this.id = this.getTypeListLevel0[0].id;
        }
    },
    computed:{
        ...mapGetters("global",["getTypeList","getTypeListLevel0"]),
        getSecondType(){//返回一级分类下的二级分类
            return this.getTypeList.filter((item)=>item.typelevel===1&&item.fatherid.search(this.id +'-')>-1)
        },
    },
    methods:{
        // index是默认导航条索引，id是当前一级分类的id号
        handleChange(index,id){//侧边导航change事件
            this.active = index;
            this.id = id;
        }
    }
}
</script>
<template>
    <searchkeyVue/>
       <main class="container main">
        <aside class="aside">
               <van-sidebar v-model="active">
                    <van-sidebar-item v-for="x in getTypeListLevel0" :key="x.id" :title="x.title"  @click="(index)=>handleChange(index,x.id)"/>
                 
                </van-sidebar>
        </aside>
        <article class="article">
           <van-row justify="space-around">
            <van-col span="12" v-for="x in getSecondType" :key="x">
            <router-link :to="{name:'list',params:{id:x.id}}">
                <van-image :src="imgUrl+x.img" style="padding:0.1rem"/>
                <h3>{{x.title}}</h3>
            </router-link>

            </van-col>
           </van-row>
        </article>
       </main>
</template>
<style src="./type.scss" scoped>

</style>