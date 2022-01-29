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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav-links {
  a {
    margin: 0 2px;
  }
}
</style>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'default'
    }
  }
}
</script>