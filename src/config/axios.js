import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:5500/api/agenda/'
})


export default axiosClient;