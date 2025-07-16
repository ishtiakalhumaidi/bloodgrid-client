// hooks/useAxiosSecure.js
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://bloodgrid-server.vercel.app/",
});

let interceptorsSet = false;

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!interceptorsSet && user?.accessToken) {
      interceptorsSet = true;

      axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => Promise.reject(error)
      );

      // ✅ Response Interceptor
      axiosSecure.interceptors.response.use(
        (res) => res,
        async (error) => {
          const status = error.response?.status;
          if (status === 403) {
            navigate("/forbidden");
          } else if (status === 401) {
            await logOut();
            navigate("/auth/login");
          }
          return Promise.reject(error);
        }
      );
    }
  }, [user?.accessToken, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
