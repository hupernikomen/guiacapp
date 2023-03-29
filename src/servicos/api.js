import axios from "axios";

const api = axios.create({
    baseURL:"http://192.168.0.103:3333"
    // baseURL:"http://10.12.70.135:3333"
    // baseURL:"http://192.168.1.3:3333"
    // baseURL:"http://localhost:3333"
})

export default api