import axios from "axios";

const instance = axios.create({
  // baseURL: "http://34.135.58.98:5005/api/",
  baseURL: "https://pbp.morningwalkusa.com/api",

});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
  
    return Promise.reject(err);
  },
);

export default instance;
