interface Appointment {
    appointment_id: number;
    appointment_date: string;
    appointment_postcode: string;
    contact_id: Array<string>;
    contact_name: Array<string>;
    agent_id: Array<string>;
    agent_name: Array<string>;
    agent_surname: Array<string>;
    contact_surname: Array<string>;
    contact_email:Array<string>;
    contact_phone:Array<string>;
}


export {Appointment}