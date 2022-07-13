import axios from "axios";
export const API_KEY = "39008b197a5755859d6786a809d485be";

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
