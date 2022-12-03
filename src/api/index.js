import axios from 'axios';

const token = localStorage.getItem('TOKEN')
const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
});
http.interceptors.request.use((config) => {
    config.headers.Authorization = `${token}`
    return config
})
export {http};
