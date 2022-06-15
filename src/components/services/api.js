import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.jsonbin.io/b/629a974305f31f68b3b56157/1'
});

export default api; 