<script setup lang="ts">
defineProps<{
  path?: string
  title?: string
  imgpath?: string
}>()
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="nav-bar-item">
        <img class='nav-bar-ico' alt="" :src=imgpath>
        <RouterLink :to=path>{{title}}</RouterLink>
  </div>
</template>

<style scoped>
.nav-bar-item {
  padding: 12px;
  width: 115px;
  transition: all 0.6s;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.nav-bar-item:has(>a.router-link-exact-active){
  background-color: #DEB841;
  border-radius: 5px;

}

.nav-bar-ico {
  transition: all 0.6s;
  padding-right: 5px;
}

.nav-bar-item:not(:has(>a.router-link-exact-active)){
  .nav-bar-ico {
    filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(113deg) brightness(103%) contrast(101%);
  }
}
</style>
