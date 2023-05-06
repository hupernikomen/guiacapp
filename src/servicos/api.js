import axios from "axios";

const api = axios.create({
    baseURL:"https://guiacapi.onrender.com"

})

export default api