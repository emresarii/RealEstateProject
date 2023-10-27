<template>
  <div class="appoint-form-wrapper">
    <form action="" @submit.prevent="handleSubmit" class="appoint-form">
      <div class="appoint-form-body">
        <div class="appoint-inputs-text">
          <label for="appointment_postcode">Posta Kodu</label>
          <input type="text" id="appointment_postcode" :disabled=true required v-model="appointment_postcode">

          <label for="date_time">Randevu Tarihi</label>
          <input type="datetime-local" required v-model="appointment_date">

          <label for="role">Emlakçı</label>
          <select v-model="agent_id" required>
            <option v-for="agent in agentStore.getAgents" :key="agent.id" :value="agent.id">{{agent.fields.agent_name}} {{agent.fields.agent_surname}}</option>
          </select>
          <label for="role">Müşteri</label>
          <select v-model="contact_id" @change="handleContact" req>
            <option v-for="contact in contactStore.getContacts" :key="contact.id" :value="contact.id">{{contact.fields.contact_name}} {{contact.fields.contact_surname}}</option>
          </select>
        </div>
        <div class="appoint-map">
          <SelectMap v-on:location="handleLocation"></SelectMap>
        </div>
      </div>

      <div class="submit">
        <button :disabled=isDisabled class="submit-btn">Randevu oluştur</button>
      </div>
    </form>
    <p>{{msg}}</p>
    <p>Araç ile ofise olan yaklaşık uzaklık: {{estimated_time}}</p>
    <p id="calculated_time"></p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAgentStore } from "@/stores/agentStore";
import {ref} from "vue";
import {useContactStore} from "@/stores/contactStore";
import {useAppointmentStore} from "@/stores/appointmentStore";
import SelectMap from "@/components/maps/SelectMap.vue";
import {usePostcodeStore} from "@/stores/getPostCode";
import { Loader } from "@googlemaps/js-api-loader"
import axios from "@/lib/axios";
import moment from "moment";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});
const agentStore = useAgentStore();
const contactStore = useContactStore();
const appointStore = useAppointmentStore();
const postcodeStore = usePostcodeStore();
onMounted(() => {
  agentStore.fetchAgents()
  contactStore.fetchContacts()
  msg.value = "Lütfen yukarıdaki tüm alanları doldurun."
})
const appointment_postcode = ref('');
const appointment_date = ref('');
const contact_id = ref('');
const agent_id = ref('');
const contact_email = ref('')
const contact_phone = ref('')
const location= ref('')
const isDisabled = ref(true)
const msg = ref ("")
const estimated_time= ref ("")
const estimatedFreeTime = ref("")

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
async function handleSubmit() {
  const payload = {
    appointment_date: appointment_date.value,
    appointment_postcode: appointment_postcode.value,
    contact_id: [contact_id.value],
    agent_id: [agent_id.value]
  }
  if (appointment_date.value) {
    const date = new Date(appointment_date.value)
    const freeTime= moment(date).add(3600, 'seconds').format('YYYY-MM-DD[T]HH:mm')
    const correctTime = moment(date).subtract(estimatedFreeTime.value, 'seconds').format('YYYY-MM-DD[T]HH:mm')
    const data = await axios.get(`Appointments?filterByFormula=AND(%7Bappointment_date%7D+%3E%3D'${correctTime}'%2C+%7Bappointment_date%7D+%3C%3D'${freeTime}'%2C+%7Bappointment_postcode%7D%3D'${appointment_postcode.value}')`)
    if(data.data.records.length >0 ){ //Burası yol hesaplamaları sonrası gelecek ve 1 saatlik appointment aralıklarını düşünerek bir önceki appointmentın bitiş tarihine göre hesaplanmıştır.
      msg.value = "Bu lokasyonda ve tarihte başka bir toplantı bulunmakta."
    }else{
      msg.value ="Appointment Created"
      appointStore.createAppointment(payload)
    }
  }
}

async function handleLocation(newLocation) {
  location.value = newLocation
  const locationObject = newLocation
  const params = {lat: locationObject.lat, lon: locationObject.lng}
  try {
    await loader.load();

    const service = new google.maps.DistanceMatrixService();
    const origin = new google.maps.LatLng(51.728922, 0.477934);
    const destination = new google.maps.LatLng(locationObject.lat, locationObject.lng);
    const request = {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING, // You can change the travel mode as needed
      unitSystem: google.maps.UnitSystem.IMPERIAL, // You can change the unit system as needed
    };
    service.getDistanceMatrix(request, (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        const element = response.rows[0].elements[0];
        if (element.status === google.maps.DistanceMatrixElementStatus.OK) {
          const travelTime = element.duration.text;
          estimated_time.value = travelTime
          estimatedFreeTime.value = element.duration.value
        } else {
          estimated_time.value = ""
        }
      } else {
        estimated_time.value = ""
      }
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  await postcodeStore.getPostcode(params)
  const parsedPostcode = JSON.parse(JSON.stringify(postcodeStore.getPost))
  if (parsedPostcode.result === null) {
    msg.value= "Posta kodu bulunamadı, lütfen başka bir yer seçiniz."
    isDisabled.value = true
    appointment_postcode.value = ""
  } else {
    if (parsedPostcode.result[0].country === "England") {
      appointment_postcode.value = parsedPostcode.result[0].postcode
      isDisabled.value = false
      msg.value = "Posta kodu bulundu"
    } else {
      msg.value = "Posta kodu bulunamadı, lütfen geçerli bir adres seçiniz."
    }
  }
}
</script>

<style scoped>
.appoint-form {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  width: calc(100vw - 350px);
}

.appoint-inputs-text >input {
  width: 400px;
  padding: 5px;
  border-radius: 4px;
}

.appoint-inputs-text > select {
  width: 410px;
  padding: 5px;
  border-radius: 4px;
  background: white;
}
.appoint-form-body{
  display: flex;
  flex-direction: row;
}
.appoint-inputs-text {
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  padding-top: 90px;
}
.appoint-map {
  width: 1200px;
  border: black 2px solid;
  border-radius: 5px;
}

.submit {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.submit-btn{
  appearance: none;
  background-color: #000000;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
}

.submit-btn:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.submit-btn:active {
  box-shadow: none;
  transform: translateY(0);
}
.submit-btn:disabled{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  box-shadow: none;
  transform: none;
}


</style>
