<script setup lang="ts">

import {RouterLink} from "vue-router";
import NavBarItem from "@/components/navigation/NavBarItem.vue";
</script>

<template>
  <div class="nav-bar">
    <nav>
      <div class="route-container">
        <NavBarItem path="/" title="Ana Sayfa"></NavBarItem>
        <NavBarItem path="/randevular" title="Randevular"></NavBarItem>
      </div>
    </nav>
  </div>
</template>

<style scoped>

nav {
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.nav-bar{
  background-color: #32292F  ;
}
.route-container{
  display: flex;
  flex-direction: column;
}
</style>
