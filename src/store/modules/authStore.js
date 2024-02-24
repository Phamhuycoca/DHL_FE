import { userId } from "@/services/middleware";

const authStore={
    namespaced: true,
    state: {
      token: '',
      userId:'',
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
          localStorage.setItem('userId', data.userId);
          context.commit('setUserId',data.userId);
          localStorage.setItem('token', data.token);
          context.commit('setToken',data.token);
          localStorage.setItem('role', data.role);
        },
        ResetToken(context){
          console.log('resetToken');
          localStorage.clear('token');
          context.commit('resetToken')
          localStorage.clear('role'); 
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