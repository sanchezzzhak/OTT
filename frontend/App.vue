<template>

  <div class="body-wrapper bg-gradient">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded-top">
      <div class="container-fluid">
        <router-link :to="{name: 'Home'}" class="navbar-brand">OTT</router-link>
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
            <li class="nav-item" v-if="isAuth()">
              <router-link :to="{name: 'Dashboard'}" class="nav-link">Dashboard</router-link>
            </li>
<!--            <li class="nav-item">-->
<!--            </li>-->
<!--            <li class="nav-item dropdown">-->
<!--              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"-->
<!--                 aria-expanded="false">-->
<!--                Dropdown-->
<!--              </a>-->
<!--              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">-->
<!--                <li><a class="dropdown-item" href="#">Action</a></li>-->
<!--                <li><a class="dropdown-item" href="#">Another action</a></li>-->
<!--                <li>-->
<!--                  <hr class="dropdown-divider">-->
<!--                </li>-->
<!--                <li><a class="dropdown-item" href="#">Something else here</a></li>-->
<!--              </ul>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>-->
<!--            </li>-->
          </ul>
          <div class="d-flex" v-if="!isAuth()">
            <router-link :to="{name: 'SingIn'}" class="nav-link btn btn-primary text-white">Sing In</router-link>
          </div>
          <div class="d-flex" v-else>
            <router-link :to="{name: 'Logout'}" class="nav-link btn btn-outline-dark text-white">Exit</router-link>
          </div>
        </div>
      </div>
    </nav>

    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>


</template>

<style lang="scss" scoped></style>

<script>

  import {mapState} from 'vuex'
  export default {
    computed: {
      layout() {
        return this.$route.meta.layout || 'default';
      },
      ...mapState(['token'])
    },
    methods: {
      isAuth() {
        return this.token && this.token.length;
      }
    }
  };
</script>