import axios from "axios";

const googleMaps = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/distancematrix/json?'
});

export default googleMaps;

