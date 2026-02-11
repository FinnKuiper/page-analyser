<script setup>
const url = useRoute().query.url;
async function getSiteData() {
    const data = await $fetch(`/api/inspect?url=${url}`);
}
getSiteData();
</script>

<template>
    <div class="inspect">

    </div>
</template>