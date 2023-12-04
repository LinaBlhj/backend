import axios from "axios";

export default axios.create({
  baseURL: "https://projet-serj.onrender.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
