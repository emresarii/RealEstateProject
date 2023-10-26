import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.postcodes.io/postcodes'
});

export default instance;