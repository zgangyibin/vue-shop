/*
 * @Description: 
 * @Autor: lin
 * @Date: 2022-06-25 20:41:10
 * @LastEditors: zgangyibin 3112891950@qq.com
 * @LastEditTime: 2022-07-01 15:34:21
 */
import { GET,POST } from '../utils/request'
import api from "../api/api"

export function getDetail(data,callback){//把请发请求的方法，单独封装为一个service做请求发送
    GET(`${api.getDetail}?id=${data.id}`,callback);
}
export function updatePopular(data,callback){
    GET(`${api.updatePopular}?id=${data.id}`,callback);
}
export function createOrder(data,callback){
    POST(api.createOrder,data,callback);
}
export function payOrder(data,callback){
    POST(api.payOrder,data,callback);
}
export function getOrders(data,callback){
    POST(api.getOrders,data,callback);
}
export function updateProStatus(data,callback){
    POST(api.updateProStatus,data,callback);
}
export function saveArticle(data,callback){
    POST(api.saveArticle,data,callback);
}
export function updateOrders(data,callback){
    POST(api.updateOrders,data,callback);
}
export function updateOrderProlist(data,callback){
    POST(api.updateOrderProlist,data,callback);
}
export function getArticle(data,callback){
    GET(`${api.getArticle}?proid=${data.proid}&page=${data.page}`,callback);
}