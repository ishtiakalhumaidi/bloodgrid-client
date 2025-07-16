import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://bloodgrid-server.vercel.app/`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
