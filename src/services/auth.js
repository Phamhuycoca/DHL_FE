import apiClient from "./contants";

const authAPI = {
  async _login(data){
    return await apiClient.post('/Account/Login', data);
  },
  async _resgiter(data){
    return await apiClient.post('/Account/Register', data);
  }
  
};

export default authAPI;
