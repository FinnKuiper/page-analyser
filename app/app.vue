<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import '~/assets/global.css'
</script>

<style scoped>
.app {
  height: 100vh;
}
</style>