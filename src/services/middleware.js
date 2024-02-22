import apiClient from "./contants";

const token=localStorage.getItem('token');
// export const decodetoken ={
//     async _DecodeToken() {
//      const res= await apiClient.post(`Account/DecodeToken?token=${token}`);
//      return res.data.role;
//     }
// }
export const userId ={
    async _getUserId() {
        const res= await apiClient.post(`Account/DecodeToken?token=${token}`);
     return res.data.user;
    }
}
