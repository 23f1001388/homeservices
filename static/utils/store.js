const store=Vuex.createStore({
    state:{
        loggedIn:false,
        current_user:null,
        role:""
    },
    mutation:{
        setUser(state,user){
            state.loggedIn=true;
            state.current_user=user;
        },
        clearUser(state){
            state.loggedIn=false;
            state.current_user=null;
        },
        setRole(state,role){
            state.role=role;
        },
    },
    actions:{
        login({commit},user){
            commit('setUser',user);
        },
        logout({commit}){
            commit('clearUser');
        },
    },
    getters:{
        getCurrentUser:state=>state.current_user,
    }
});

export default store;