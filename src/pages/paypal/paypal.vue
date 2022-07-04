
<script>
import { Notify } from 'vant'
import { mapGetters,mapActions } from 'vuex'
import {saveMoney} from "../../service/userService"
export default {
    data(){
        return {
            show:false,
            checked:"10"
        }
    },
    computed:{
        ...mapGetters("user",["profile"]),
    },
    methods:{
        ...mapActions("user",["profileAction"]),
        handleChange(num){
            console.log(num)
        },
        confirm(){
            let money = Number(this.checked);
            saveMoney({money},(res)=>{
                this.profileAction({data:{...this.profile,mymoney:this.profile.mymoney+money}});//更新全局profile信息
                Notify({type:"primary",message:"充值更新成功"});
                this.show = false;
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        },
    }
}
</script>
<template>
<van-nav-bar
fixed
title="我的钱包"
left-text="返回"
left-arrow
@click="onClickLeft"
/>

    <div class="content">
        <div class="content-money">
            <p>账号余额</p>
            <p>￥<span class="f-94">{{profile.mymoney.toFixed(2)}}</span></p>
        </div>
        <van-button color="#fd5151" block @click="show=true">充值</van-button>
        <van-button type="default" block>提现</van-button>
    </div>
    <van-overlay :show="show" @click="show=false">
        <div class="wrapper">
            <div class="block radio-group" @click.stop>
            <h4>充值金额</h4>
            <van-radio-group v-model="checked" @change="handleChange">
                <van-radio  name="10">￥10</van-radio>
                <van-radio name="50">￥50</van-radio>
                <van-radio name="100">￥100</van-radio>
            </van-radio-group>
            <p class="mt-24"></p>
            <van-button type="primary" block @click="confirm">确认充值</van-button>
            </div>
        </div>
    </van-overlay>
</template>
<style src="./paypal.scss" scoped>

</style>