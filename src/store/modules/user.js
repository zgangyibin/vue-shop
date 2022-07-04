export default {
    namespaced:true,
    state: {
        profile:localStorage.getItem("PROFILE")?JSON.parse(localStorage.getItem("PROFILE")):{}
    },
    getters:{
        profile(state){
            return state.profile
        }
    },
    mutations:{
        setProfile(state,payload){
            state.profile=payload.data;
            localStorage.setItem("PROFILE",JSON.stringify(payload.data));
        }
    },
    actions:{
        profileAction(context,payload){
            context.commit({
                type:"setProfile",
                ...payload
            })
        }
    }
}