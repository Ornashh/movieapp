import axios from "axios";

const instance = () => {
  const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
    }
  );

  return axiosInstance;
};

export default instance;
