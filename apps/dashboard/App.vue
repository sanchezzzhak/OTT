<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<style lang="scss" scoped></style>

<script>
  export default {
    computed: {
      layout() {
        return this.$route.meta.layout || 'default';
      },
    },
  };
</script>