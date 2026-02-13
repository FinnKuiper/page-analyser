<script setup lang="ts">
import Sidebar from '~/components/ui/sidebar.vue';

</script>

<template>
    <div class="default-layout">
        <Sidebar />
        <main>
            <slot />
        </main>
    </div>
</template>

<style scoped>
.default-layout {
    min-height: 100vh;
    display: flex;
    gap: 1rem;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
}

main {
    flex: 1;
    min-width: 0;
}
</style>