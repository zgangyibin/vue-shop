<script>
  import { Dialog } from 'vant';
  import { login, register } from "../../service/userService";
  import { isEmail, isPwd } from "../../utils/regTool";
  export default {
    data(){
      return {
        islogin: true, 
        email:"",
        password:"",
        repassword:""
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      },
      changeIsLogin(type){
        this.islogin = type;
      },
      submit(){ // 用户登录注册
        if(!isEmail(this.email)){
          return Dialog.alert({
                  message: '请输入正确的邮箱格式',
                })
        }
        if(!isPwd(this.password)){
          return Dialog.alert({
                  message: '密码只能是4-8位的数字、字母、_、-的组合',
                })
        }
        if(!this.islogin && this.password !== this.repassword){
          return Dialog.alert({
                  message: '两次输入密码不一致.',
                })
        }
        if(this.islogin) {
          login({
            email:this.email,
            password: this.password
          },(res)=>{
            let profile = res.data[0].data
            if(profile.length===0){
              return Dialog.alert({
                  message: '用户名或者密码错误.',
                })
            }
            let token = res.token;
            localStorage.setItem("token",token); 
            this.$router.push("/profile");
          })
        } else {
          register(
            {
              email:this.email,
              password: this.password,
              repassword:this.repassword,
              shoppingcart: ""
              },
            (res)=>{
              if(res.success){
                Dialog.alert({
                  message: '用户注册成功,请登录。',
                })
              }
            }
          )
        }
      },
    }
  }
</script>
<template>
  <div class="login" :class="{'login-reg-bg':!islogin}">
    <van-nav-bar
      title=""
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="logo">张张购物商城</div>
    <div class="login-form">
      <van-field v-model="email" label="" placeholder="邮箱地址" />
      <van-field class="mt-24" v-model="password" label="" placeholder="密码" />
      <van-field v-if="!islogin" class="mt-24" v-model="repassword" label="" placeholder="确认密码" />
      <van-button v-if="islogin" block type="default" @click="submit">登录</van-button>
      <van-button v-else block type="default" @click="submit">注册</van-button>
    </div>
    <p class="login-type">
      <span v-if="islogin" @click="changeIsLogin(false)">没有账号?</span>
      <span v-else @click="changeIsLogin(true)">已经有账号</span>
    </p>
  </div>
</template>
<style src="./login.scss"></style>