<script>
export default{
    props:{
        typeid:{
            default:-1,
        },
        replace:{
            default:"no",
        }
    },
    data(){
        return {
            value:""
        }
    },
    methods:{
        handleSearch(){
            if(this.replace === "no"){
                this.$router.push({name:"list",params:{id:[this.typeid,this.value]}});
            }
           else {
             this.$router.replace({name:"list",params:{id:[this.typeid,this.value]}});
           }
            // 如果在list页面搜索，不能用push添加history记录，用replese替换
        }
    }
}
</script>
<template>
      <van-search @search="handleSearch" shape="round" v-model="value" placeholder="请输入搜索关键词"/>
</template>