import axios from "axios";

const AxiosClient = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });
};
export default AxiosClient;
