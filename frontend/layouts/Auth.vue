<template>
  <div class="auth-wrapper">
    <slot/>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, #004d40, #00bfa5);
}
</style>