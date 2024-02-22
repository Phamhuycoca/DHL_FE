import apiClient from "./contants";
const config = {
  headers: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': `Bearer ${token}`
  }
};
const userAPI = {
  async _getById(id) {
    return await apiClient.get(`User/${id}`);
  },
  async _update(id,data) {
    return await apiClient.put(`User/${id}`,data,config);
  },
  async _changepassword(id,data) {
    return await apiClient.put(`User/ChangePassword/${id}`,data);
  }
};

export default userAPI;
