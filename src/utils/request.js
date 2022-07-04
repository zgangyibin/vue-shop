import axios from "axios";
import { Notify } from 'vant';
import {showLoading,hideLoading} from "../components/loading"

// 添加请求拦截器
axios.interceptors.request.use(function(config){
  config.headers = {
    ...config.headers,
    // 请求头
    Authorization:localStorage.getItem("token"),
  }
  return config;
},function(error){
  return Promise.reject(error);
})

function responsOk(res,callback){ 
  hideLoading(); 
  const { data } = res;
  if(data.success){ 
    callback(data)
  } else { 
    Notify(data.message);
  }
}
function handleErr(err){ 
  Notify(err.message);
  hideLoading(); 
}
/**
 * 
 * @param {*} url  请求数据地址
 * @param {*} callback 请求成功的的回调函数
 * @returns 
 */
export function GET(url,callback){ // 把axios的get请求进行封装
  showLoading(); // 请求之前显示加载状态
  axios.get(url)
      .then((res)=>responsOk(res,callback))
      .catch(handleErr)
}

export function POST(url,param,callback){ 
  showLoading();
  axios.post(url,param)
      .then((res)=>responsOk(res,callback))
      .catch(handleErr)
}