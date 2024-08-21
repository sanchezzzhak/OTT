<script setup>
const props = defineProps({
  item: Object,
  key: Number
});
const { key, item } = props;

</script>

<template>

  <template v-if="item.items === void 0">
    <li class="nav-item" :class="{active: item.active ?? false}" :data-id="key">
      <template v-if="item.header !== void 0">
        <p class="navbar-vertical-label">{{ item.header }}</p>
        <hr class="navbar-vertical-line">
      </template>

      <router-link class="nav-link label-1" :to="item.to" role="button" data-bs-toggle="" aria-expanded="false">
        <div class="d-flex align-items-center">
          <span class="nav-link-icon">
            <i class="icon" v-if="item.icon" :class="item.icon"></i>
          </span>
          <span class="nav-link-text-wrapper"><span class="nav-link-text">{{ $t(item.label) }}</span></span>
        </div>
      </router-link>
    </li>
  </template>

  <template v-else-if="item.items !== void 0">
    <li class="nav-item" :class="{active: item.active ?? false}" :data-id="key">
      <template v-if="item.header !== void 0">
        <p class="navbar-vertical-label">{{ item.header }}</p>
        <hr class="navbar-vertical-line">
      </template>
      <router-link class="nav-link label-1" :to="item.to" role="button" data-bs-toggle="" aria-expanded="false">
        <div class="d-flex align-items-center">
          <span class="nav-link-icon">
            <i class="icon" v-if="item.icon" :class="item.icon"></i>
          </span>
          <span class="nav-link-text-wrapper"><span class="nav-link-text">{{ $t(item.label) }}</span></span>
        </div>
      </router-link>
    </li>
  </template>

</template>