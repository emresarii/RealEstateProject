import axios from "axios";

const postcodes = axios.create({
    baseURL: 'https://api.airtable.com/v0/appgykZBGTF92MnHu/',
    headers: {'Authorization': 'Bearer ' + import.meta.env.VITE_API_KEY}
});

export default postcodes;