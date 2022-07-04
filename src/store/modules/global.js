export default {
    namespaced:true,
    state:{//放sessionStorage里面
        typeList:sessionStorage.getItem("TYPELIST")?JSON.parse(sessionStorage.getItem("TYPELIST")):[],//分类数据
        bannerList:sessionStorage.getItem("BANNER")?JSON.parse(sessionStorage.getItem("BANNER")):[],//轮播图数据全局变量
    },
    getters:{
        getBannerList(state){
            return state.bannerList;
        },
        getTypeList(state){
            return state.typeList;
        },
        getTypeListLevel0(state){
            return state.typeList.filter((item)=>item.typelevel === 0)
        },
        getHotTypeList(state){
            let arr = state.typeList.filter((item)=>String(item.fatherid).search("1")>-1 && item.typelevel === 1)
            if(arr.length > 4){
                arr = arr.slice(0,4);
            }
            return arr;
        }
    },
    mutations:{
        setTypeList(state,payload){//mutation修改state
            sessionStorage.setItem("TYPELIST",JSON.stringify(payload.data));
            state.typeList = payload.data;
        },
        setBannerList(state,payload){
          sessionStorage.setItem("BANNER",JSON.stringify(payload.data));
          state.bannerList = payload.data;  
        },
    },
    actions:{
        setTypeListAction(context,payload){
            context.commit({//commit触发mutation
                ...payload,
                type:"setTypeList"
            })
        },
        setBannerListAction(context,payload){
            context.commit({//commit触发mutation
                ...payload,
                type:"setBannerList"
            })
        },
    }
}