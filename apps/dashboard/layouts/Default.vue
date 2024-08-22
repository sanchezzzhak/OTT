<template>
  <main class="main" id="top">
    <header-nav></header-nav>
    <sidebar></sidebar>
    <div class="content">
      <slot/>
    </div>
  </main>
  <ui-config></ui-config>
</template>

<script setup>
import UiConfig from '../components/ui-config.vue';
</script>