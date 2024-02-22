import { userId } from "@/services/middleware";

const authStore={
    namespaced: true,
    state: {
      token: '',
      userId:''
    },
    getters:{
        gettoken:(state)=>state.token,
        getuserId:(state)=>state.userId
    },
    mutations: {
        setToken(state, data) {
          state.token = data;
        },
        resetToken(state){
          state.token = '';
        },
        setUserId(state,data){
          state.userId = data;
        }
      },
    actions: {
        Login(context,data){
          userId._getUserId().then(res=>{
            localStorage.setItem('userId', res);
            context.commit('setUserId',res);
          }).catch(err=>{
            console.log(err);
          }).finally(()=>{
            localStorage.setItem('token', data);
            context.commit('setToken',data);
          })
        },
        ResetToken(context){
          console.log('resetToken');
          localStorage.clear('token');
          context.commit('resetToken')
        },
        Refresh(context){
          if(localStorage.getItem('token') || localStorage.getItem('userId')){
            context.commit('setToken',localStorage.getItem('token'))
            context.commit('setUserId',localStorage.getItem('userId'))
          }
        }
    } 
}
export default authStore;