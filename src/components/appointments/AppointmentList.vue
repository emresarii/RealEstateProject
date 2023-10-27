<script setup lang="ts">
import {useAppointmentStore} from "@/stores/appointmentStore";
import {onMounted,onUnmounted} from  "vue";
import {useRouter} from "vue-router";
const router = useRouter()
const store = useAppointmentStore();
onMounted(() => {
  return store.fetchAppointments()
})
onUnmounted(()=>{
  return store.$reset()
})
function loadMore(){
  store.fetchAppointments()
}
function navigate(id:string){
  router.push(`/randevular/${id}`)
}
function changeOrder(e){
  store.setSorting(e.target.value)
  store.fetchAppointments()
}
</script>
<template>
  <div class="list-container">
    <div class="list-headers">
      <div class="list-header">Randevu Zamanı</div>
      <div class="list-header">Müşteri Email</div>
      <div class="list-header">Müşteri Numarası</div>
      <div class="list-header">Emlakçı</div>
      <div class="list-header">Müşteri</div>
    </div>
    <div v-for="appointment in store.getAppointments" :key="appointment.id">
      <div class="list-view" @click="navigate(appointment.id)" >
        <div class="list-item" >{{ appointment.fields.appointment_date }}</div>
        <div v-if="Array.isArray(appointment.fields.contact_email)" class="list-item">{{appointment.fields.contact_email[0]}}</div>
        <div class="list-item" v-else>No Information</div>
        <div v-if="Array.isArray(appointment.fields.contact_phone)" class="list-item"> {{appointment.fields.contact_phone[0]}}</div>
        <div class="list-item" v-else>No Information</div>
        <div v-if="Array.isArray(appointment.fields.agent_name)" class="list-item"> {{appointment.fields.agent_name[0]}}  {{appointment.fields.agent_surname[0]}}</div>
        <div class="list-item" v-else>No Information</div>
        <div v-if="Array.isArray(appointment.fields.contact_name)" class="list-item"> {{appointment.fields.contact_name[0]}}  {{appointment.fields.contact_surname[0]}}</div>
        <div class="list-item" v-else>No Information</div>
      </div>
    </div>
  </div>
  <div class="controllers">
    <button @click="loadMore" class="more-btn">Daha fazla randevu yükle</button>
    <select @change="changeOrder" class="filter-select">
      <option value="asc">Artan</option>
      <option value="desc">Azalan</option>
    </select>
  </div>

</template>

<style scoped>
.more-btn {
  appearance: none;
  background-color: #000000;
  border: 2px solid #1A1A1A;
  border-radius: 5px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-right: 20px;
  min-height: 30px;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
}
.filter-select{
  padding: 5px;
}
.controllers{
  padding-top: 35px;
}
.more-btn:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.more-btn:active {
  box-shadow: none;
  transform: translateY(0);
}

.list-view{
  display: flex;
  border: RGB(238 238 238) 2px solid;
  border-radius: 3px;
  width: calc(100vw - 400px);
  margin-bottom: 2px;

}
.list-container {
  height: calc(100vh - 200px);
  overflow-y: scroll ;
}

.list-item{
  padding: 5px;
  width: 300px;
  margin:1px;
  font-size: 14px;
  cursor: pointer;
}

.list-view:hover{
  box-shadow: 0px 10px 45px -11px rgba(0,0,0,0.1);
}

.list-headers{
  display: flex;
}


.list-header{
  width: 300px;
  margin-right: 7px;
  padding-bottom: 10px;
  border-right: RGB(238 238 238) 1px solid;

}
</style>
