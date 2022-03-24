import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.18.203:8000",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})