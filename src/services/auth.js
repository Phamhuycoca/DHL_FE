import apiClient from "./contants";
const config = {
  headers: {
    "Content-Type": "application/json",
  }
};
const authAPI = {
  async _login(data){
    return await apiClient.post('/Account/Login', data);
  },
  async _resgiter(data){
    return await apiClient.post('/Account/Register', data);
  },
  async _forgot(data){
    return await apiClient.post('/Account/forgot',data, config);
  }
  
};

export default authAPI;
