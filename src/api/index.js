import axios from 'axios';

const token = localStorage.getItem('TOKEN')
const http = axios.create({
    baseURL: "https://products.halyklife.kz",
});
http.interceptors.request.use((config) => {
    config.headers.Authorization = `${token}`
    return config
})
export {http};
