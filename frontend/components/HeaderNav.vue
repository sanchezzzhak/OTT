<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded-top navigation--header">
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
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"
                           id="languageDropdown"
                           role="button"
                           data-bs-toggle="dropdown"
                           aria-expanded="false">
                            {{$t('language')}}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="languageDropdown">
                            <li><a class="dropdown-item" @click="changeLanguage">EN</a></li>
                            <li><a class="dropdown-item" @click="changeLanguage">RU</a></li>
                        </ul>
                    </li>

                    <!--            <li class="nav-item">-->
                    <!--              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>-->
                    <!--            </li>-->
                </ul>

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
<script>

  import {useStore} from '../stores/main-store';

  export default {
    methods: {
      isAuth() {
        const store = useStore();
        return store.token && store.token.length;
      },
      changeLanguage(event){
        event.stopPropagation();
        this.$i18n.locale = event.target.innerText.toLowerCase()
        useStore().language(this.$i18n.locale);
      }
    },
  };
</script>