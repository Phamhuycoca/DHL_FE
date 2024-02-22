import apiClient from "./contants";

const departmentAPI = {
  async _getAll() {
    return await apiClient.get('Department');
  },
  async _create(data) {
    return await apiClient.post('Department', data);
  },
  async _update(id, data) {
    return await apiClient.put(`Department/${id}`, data);
  },
  async _delete(id) {
    return await apiClient.delete(`Department/${id}`);
  },
  async _getById(id) {
    return await apiClient.get(`Department/${id}`);
  }
};

export default departmentAPI;
