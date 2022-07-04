<script>
import { Dialog } from 'vant';
import { mapGetters,mapActions } from 'vuex';
import { v4 as uuidv4 } from "uuid";//引入生成唯一不重复id的uuid
import { areaList } from '@vant/area-data';
import { updateProfile } from "../../service/userService";
export default {
    data(){
        return {
            show:false,//是否显示遮罩
            chosenAddressId:"",//选中地址的id
            areaList,//省市区的数据
            dataType:"add",//新增或修改
            initAddress:{},//地址信息初始化
            editAddressId:"",//当前编辑地址数据的id
        }
    },
    computed:{
        ...mapGetters("user",["profile"]),
        addresslist(){
            let data = this.profile.myaddress?JSON.parse(this.profile.myaddress):[];
            for(let i = 0;i < data.length;i++){
                if(data[i].isDefault){//找出默认选中
                    this.chosenAddressId = data[i].id;
                    this.changeAddress();//把父组件的address设置为默认地址
                    break;
                }
            }
            return data;
        },
    },
    props:["hideAddress","changeAddress"],
    methods :{
        ...mapActions("user",["profileAction"]),
        onClickLeft(){
            this.hideAddress();
        },
       
        onAdd(id){//显示添加地址遮罩层
            this.show = true;
            this.dataType = "add";
        },
        onEdit(item){//显示修改地址遮罩层
            this.show = true;
            this.dataType = "update";
            this.initAddress = item;
            this.editAddressId = item.id;
        },
        onDelete(item){
            Dialog.confirm({
            title: '',
            message:
                '确定删除吗？',
            })
            .then(() => {//确认
                let address = this.addresslist;
                        for(let i = 0; i< address.length;i ++){
                            if(address[i].id=== item.id){
                                address.splice(i,1);
                                break;
                            }
                        }
                        updateProfile({//把添加的收货地址更新到后端
                            filedname:"myaddress",//收货地址字段
                            filedvalue:JSON.stringify(address),
                        },(res)=>{
                            this.profileAction({data:{...this.profile,myaddress:JSON.stringify(address)}});//更新vuex里的profile数据
                            this.show = false;
                        })
            })
            .catch(() => {
                // on cancel
            });
        },
        select(item){//选中地址,子组件通过函数传值给父组件
            this.changeAddress(item);
        },
        onSave(data){//保存
            let address = this.profile.myaddress;
            if(!address){//如果没设置收货地址，地址添加一个空数组的JSON
                address=JSON.stringify([]);
            }
            address = JSON.parse(address);
            let addressId = uuidv4();
            if(data.isDefault){
                address.forEach(element => {
                    element.isDefault = false;
                });
                this.chosenAddressId = addressId;//把当前添加数据的id设置为默认id
            }
            if(this.dataType === "add"){
                address.push({
                    ...data,
                    address:data.province+data.city+data.county+data.addressDetail,
                    id:addressId,
                });
            }else
            if(this.dataType === "update"){//修改数据
                for(let i = 0;i <address.length;i ++){
                    if(address[i].id === this.editAddressId){
                        address[i] = {
                            ...address[i],
                            ...data, 
                            address:data.province+data.city+data.county+data.addressDetail,
                        }
                    } 
                }
            }
            this.profileAction({data:{...this.profile,myaddress:JSON.stringify(address)}});
            updateProfile({//把添加的收货地址更新到后端
                filedname:"myaddress",//收货地址字段
                filedvalue:JSON.stringify(address),
            },(res)=>{
                this.profileAction({data:{...this.profile,myaddress:JSON.stringify(address)}});//更新vuex里的profile数据
                this.show = false;
            })
        }
    }
}
</script>
<template>
    <van-nav-bar
    fixed
    placeholder
    title="收货地址"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-address-list
    style="margin-top:50px"
    v-model="chosenAddressId"
    :list="addresslist"
    default-tag-text="默认"
    @add="onAdd"
    @select="select"
    @edit="onEdit"
    />
    <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
            <div class="block" @click.stop>
                <van-address-edit
                :address-info="initAddress"
                :area-list="areaList"
                show-postal
                :show-delete="this.dataType ==='update'"
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                />
            </div>
        </div>
    </van-overlay>
</template>
<style>
</style>