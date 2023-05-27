import axios from "axios";

const api = axios.create({
    baseURL:"https://guiacapi.onrender.com"
    // baseURL:"http://192.168.0.103:3333"

})

export default api