<script setup>
const props = defineProps({
  items: []
})
</script>

<template>
  <ul class="nav nav-pills nav-pills-dark">
    <li class="nav-item" v-for="item in items">
      <router-link class="nav-link nav" :to="item.to">
        <i class="icon" v-if="item.icon" :class="item.icon"></i> <span class="label">{{ $t(item.label) }}</span>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>