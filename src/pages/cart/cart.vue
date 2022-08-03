<script setup>
  // setup 里面的变量自动暴露在外面，外部可以直接使用。
  import moment from "moment";
  import { Notify } from "vant";
  import Address from "../../components/address/address.vue";
</script>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import { imgUrl } from "../../api/api";
  import { createOrder, payOrder } from "../../service/productService";
  import { updateProfile } from "../../service/userService";
  export default {
    data(){
      return {
        imgUrl,
        showAddress: false, // 显示设置地址组件的变量
        address: "",
        checked: false, // 全选状态
        idList: [] // 复选框选中商品的id列表
      }
    },
    unmounted(){ // 组件卸载的时候去更新一次购物车数据。
      updateProfile({
            filedname: "shoppingcart",
            filedvalue: JSON.stringify(this.cartData),
          },()=>{})// 更新后端数据库个人购物车数据。
    },
       computed:{
      ...mapGetters("user",["profile"]),
      cartData(){ // 购物车的计算属性
        let data = this.profile.shoppingcart?JSON.parse(this.profile.shoppingcart):[];
        return data
      },
      allPrice(){ // 计算选中商品的价格
        let all = 0; // 商品总价
        for(let i=0;i<this.cartData.length;i++){
          if(this.idList.indexOf(this.cartData[i].id)>-1){ //计算所有选中商品的价格
            all += this.cartData[i].price*this.cartData[i].stock
          }
        }
        return all;
      }
    },
    methods:{
      ...mapActions("user",["profileAction"]),
      onClickLeft(){
        this.$router.go(-1);
      },
      changeStock(id,num){ // 修改购物车商品数量
        for(let i=0;i<this.cartData.length;i++){
          if(this.cartData[i].id === id){ // 根据商品id去查找对应的商品
            this.cartData[i].stock+=num;
            if(this.cartData[i].stock<1) {
              this.cartData[i].stock = 1;
            }
            break;
          }
        }
        this.profileAction({data: {...this.profile,shoppingcart:JSON.stringify(this.cartData)}});// 更新全局状态profile的shoppingcart数据
      },
      selectAll(){ // 全选
        if(this.checked) { // 全选中，把购物车商品的id遍历出来放在idList变量
          this.idList = this.cartData.map((item)=>item.id)
        } else {// 取消全选
          this.idList = [];
        }
      },
      handleCheckbox(){// checkboxGroup 组件每次变化，都需要判断全选的状态
        if(this.idList.length === this.cartData.length) { // idList的长度和购物车数组元素长度相对，说明checkboxGroup里面的每个checkbox都是选中了
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      onSubmit(){ // 提交订单
        if(this.idList.length === 0) {
          return Notify("请选择下单的商品!")
        }
        if(!this.address) {
          return Notify("请设置收货地址!")
        }
        if(this.profile.mymoney < this.allPrice){
          return Notify("您余额不足，请充值!")
        }
        let prolist = [];// 购买的商品
        for(let i=0;i<this.cartData.length;i++){
          if(this.idList.indexOf(this.cartData[i].id)>-1){ //找到选中商品
            prolist.push(this.cartData[i])
          }
        }
        let data = {
          allprice: this.allPrice,
          prolist: JSON.stringify(prolist),
          status: 0,
          address: JSON.stringify(this.address),
          idlist: this.idList
        }
        createOrder(data,(res)=>{
          // 购物车里面已经购买的商品需要删除。
          for(let i=0;i<this.cartData.length;i++){
            if(this.idList.indexOf(this.cartData[i].id)>-1){ //找到选中商品
              this.cartData.splice(i,1); // 从购物车删除商品
            }
          }
          this.profileAction({data: {...this.profile,shoppingcart:JSON.stringify(this.cartData)}}); // 更新vuex的profile里面的购物车缓存数据
          updateProfile({
            filedname: "shoppingcart",
            filedvalue: JSON.stringify(this.cartData),
          },()=>{})// 更新后端数据库个人购物车数据。
          //this.$router.push("/buyok"); // 真实的应该是在payOrder支付成功后的函数去跳转。
          // 拿到订单编号，调用支付成功接口
          payOrder({
            orderid: res.data[1].id,
            money: data.allprice
          },() => {
            // 减去用户购买商品的钱,并且更新到本地缓存和服务器。真实的应该写在订单支付成功再去更新缓存，跳转到支付成功路由。
            this.profile.mymoney -= data.allprice;
            this.profileAction({data: {...this.profile,mymoney:this.profile.mymoney}});
            this.$router.push("/buyok");
          });
          // 订单创建完成，需要跳转到购买成功的页面，并把订单编号传过去。
          
        });
      },
      hideAddress(){ // 子组件通过props调用该方法隐藏遮罩
        this.showAddress = false;
      },
      changeAddress(item){ // 子组件通过props调用该方法传递选择的地址
        this.address = item;
      },
      delList(id){ // 删除购物车数据
          for(let i=0;i<this.cartData.length;i++){
            if(this.cartData[i].id === id){ //找到选中商品
              this.cartData.splice(i,1); // 从购物车删除商品
              break;
            }
          }
          this.profileAction({data: {...this.profile,shoppingcart:JSON.stringify(this.cartData)}}); // 更新vuex的profile里面的购物车缓存数据
      }
    },
  }
</script>

<template>
  <!-- 为了保留购物车下订单的数据，修改地址作为一个组件，如果做为一个路由，则购物车一选择的商品数据会被清除。 -->
  <div v-show="showAddress">
    <Address
      :hideAddress="hideAddress"
      :changeAddress="changeAddress"
    >
    </Address>
  </div>
  <div v-show="!showAddress">
    <van-nav-bar
      fixed
      placeholder
      title="购物车"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-checkbox-group v-model="idList" @change="handleCheckbox">
    <dl class="cart" v-for="x in cartData" :key="x">
      <dt><van-checkbox :name="x.id"></van-checkbox></dt>
      <dd>
        <van-card
          :num="x.stock"
          :price="(x.price*x.stock).toFixed(2)"
          :desc="moment(x.addTime).format('YYYY-MM-DD hh:mm:ss')"
          :title="x.title"
          :thumb="imgUrl+x.img"
          :thumb-link="'/#detail/'+x.id"
        >
          <template #tags>
              单价:￥{{x.price.toFixed(2)}}
          </template>
          <template #footer>
            <van-button size="mini"><van-icon name="minus" @click="changeStock(x.id,-1)" /></van-button>
            <van-button size="mini"><van-icon name="plus" @click="changeStock(x.id,1)" /></van-button>

             <van-button size="mini" type="danger"><van-icon @click="delList(x.id)" name="delete-o" /></van-button>
          </template>
        </van-card>
      </dd>
    </dl>
    </van-checkbox-group>
    <van-submit-bar :price="allPrice*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
      <template #tip>
        <span v-if="!this.address" style="color:red;">请设置收货地址</span>
        <span v-else>
          {{this.address.name+" "+this.address.tel+" "+this.address.address}}
        </span>
        <van-button type="default" size="mini" @click="showAddress=true">{{!this.address?'选择地址':'修改地址'}}</van-button>
      </template>
    </van-submit-bar>
  </div>
</template>
<style src="./cart.scss"></style>