import apiClient from "./contants";
const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        // 'Authorization': `Bearer ${token}`
    }
  };
const postAPI = {
  async _getAllss() {
    return await apiClient.get('Post/getAlls');
  },
  async _getAlls() {
    return await apiClient.get('Post');
  },
  async _getAll(id) {
    return await apiClient.get('Post/Index/'+id);
  },
  async _create(data) {
    return await apiClient.post('Post', data,config);
  },
  async _update(id, data) {
    return await apiClient.put(`Post/${id}`, data,config);
  },
  async _delete(id) {
    return await apiClient.delete(`Post/${id}`);
  },
  async _getById(id) {
    return await apiClient.get(`Post/${id}`);
  }
};

export default postAPI;
