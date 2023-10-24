<script setup lang="ts">
defineProps<{
  path: string
  title: string
  imgpath: string
}>()
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="nav-bar-item">
        <div class="icon-wrap"><img class='nav-bar-ico' alt="" :src=imgpath></div>
        <RouterLink class='menu-item' :to=path>{{title}}</RouterLink>
  </div>
</template>

<style scoped>
.nav-bar-item {
  padding: 8px;
  width: 145px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.nav-bar-item:has(>a.router-link-exact-active){
  background-color: #ffff;
  border-radius: 5px;

}

.nav-bar-ico {
  width: 26px;
  transition: all 0.6s;
}

.icon-wrap{
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
  justify-items: center;
  align-items: center;
}
.nav-bar-item:not(:has(>a.router-link-exact-active)){
  .nav-bar-ico {
    filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(113deg) brightness(103%) contrast(101%);
  }
}

.menu-item {
  font-size: 16px;
}
</style>
