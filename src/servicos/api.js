import axios from "axios";

const api = axios.create({
    baseURL:"https://guiacapp.herokuapp.com"

})

export default api