import apiClient from "./contants";
const config = {
  headers: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': `Bearer ${token}`
  }
};
const newscontentAPI = {
  async _getAll(id) {
    return await apiClient.get(`NewsContent/Index/${id}`);
  },
  async _create(data) {
    return await apiClient.post('NewsContent', data,config);
  },
  async _update(id, data) {
    return await apiClient.put(`NewsContent/${id}`, data,config);
  },
  async _delete(id) {
    return await apiClient.delete(`NewsContent/${id}`);
  },
  async _getById(id) {
    return await apiClient.get(`NewsContent/${id}`);
  }
};

export default newscontentAPI;
