import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.18.6:8080",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})