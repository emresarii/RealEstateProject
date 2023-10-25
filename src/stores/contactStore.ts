import axios from "@/lib/axios";
import { defineStore } from 'pinia'
import type {Contact} from "@/models/contact";


export const useContactStore = defineStore("contact", {
    state: () => ({
        contacts: [] as Contact[],
        contact: null,
    }),
    getters: {
        getContacts(state){
            return state.contacts.filter(x=> x.fields.contact_name != null)
        }
    },
    actions: {
        async fetchContacts() : Promise<Array<Contact>> {
            try {
                const data = await axios.get('Contacts')
                this.contacts = data.data.records

            }
            catch (error) {
                alert(error)
                console.log(error)
                return []
            }
        },
        async fetchContact() : Promise<Array<Contact>> {
            try {
                const data = await axios.get('Contats')
                this.contact = data.data.records

            }
            catch (error) {
                alert(error)
                console.log(error)
                return []
            }
        },

    },

})