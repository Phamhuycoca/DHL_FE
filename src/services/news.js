import apiClient from "./contants";

const newsAPI = {
  async _getAlls() {
    return await apiClient.get('News');
  },
  async _getAll(id) {
    return await apiClient.get('News/Index/'+`${id}`);
  },
  async _create(data) {
    return await apiClient.post('News', data);
  },
  async _update(id, data) {
    return await apiClient.put(`News/${id}`, data);
  },
  async _delete(id) {
    return await apiClient.delete(`News/${id}`);
  },
  async _getById(id) {
    return await apiClient.get(`News/${id}`);
  }
};

export default newsAPI;
