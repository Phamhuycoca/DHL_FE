import apiClient from "./contants";

const noticationAPI = {
  async _getAlls() {
    return await apiClient.get('Notication');
  },
  async _getAll(id) {
    return await apiClient.get('Notication/Index/'+`${id}`);
  },
  async _create(data) {
    return await apiClient.post('Notication', data);
  },
  async _update(id, data) {
    return await apiClient.put(`Notication/${id}`, data);
  },
  async _delete(id) {
    return await apiClient.delete(`Notication/${id}`);
  },
  async _getById(id) {
    return await apiClient.get(`Notication/${id}`);
  }
};

export default noticationAPI;
