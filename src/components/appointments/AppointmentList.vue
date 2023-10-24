<script setup lang="ts">
import {useAppointmentStore} from "@/stores/appointmentStore";
import {onMounted} from  "vue";
const store = useAppointmentStore();
onMounted(() => {
  return store.fetchAppointments()
})
</script>
<template>
  <div class="list-container">
    <h1>Made By Getters</h1>
    <div class="list-headers">
      <div class="list-header">Appointment Time</div>
      <div class="list-header">Contact Email</div>
      <div class="list-header">Appointment Time</div>
    </div>
    <div v-for="appointment in store.getAppointments" :key="appointment.id">
      <div class="list-view">
        <div class="list-item">{{ appointment.id }}</div>
        <div class="list-item">{{ appointment.createdTime }}</div>
        <div class="list-item">{{ appointment.fields.contact_email[0] }}</div>
      </div>


    </div>
  </div>
</template>

<style scoped>
.list-view{
  display: flex;
}

.list-item{
  border: #000100 solid 1px;
  padding: 5px;
  width: 200px;
  margin:1px;
}

.list-headers{
  display: flex;
}

.list-header{
  width: 200px;
  padding: 5px;
}
</style>
