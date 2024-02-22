import apiClient from "./contants";

const authAPI = {
  async _login(data){
    return await apiClient.post('/Account/Login', data);
  }
};

export default authAPI;
