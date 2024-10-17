<script setup>

import MoonIcon from '../icons/moon';
import DayIcon from '../icons/day';

import { useStore } from '../stores/main-store';
const store = useStore();

function changeTheme(event) {
  store.changeTheme(event.target.checked ? 'dark': 'light');
  applyTheme()
}

function getTheme() {
  return store.theme;
}

function applyTheme() {
  document.querySelector('html').dataset.bsTheme = getTheme();
}

applyTheme();

const themeSizeStyle = 'height:32px;width:32px;';

</script>

<template>
  <div class="theme-control-toggle px-2">
    <input
      class="form-check-input ms-0 theme-control-toggle-input"
      type="checkbox"
      data-theme-control="extTheme"
      :value="getTheme" id="themeControlToggle"
      @click="changeTheme"
      :checked="getTheme() === 'dark'">
    <label class="mb-0 theme-control-toggle-label theme-control-toggle-light"
           for="themeControlToggle"
           data-bs-toggle="tooltip"
           data-bs-placement="left"
           data-bs-title="Switch theme"
           :style="themeSizeStyle"
           v-html="MoonIcon"></label>
    <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark"
           for="themeControlToggle"
           data-bs-toggle="tooltip"
           data-bs-placement="left"
           data-bs-title="Switch theme" :style="themeSizeStyle"
           v-html="DayIcon">
    </label>
  </div>
</template>

<style>
  .theme-control-toggle-light svg {width: 20px}
  .theme-control-toggle-dark svg {width: 20px}
</style>