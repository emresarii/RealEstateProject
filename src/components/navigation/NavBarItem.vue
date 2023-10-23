<script setup lang="ts">
defineProps<{
  path?: string
  title?: string
}>()
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="nav-bar-item">
        <RouterLink :to=path>{{title}}</RouterLink>
  </div>
</template>

<style scoped>
.nav-bar-item {
  padding: 12px;
  width: 200px;
  transition: width 0.2s;
}

.nav-bar-item:has(>a.router-link-exact-active){
  background-color: rgba(44, 102, 110, 1);
  width: 185px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
