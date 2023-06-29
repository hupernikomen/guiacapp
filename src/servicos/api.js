import axios from "axios";

const api = axios.create({
    baseURL:"https://guiacapp-api.herokuapp.com/"

})

export default api