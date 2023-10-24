import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.airtable.com/v0/appgykZBGTF92MnHu/',
    headers: {'Authorization': 'Bearer ' + import.meta.env.VITE_API_KEY}
});

export default instance;