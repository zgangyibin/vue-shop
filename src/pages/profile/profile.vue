<script>
  import { Notify } from 'vant';
  import { mapGetters, mapActions } from 'vuex';
  import { profile, updateavatar, updateProfile } from "../../service/userService";
  import { adddetailimg, deldetailimg } from "../../service/pageservice"
  import { imgUrl } from "../../api/api";
  export default {
    data(){
      return {
        imgUrl,
        fileList:[],
        show: false, // 是否显示遮罩层
        uploadFileName: "", // 上传图片的文件名
        nick: ""
      }
    },
    mounted(){
      this.init();
    },
    computed:{
      ...mapGetters("user",["profile"]),// 生成用户信息的计算属性
      avatar(){
        if(this.profile.avatar){ // 上传组件图片同步用户头像
          this.fileList = [{url: imgUrl+this.profile.avatar}];
          this.uploadFileName = this.profile.avatar;
          return imgUrl+this.profile.avatar;
        }
        return '/src/assets/5_03.png';
      }
    },
    methods:{
      ...mapActions("user",["profileAction"]),
      showUploader(){
        this.show=true;
        this.nick = this.profile.nick;
      },
      init(){
        if(!localStorage.getItem("PROFILE")){
          profile((res)=>{
            this.profileAction({data: res.data[0][0] });// 把用户信息存储到vuex的profile全局状态
          });
        }
      },
        
      afterRead(files){ // 文件上传接口
        let data = new FormData();//创建表单对象
        data.append("file",files.file)
        adddetailimg(data,(res)=>{
          this.uploadFileName = res.data.url
          // 图片上传成功以后，马上更新用户头像地址
          updateavatar({avatar: this.uploadFileName},(res)=>{
            this.profileAction({data: {...this.profile,avatar:this.uploadFileName} })// 更新vuex里面的用户头像
            Notify({ type: 'primary', message: '头像更新成功' });
          })
        })
      },
      handleDelete(file){ // 删除用户头像
        deldetailimg({file:[this.uploadFileName]},(res)=>{
          Notify({ type: 'primary', message: '头像删除成功' });
           // 图片删除成功以后，马上更新用户头像地址为空
          updateavatar({avatar: ""},(res)=>{
            Notify({ type: 'primary', message: '头像更新成功' });
            this.profileAction({data: {...this.profile,avatar:""} })
          })
          this.fileList=[];
        })
      },
      handleUpdateProfile(){// 更新用户信息
        if(!this.nick){
          return Notify('请输入昵称');
        }
        updateProfile({
          filedname: "nick",
          filedvalue: this.nick,
        },(res)=>{ // 更新用户信息
            this.profileAction({data: {...this.profile,nick:this.nick} })// 更新用户昵称
            Notify({ type: 'primary', message: '用户信息更新成功' });
          })
      },
      handleOut(){//退出登录
        this.profileAction({data:{}});//清除全局profile状态
        localStorage.clear();// 清除说是有的localstorage数据。
        this.$router.push("/");
      },
    }
  }
</script>
<template>
  <van-nav-bar
    title="我的"
    left-text=""
  />
  <ul class="bg">
    <li @click="showUploader">
      <van-image
        round
        width="1.2rem"
        height="1.2rem"
        :src="avatar"
      />
    </li>
    <li>
      <div>
        <h2>{{profile.nick}}</h2>
        <p>
          <button class="btn-a" type="primary" size="mini">普通会员</button>
          <button @click="handleOut" class="btn-a" type="primary" size="mini">退出登录</button>
        </p>
      </div>
    </li>
    <li>
      <div class="v-er">
        <img src="/src/assets/ewm.png" />
      </div>
    </li>
  </ul>
  <ul class="container icon-list">
    <li>
        <span class="iconfont icon-31daifukuan"></span>
        <h3>待付款</h3>
    </li>
    <li>
        <span class="iconfont icon-31daifahuo"></span>
        <h3>待发货</h3>
    </li>
    <li>
        <span class="iconfont icon-31daishouhuo"></span>
        <h3>待收货</h3>
    </li>
    <li class="bg-border">
        <span class="iconfont icon-daipingjia"></span>
        <h3>待评价</h3>
    </li>
    <li>
        <router-link to="/orders"> 
          <span class="iconfont icon-wode-dingdan"></span>
          <h3>我的订单</h3>
        </router-link>
      
    </li>
  </ul>
  <ul class="container icon-list mt-24">
    <li>
       <p>{{profile.mymoney}}</p>
        <h3>余额</h3>
    </li>
    <li>
        <p>0</p>
        <h3>优惠卷</h3>
    </li>
    <li>
        <p>0</p>
        <h3>积分</h3>
    </li>
    <li class="bg-border">
        <p>10</p>
        <h3>可提现</h3>
    </li>
    <li>
      <router-link to="/paypal">
        <span class="iconfont icon-31daifukuan f-pink"></span>
        <h3>我的钱包</h3>
      </router-link>
        
    </li>
  </ul>
  <ul class="container icon-list icon-list-wrap mt-24">
    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_03.png"
        />
        <h3>足迹</h3>
    </li>
    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_11.png"
        />
        <h3>会员</h3>
    </li>
    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_06.png"
        />
        <h3>收藏</h3>
    </li>
    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_08.png"
        />
        <h3>分销</h3>
    </li>

    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_21.png"
        />
        <h3>消息</h3>
    </li>
    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_18.png"
        />
        <h3>设置</h3>
    </li>
    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_26.png"
        />
        <h3>客服</h3>
    </li>
    <li>
        <van-image
          width=".71rem"
          height=".63rem"
          src="/src/assets/a_24.png"
        />
        <h3>帮助</h3>
    </li>
  </ul>
  <van-overlay :show="show" @click="show=false">
  <div class="wrapper">
    <div class="block" @click.stop>
      <h4>编辑信息</h4>
      <van-uploader
        :max-size="1024 * 1024"
        multiple :max-count="1"
        v-model="fileList"
        :after-read="afterRead"
        :before-delete="handleDelete"
      />
      <p>
      <van-cell-group inset>
        <van-field v-model="nick" placeholder="请输入昵称" />
      </van-cell-group>
      <van-button type="primary" size="small" @click="handleUpdateProfile">确认修改</van-button>
      </p>
    </div>
  </div>
</van-overlay>
</template>
<style src="./profile.scss" scoped></style>