import axios from "axios";


export default axios.create({
  baseURL: "https://5ff9-45-125-7-127.ngrok-free.app/api/v1/auth"
})