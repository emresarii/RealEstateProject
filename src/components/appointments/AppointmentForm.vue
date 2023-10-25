<template>
  <div>
    <form action="" @submit.prevent="handleSubmit">
      <label for="appointment_postcode">Posta Kodu:</label>
      <input type="text" id="appointment_postcode" required v-model="appointment_postcode">

      <label for="password">Randevu Tarihi</label>
      <input type="text" required v-model="appointment_date">

      <label for="role">Agent:</label>
      <select v-model="agent_id" >
        <option v-for="agent in agentStore.getAgents" :key="agent.id" :value="agent.id">{{agent.fields.agent_name}} {{agent.fields.agent_surname}}</option>
      </select>
      <label for="role">Customer:</label>
      <select v-model="contact_id" @change="handleContact">
        <option v-for="contact in contactStore.getContacts" :key="contact.id" :value="contact.id">{{contact.fields.contact_name}} {{contact.fields.contact_surname}}</option>
      </select>

      <div class="submit">
        <button>Create an Appointment</button>
      </div>
    </form>
    <p>Postcode: {{ appointment_postcode }}</p>
    <p>Date: {{ appointment_date }}</p>
    <p>Contact: {{ contact_id }}</p>
    <p>Agent: {{ agent_id }}</p>
    <p>Agent: {{ contact_email }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAgentStore } from "@/stores/agentStore";
import {ref} from "vue";
import {useContactStore} from "@/stores/contactStore";
import {useAppointmentStore} from "@/stores/appointmentStore";

const agentStore = useAgentStore();
const contactStore = useContactStore();
const appointStore = useAppointmentStore();
onMounted(() => {
  agentStore.fetchAgents()
  contactStore.fetchContacts()

})
const appointment_postcode = ref('');
const appointment_date = ref('');
const contact_id = ref('');
const agent_id = ref('');
const contact_email = ref('')
const contact_phone = ref('')

function handleContact(){
  const contacts = JSON.parse(JSON.stringify(contactStore.getContacts))
  const index = contacts.findIndex(item => item.id === contact_id.value)
  if (index !== -1) {
    contact_email.value = contacts[index].fields.contact_email;
    contact_phone.value = contacts[index].fields.contact_phone;
  } else {
    contact_email.value = '';
    contact_phone.value = '';
  }

}
function handleSubmit() {
  console.log(JSON.parse(JSON.stringify(contactStore.getContacts)))
  const payload = {
    appointment_date: appointment_date.value,
    appointment_postcode: appointment_postcode.value,
    contact_id: [contact_id.value],
    agent_id:[agent_id.value]
  }
  appointStore.createAppointment(payload)
}

</script>

<style scoped>
/* Your styles remain the same */
</style>
