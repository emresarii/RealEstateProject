<template>
  <GoogleMap api-key="AIzaSyBY-4hdnB_FBH_rFDzCAYHhg0L2fTtzmjc" style="width: 100%; height: 500px" :center="center" :zoom="15" @click="onMapClick">
    <Marker :options="{ position: markerPosition, zoom:zoom}"/>
  </GoogleMap>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
const center = ref({ lat: 40.689247, lng: -74.044502 })
const zoom = ref(10)
const markerPosition = ref(center)
const emits = defineEmits(['location'])

const onMapClick = (event) => {
  markerPosition.value = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
  emits("location", JSON.parse(JSON.stringify(markerPosition.value)))
};
</script>