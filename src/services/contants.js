import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://localhost:7125/api",
});
export default apiClient;