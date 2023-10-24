<script setup lang="ts">
import AppointmentList from "../components/appointments/AppointmentList.vue";
</script>
<template>
  <div class="about">
    <h1>Appointments</h1>
    <AppointmentList></AppointmentList>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
