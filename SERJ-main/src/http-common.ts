import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3005/api",
  headers: {
    "Content-type": "application/json"
  }
});
