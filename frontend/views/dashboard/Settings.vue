<template>
  <div class="page-settings container-fluid">
    <h4>{{ $t('Settings') }}</h4>

    <ul class="nav nav-pills nav-pills-dark">
      <li class="nav-item" v-for="item in items">
        <router-link class="nav-link nav" :to="item.to">
          <i class="icon" v-if="item.icon" :class="item.icon"></i> <span class="label">{{ $t(item.label) }}</span>
        </router-link>
      </li>
    </ul>

    <router-view></router-view>


  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [
        {label: 'TrackerLinks', to: {path: '/dashboard/settings'}, icon: 'bi bi-link'},
        {label: 'User', to: {path: '/dashboard/settings/user'}, icon: 'bi bi-person'},
        {label: 'Notification', to: {path: '/dashboard/settings/notification'}, icon: 'bi bi-app-indicator'},
      ],
    };
  },
};
</script>