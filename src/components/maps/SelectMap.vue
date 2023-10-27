<template>
  <GoogleMap :api-key=api_key style="width: 100%; height: 500px" :center="center" :zoom="15" @click="onMapClick">
    <Marker :options="{ position: markerPosition, zoom:zoom}"/>
  </GoogleMap>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
const center = ref({ lat: 51.5072, lng: 0.1276 })
const zoom = ref(10)
const markerPosition = ref(center)
const emits = defineEmits(['location'])
const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const onMapClick = (event) => {
  markerPosition.value = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
  emits("location", JSON.parse(JSON.stringify(markerPosition.value)))
};
</script>