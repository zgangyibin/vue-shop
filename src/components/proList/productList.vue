<script>
import { imgUrl } from "../../api/api";
export default {
    props:['data'],
    data(){
        return {
            imgUrl
        }
    }
}
</script>
<template>
      <van-row class="gutter-24">
            <van-col class="mt-24" span="12" v-for="x in data" :key="x.id">
                <router-link :to="'/detail/'+x.id">
                    <van-image lazy-load :src="imgUrl+x.img.split(',')[0]" />
                    <h3 class="h3-title ">{{x.title}}</h3>
                    <p><span class="price">￥{{(x.price * x.discount).toFixed(2)}}</span> <del style="margin-left:.15rem">￥{{x.price}}</del></p>
                </router-link>
            </van-col>
            <van-col span="12"></van-col>
        </van-row>
</template>
<style src="./index.scss" scoped>

</style>