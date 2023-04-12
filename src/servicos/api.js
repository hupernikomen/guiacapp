import axios from "axios";

const api = axios.create({
    baseURL:"https://deploygc-api.herokuapp.com"

})

export default api