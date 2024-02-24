import apiClient from "./contants";
const token=localStorage.getItem('token');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  };
const commentsNewsAPI = {
  async _getAll() {
    return await apiClient.get('CommentNews');
  },
  async _create(data) {
    return await apiClient.post('CommentNews', data,config);
  },
  async _update(id, data) {
    return await apiClient.put(`CommentNews/${id}`, data,config);
  },
  async _delete(id) {
    return await apiClient.delete(`CommentNews/${id}`,config);
  },
  async _getListById(id) {
    return await apiClient.get(`CommentNews/GetCommentsByUserId/${id}`);
  },
 
};

export default commentsNewsAPI;
