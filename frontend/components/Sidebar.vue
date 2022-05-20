<template>
  <div class="navigation--sidebar">
    <nav class="navigation--block" v-for="item in items">
      <router-link class="navigation--link" :to="item.to">
          <i class="icon" v-if="item.icon" :class="item.icon"></i>
          <span class="label">{{item.label}}</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {label: 'Stats', to: {path: '/dashboard/stat'}, icon: 'bi bi-bar-chart'},
      {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill'},
    ],
  }),
  name: "sidebar",
}
</script>