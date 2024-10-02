<script setup>
import { useStore } from '../stores/main-store';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const store = useStore();
const { locale } = useI18n();

function changeLanguage(event) {
  const value = event.target.dataset.lang;
  locale.value = value;
  store.language(value);
}

const LangEnActive = ref(false);


</script>

<template>
  <div class="d-flex">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item dropdown" id="language-nav">
        <a class="nav-link dropdown-toggle"
           id="languageDropdown"
           role="button"
           data-bs-toggle="dropdown"
           aria-expanded="true">
          {{ locale.toUpperCase() }}
        </a>
        <ul class="dropdown-menu justify-content-start" aria-labelledby="languageDropdown">
          <li>
            <a class="dropdown-item"
               :class="{active: locale === 'en'}"
               data-lang="en" @click="changeLanguage">English</a>
          </li>
          <li>
            <a class="dropdown-item"
               :class="{active: locale === 'ru' }"
               data-lang="ru" @click="changeLanguage">Russian</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
#language-nav a.dropdown-toggle {
  font-size: 20px;
  padding: 0;
  margin-top: 0.3em;
  font-weight: 100;
  font-family: Arial, serif;
  letter-spacing: -1px;
  &::after {
    font-size: 18px;
  }
}
#language-nav { width: 40px}
#language-nav .dropdown-item a {
  cursor: pointer;
}
</style>