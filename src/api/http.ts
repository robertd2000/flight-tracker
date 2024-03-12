import axios from "axios";

const http = axios.create({
  baseURL: `https://opensky-network.org/api/`,
});

export default http;
