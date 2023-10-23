<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from "./components/navigation/NavBar.vue";
</script>

<template>
  <div class="main-container">
    <NavBar/>
    <RouterView />
  </div>

</template>

<style scoped>
.main-container{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  width: 100vw;
}

</style>
