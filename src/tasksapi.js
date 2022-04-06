import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.18.9:8000",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})

