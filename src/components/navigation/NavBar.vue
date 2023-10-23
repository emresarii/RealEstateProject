<script setup lang="ts">

import NavBarItem from "@/components/navigation/NavBarItem.vue";
</script>

<template>
  <div class="nav-bar">
    <nav>
      <div class="route-container">
        <NavBarItem path="/" title="Ana Sayfa" imgpath="src/assets/home-icon.svg"></NavBarItem>
        <NavBarItem path="/randevular" title="Randevular"></NavBarItem>
      </div>
    </nav>
  </div>
</template>

<style scoped>

nav {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.nav-bar{
  background-color: #000100  ;
}
.route-container{
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
