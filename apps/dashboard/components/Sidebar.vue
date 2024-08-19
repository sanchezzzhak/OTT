<template>
  <div class="theme-gray nav-sidebar rounded-0 navigation--sidebar">

    <nav>
      <ul class="nav">
        <li v-for="item in items">
          <router-link :tag="li" class="navigation--link" :to="item.to">
            <i class="icon" v-if="item.icon" :class="item.icon"></i>
            <span class="label">{{ $t(item.label) }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
export default {
  name: "sidebar",
  data: () => {
    return {
      items: [
        {label: 'Stats', to: {path: '/dashboard/stat'}, icon: 'bi bi-bar-chart'},
        {label: 'Settings', to: {path: '/dashboard/settings'}, icon: 'bi bi-gear-fill'},
      ],
    }
  },
}
</script>