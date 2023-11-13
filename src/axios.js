import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/v1/",
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8080/v1",
    "Accept-Charset": "utf-8, iso-8859-1;q=0.5",
    "Content-type": "application/json",
  },
});

export default instance;
