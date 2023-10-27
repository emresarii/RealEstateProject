import postcodes from "@/lib/postcodes";
import {defineStore} from "pinia";


export const usePostcodeStore = defineStore("postcode", {
    state: () => ({
        postcode: null,
    }),
    getters: {
        getPost(state){
            return state.postcode
        }
    },
    actions: {
        async getPostcode(params: object) {
            try {
                const data = await postcodes.get('', {params})
                this.postcode = data.data

            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        }

    },

})
