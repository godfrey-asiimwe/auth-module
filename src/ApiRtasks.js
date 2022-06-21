import axios from 'axios';

export default axios.create({
    baseURL: "https://mocki.io/v1/a4a7c946-72cc-4f71-8861-2137393351fa",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})