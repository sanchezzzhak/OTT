<template>
  <div class="navigation--sidebar">
    <nav class="navigation--block" v-for="item in items">
      <router-link class="navigation--link" :to="item.to">
        <div class="icon" v-if="item.icon">{{ item.icon }}</div>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {label: 'Stats', to: {path: '/dashboard/stat'}},
    ],
  }),
  name: "sidebar",
}
</script>