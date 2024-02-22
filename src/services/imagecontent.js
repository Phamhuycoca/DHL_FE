import apiClient from "./contants";
const imagecontentAPI = {
  // async _getAll(id) {
  //   return await apiClient.get(`ImageContent/${id}`);
  // },
  async _getAll() {
    return await apiClient.get(`ImageContent`);
  },
};

export default imagecontentAPI;
