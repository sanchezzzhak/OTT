<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-gradient">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">OTT</a>
      <button class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <div class="d-flex">
          <router-link :to="{name: 'SingIn'}" class="nav-link btn bg-gradient text-white">Sing In</router-link>
        </div>
      </div>
    </div>
  </nav>

  <div class="body-wrapper bg-gradient">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>


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