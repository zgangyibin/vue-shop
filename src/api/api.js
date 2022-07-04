const productUrl = "https://8i98.com"; // 产品环境地址
const devUrl = ""; // 开发环境地址
const url = devUrl; //打包的时候切换不同的地址
export const imgUrl = "https://8i98.com/apidoc/";// 图片服务器地址
export default {
  getBanner: `${url}/dapi/vapi/getBanner`,
  getAllProType: `${url}/dapi/vapi/getAllProType`,
  getPro: `${url}dapi/vapi/getPro`,
  getDetail: `${url}dapi/vapi/getDetail`,
  register: `${url}dapi/vapi/register`,
  login: `${url}dapi/vapi/login`,
  profile: `${url}dapi/vapi/profile`,
  adddetailimg: `${url}dapi/vapi/adddetailimg`,
  deldetailimg: `${url}dapi/vapi/deldetailimg`,
  updateavatar:`${url}dapi/vapi/updateavatar`,
  updateProfile:`${url}dapi/vapi/updateProfile`,
  saveMoney:`${url}dapi/vapi/saveMoney`,
  updatePopular:`${url}dapi/vapi/updatePopular`,
  createOrder:`${url}dapi/vapi/createOrder`,
  payOrder:`${url}dapi/vapi/payOrder`,
  getOrders:`${url}dapi/vapi/getOrders`,
  updateProStatus:`${url}dapi/vapi/updateProStatus`,
  saveArticle:`${url}dapi/vapi/saveArticle`,
  updateOrders:`${url}dapi/vapi/updateOrders`,
  updateOrderProlist:`${url}dapi/vapi/updateOrderProlist`,
  getArticle:`${url}dapi/vapi/getArticle`,
}