<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from "./components/navigation/NavBar.vue";
</script>

<template>
  <div class="main-container">
    <NavBar/>
    <RouterView class="view-container"/>
  </div>

</template>

<style scoped>
.main-container{
  display: flex;
  flex-direction: row;
  width: 100vw;
}

.view-container{
  margin-left: 50px;
}
</style>
