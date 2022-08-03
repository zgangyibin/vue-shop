<script setup>
import moment from "moment";
</script>
<script>

import { imgUrl } from "../../api/api";
import { Notify } from "vant";
import { getOrders,updateProStatus,saveArticle,updateOrderProlist } from "../../service/productService"
const ORDER_STATUS= [
     "未付款",
    "未发货",
    "已发货",
    "已收货",
    "已评价",
]
export default {
    data(){
        return {
            activeNames:[],//折叠面板展示的name
            orderData:[],//订单数据
            imgUrl,
            ORDER_STATUS,
            show:false,
            score:0,
            text:"",
            proid:'',//评价商品的id
            orderId: "", // 点击评价，当前的订单编号
        }
    },
    mounted(){
        this.init();
    },
    methods: {
         onClickLeft(){
            this.$router.go(-1)
        },
        init(){//请求订单数据
            getOrders({
                page:1,
            },(res)=>{
                this.orderData = res.data[0].data;
            })
        },
            // handleMoment(str){ // 格式化时间的函数封装
        //     return moment(str).format("YYYY-MM-DD hh:mm:ss")
        // },
        handleStatus(orderid,index){//orderId订单编号，index当前点击订单的索引
            updateProStatus({
                orderid,
                status:3
            },()=>{
                this.orderData[index].status = 3;
            })
        },
        handleShowArticle(orderId,id){//商品评价
            this.orderId = orderId;
            this.proid = id;
            this.show = true;
        },
        handleConfirm(){
            saveArticle({
                score:this.score,
                text:this.text,
                proid:this.proid,//评价商品的id
            },()=>{
                this.show = false;
                this.score = 0;
                this.text = "";
                for(let i = 0;i < this.orderData.length; i++){//找当前评价的订单
                    if(this.orderData[i].orderid == this.orderId){
                        let prolist = JSON.parse(this.orderData[i].prolist);
                        for(let j = 0;j <prolist.length;j ++){//查找评价的商品
                            if(prolist[j].id = this.proid){
                                prolist[j].article = true;
                                this.orderData[i].prolist = JSON.stringify(prolist);
                                updateOrderProlist({
                                    prolist:JSON.stringify(prolist),
                                    orderid:this.orderId,
                                },()=>{})
                                break;
                            }
                        }
                        break;
                    }
                }
                Notify({type:"success",message:"评价成功"})
            })
        },
    },
}
</script>
<template>
    <van-nav-bar
        fixed
        placeholder
        title="订单中心"
        left-text="返回"
        left-arrow
       @click-left="onClickLeft"
        />
        <van-collapse v-model="activeNames">
            <van-collapse-item :key="y.orderid" :title="'下单时间:'+moment(y.createtime).format('YYYY-MM-DD hh:mm:ss')" :name="index" v-for="(y,index) in orderData">
                <p>订单编号：{{y.orderid}}</p>
                <p>状态：{{ORDER_STATUS[y.status]}}</p>
                <van-button size="mini" type="primary" @click="y.status=2;y.EMSname='中通快递';y.EMS=23333333;">模拟发货</van-button>

                <div v-if="y.status>1">
                    <h3>物流信息：</h3>
                    <p>快递单号：{{y.EMSname}}</p>
                    <p>快递名称：{{y.EMS}}</p>
                    <p>发货时间：{{y.EMStime}}</p>
                </div>
                <van-button size="mini" type="primary" v-if="y.status==2" @click="handleStatus(y.orderid,index)">确认收货</van-button>
                <van-card v-for="x in JSON.parse(y.prolist)" :key="x"
                    :num="x.stock"
                    :price="(x.price*x.stock).toFixed(2)"
                    :desc="moment(x.addTime).format('YYYY-MM-DD hh:mm:ss')"
                    :title="x.title"
                    :thumb="imgUrl+x.img"
                    :thumb-link="'/#detail/'+x.id"
                    >
                    <template #tags>
                        单价: ￥{{x.price.toFixed(2)}}
                    </template>
                    <template #footer v-if="y.status ===3 || y.status ===4">
                        <van-button size="mini" v-if="!x.article" @click="handleShowArticle(y.orderid,x.id)">评价</van-button>
                    </template>
                </van-card>
            </van-collapse-item>
           
        </van-collapse>
  <van-overlay :show="show" @click="show=false">
  <div class="wrapper">
    <div class="block" style="padding:.24rem;" @click.stop>
      <h4>商品评价</h4>
      <p>
        <van-rate v-model="score" />
      </p>
      <p>
        <van-field v-model="text" type="textarea"  placeholder="请输入评价内容" />
      </p>
       <van-button type="primary" block  @click="handleConfirm()">提交</van-button>
       <br/>
    </div>
  </div>
</van-overlay>
</template>

<style src="./index.scss" scoped>
</style>