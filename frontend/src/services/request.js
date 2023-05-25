import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:2625/",
  withCredentials: true,
});

export default request;
