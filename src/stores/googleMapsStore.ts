import googleMaps from "@/lib/googlemaps";
import {defineStore} from "pinia";


export const useGoogleMapsStore = defineStore("googlemaps", {
    state: () => ({
        distance: null,
    }),
    getters: {
        getDistance(state){
            return state.distance
        }
    },
    actions: {
        async fetchDistance(params: object) {
            try {
                const data = await googleMaps.get('', {params})
                this.distance = data.data.rows[0].elements[0].distance.text;

            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        }

    },

})
