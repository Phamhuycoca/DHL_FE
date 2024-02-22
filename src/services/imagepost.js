import apiClient from "./contants";
const imagepostAPI = {
  // async _getAll(id) {
  //   return await apiClient.get(`ImageContent/${id}`);
  // },
  async _getAll() {
    return await apiClient.get(`ImagePost`);
  },
};

export default imagepostAPI;
