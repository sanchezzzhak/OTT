<template>
  <div class="auth-wrapper">
    <header-nav></header-nav>
    <div class="body-wrapper bg-gradient">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  justify-content: center;
  align-items: center;
    .container {
        max-width:380px;
    }
}
</style>