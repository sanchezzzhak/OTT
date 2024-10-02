<script setup>

import AppDots from '../icons/app-dots.js';
</script>

<template>
  <a class="nav-link nav-app-dots" id="navbarDropdownNindeDots" href="#" role="button" data-bs-toggle="dropdown"
     aria-haspopup="true" data-bs-auto-close="outside" aria-expanded="false" v-html="AppDots">
  </a>
</template>

<style>
  .nav-app-dots svg { width: 20px}
</style>