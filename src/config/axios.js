import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://agenda-interview.herokuapp.com/api/agenda/' //SERVER
    //baseURL: 'http://127.0.0.1:5500/api/agenda/' //LOCAL 
})


export default axiosClient;