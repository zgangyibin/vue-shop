import { GET,POST } from '../utils/request'
import api from "../api/api"

export function getBanner(callback){//把请发请求的方法，单独封装为一个service做请求发送
    GET(api.getBanner,callback);
}
export function getAllProType(callback){
    GET(api.getAllProType,callback);
}
export function getPro(data,callback){
    POST(api.getPro,data,callback);
}
export function adddetailimg(data,callback){
    POST(api.adddetailimg,data,callback);
}
export function deldetailimg(data,callback){
    POST(api.deldetailimg,data,callback);
}