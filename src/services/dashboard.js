import apiClient from "./contants";

const dashboardAPI = {
  async _thongKeTheoTuan() {
    return await apiClient.get('Dashboard/ThongKeTheoTuan');
  },
  async _thongKeBaiViet() {
    return await apiClient.get('Dashboard/ThongKeBaiViet');
  },
};

export default dashboardAPI;
