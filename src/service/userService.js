import { GET,POST } from '../utils/request'
import api from "../api/api"

export function register(data,callback){
    POST(api.register,data,callback);
}
export function login(data,callback){
    POST(api.login,data,callback);
}
export function profile(callback){
    GET(api.profile,callback)
  }
  
export function updateavatar(data,callback){
    POST(api.updateavatar,data,callback);
}
export function updateProfile(data,callback){
    POST(api.updateProfile,data,callback);
}
export function saveMoney(data,callback){
    POST(api.saveMoney,data,callback);
}