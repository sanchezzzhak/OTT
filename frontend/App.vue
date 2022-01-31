<template>

  <nav class="nav-links">
    <router-link :to="{name: 'Home'}">Home</router-link>
    <router-link :to="{name: 'Login'}">Login</router-link>
    <router-link :to="{name: 'Register'}">Register</router-link>
  </nav>

  <component :is="layout">
    <router-view></router-view>
  </component>

</template>

<style lang="scss" scoped></style>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'default'
    }
  }
}
</script>