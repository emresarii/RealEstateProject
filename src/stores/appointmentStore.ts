import axios from "@/lib/axios";
import { defineStore } from 'pinia'
import type {Appointment} from "@/models/appointment";


interface FilterParams{
    offset?: string;
    pageSize?: number;

}
export const useAppointmentStore = defineStore("appointment", {
    state: () => ({
        appointments: [] as Appointment[],
        pageSize: 18,
        offset: null,
        appointment: {},
        postcode: null,
        sort: "desc",
    }),
    getters: {
        getAppointments(state){
            return state.appointments
        },
        getPostcode(state){
            return state.postcode
        },
        getSingleApp(state){
            return state.appointment
        }
    },
    actions: {
        async fetchAppointments() : Promise<Array<Appointment>> {
            try {
                const params:FilterParams = {
                    pageSize: this.pageSize,
                }
                if(this.offset){
                    params.offset= this.offset
                }
                const data = await axios.get('Appointments',{params: {...params,"sort[0][field]":"appointment_date","sort[0][direction]": this.sort}})
                this.appointments = [...this.appointments,...data.data.records]
                this.offset= data.data.offset

            }
            catch (error) {
                alert(error)
                console.log(error)
                return []
            }
        },
        async createAppointment(postData: Appointment) {
            try {
                const data = await axios.post('Appointments', {fields:{...postData}})
                this.appointment = data.data

            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        setSorting(order:string){
            this.appointments= []
            this.offset = null
            this.sort=order
        },
        async getAppointment(id:string) {
            try {
                const data = await axios.get(`Appointments/${id}` )
                this.appointment = data.data

            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        }

    },


})