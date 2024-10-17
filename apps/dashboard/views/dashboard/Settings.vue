<template>
    <h4>{{ $t('Settings') }}</h4>
    <bs-nav-pills :items="navItems"></bs-nav-pills>
    <router-view></router-view>
</template>

<script setup>

const navItems = [
  {label: 'TrackerLinks', to: {path: '/dashboard/settings'}, icon: 'bi bi-link'},
  {label: 'User', to: {path: '/dashboard/settings/user'}, icon: 'bi bi-person'},
  {label: 'Notification', to: {path: '/dashboard/settings/notification'}, icon: 'bi bi-app-indicator'},
]


</script>