import apiClient from "./contants";
const token=localStorage.getItem('token');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  };
const commentsPostAPI = {
  async _getAll() {
    return await apiClient.get('CommentPost');
  },
  async _create(data) {
    return await apiClient.post('CommentPost', data,config);
  },
  async _update(id, data) {
    return await apiClient.put(`CommentPost/${id}`, data,config);
  },
  async _delete(id) {
    return await apiClient.delete(`CommentPost/${id}`,config);
  },
  async _getListById(id) {
    return await apiClient.get(`CommentPost/GetCommentsByPostId/${id}`);
  }
};

export default commentsPostAPI;
