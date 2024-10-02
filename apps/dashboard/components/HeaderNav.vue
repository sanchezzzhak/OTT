<template>
  <nav class="navbar navbar-top fixed-top navbar-expand" id="navbarDefault" data-navbar-appearance="darker">
    <div class="collapse navbar-collapse justify-content-between">

      <div class="navbar-logo">
        <button
          class="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarVerticalCollapse"
          aria-controls="navbarVerticalCollapse"
          aria-expanded="false"
          aria-label="Toggle Navigation">
          <span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
        </button>
        <a class="navbar-brand me-1 me-sm-3" href="">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <!--              <img src="" alt="ott" width="27">-->
              <h5 class="logo-text ms-2 d-none d-sm-block">OTT</h5>
            </div>
          </div>
        </a>
      </div>


      <ul class="navbar-nav navbar-nav-icons flex-row">
        <li class="nav-item">
          <navbar-theme-card></navbar-theme-card>
        </li>
        <li class="nav-item dropdown"><navbar-notify-card></navbar-notify-card></li>
        <li class="nav-item dropdown"><navbar-app-card></navbar-app-card></li>
        <li class="nav-item dropdown"><navbar-lang-card></navbar-lang-card></li>
        <li class="nav-item dropdown"><navbar-card-user></navbar-card-user></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped="scss">
#language-nav {
  .dropdown-menu {
    border: none;
    width: 100%;

    li {
      width: 100%
    }
  }
}

.no-avatar svg {
  width: 64px;
  height: 64px;
  object-fit: contain;
}
</style>

<script setup>


import NavbarCardUser from './NavbarCardUser.vue';
import NavbarNotifyCard from './NavbarNotifyCard.vue';
import NavbarAppCard from './NavbarAppCard.vue';
import NavbarLangCard from './NavbarLangCard.vue';
import NavbarThemeCard from './NavbarThemeCard.vue';


</script>