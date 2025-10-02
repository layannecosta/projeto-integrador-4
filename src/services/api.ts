import axios from "axios";

const api = axios.create({
    baseURL: "https://api-projeto-integrador.vercel.app/"
})

export default api;