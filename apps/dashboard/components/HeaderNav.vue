<template>

    <nav class="navbar navbar-expand-md navbar-dark rounded-top navigation--header">
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
                        <router-link :to="{name: 'Dashboard'}" class="nav-link"> {{$t('dashboard')}}</router-link>
                    </li>
                    <li class="nav-item"></li>
                </ul>

                <div class="d-flex">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown" id="language-nav">
                      <a class="nav-link dropdown-toggle"
                         id="languageDropdown"
                         role="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false">
                        {{locale}}
                      </a>
                      <ul class="dropdown-menu bg-transparent justify-content-start" aria-labelledby="languageDropdown">
                        <li><a class="dropdown-item" @click="changeLanguage">EN</a></li>
                        <li><a class="dropdown-item" @click="changeLanguage">RU</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div class="d-flex" v-if="!isAuth()">
                    <router-link :to="{name: 'SingIn'}" class="nav-link btn btn-primary text-white"> {{$t('sing_in')}}
                    </router-link>
                </div>
                <div class="d-flex" v-else>
                    <router-link :to="{name: 'Logout'}" class="nav-link btn btn-outline-dark text-white">{{$t('exit')}}
                    </router-link>
                </div>

            </div>
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
</style>

<script setup>
  import {useStore} from '../stores/main-store';
  import {useI18n} from 'vue-i18n';


  const store = useStore();

  const {locale} = useI18n();

  function isAuth() {
    return store.token && store.token.length;
  }

  function changeLanguage(event){
    event.stopPropagation();
    const value = event.target.innerText.toLowerCase();
    locale.value = value;
    store.language(value);

  }

</script>