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
      {label: 'Stats', to: {path: '/stat'}, icon: 'fa-solid fa-chart-line'},
      {label: 'Settings', to: {path: '/settings'}, icon: 'fa-solid fa-gear'},
    ],
  }),
  name: "sidebar",
}
</script>