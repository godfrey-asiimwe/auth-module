import axios from 'axios';

export default axios.create({

    baseURL: "http://192.168.18.24:8400",

    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }

})

