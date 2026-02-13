<script setup lang="ts">
import { House } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute();
const isHome = ref(route.path === '/');
const isInspect = ref(route.path === '/inspect');
</script>

<template>
    <nav class="sidebar">
        <header>
            <h1>Lathi</h1>
        </header>
        <ul>
            <li>
                <NuxtLink :class="['sidebar-link', { 'sidebar-link-selected': isHome }]" to="/">
                    <House color="white" size="20" /> <span>Home</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
* {
    color: white;
}

header {
    padding: 1rem;
}

.sidebar {
    display: flex;
    flex-direction: column;
    width: 14rem;
    padding-block: 1rem;
    padding-inline: 0.5rem;
    padding-top: 0;
    background-color: #2b2b2b;

    .sidebar-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem;
        border-radius: 1rem;
        transition: all 0.2s ease;
    }

    .sidebar-link-selected {
        background-color: #3b3b3b;
    }

    .sidebar-link:hover {
        background-color: #4b4b4b;
    }
}
</style>