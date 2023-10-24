import axios from "@/lib/axios";
import { defineStore } from 'pinia'
import type {Appointment} from "@/models/appointment";

interface FilterParams{
    offset?: string;
}
export const useAppointmentStore = defineStore("appointment", {
    state: () => ({
        appointments: Array<Appointment>,
        pageSize: 10,
        offset: null
    }),
    getters: {
        getAppointments(state){
            return state.appointments
        }
    },
    actions: {
        async fetchAppointments() : Promise<Array<Appointment>> {
            try {
                const params:FilterParams = {}
                if(this.offset){
                    params.offset= this.offset
                }
                const data = await axios.get('Appointments',{params})
                this.appointments = data.data.records

            }
            catch (error) {
                alert(error)
                console.log(error)
                return []
            }
        }
    },
})