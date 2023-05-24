import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:2625/",
});

export default request;
