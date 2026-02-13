<script setup lang="ts">
import UploadForm from '~/components/upload-form.vue';

definePageMeta({
    layout: false,
})
</script>

<template>
    <div class="index">
        <div class="index-content">
            <h2>Get in-depth insights on your website</h2>
            <UploadForm />
        </div>
    </div>
    <section>
        <h2>Unlock advanced insights with AI-powered analysis</h2>
    </section>
</template>

<style scoped>
.index {
    width: 100%;
    min-height: 50vh;
    background-image: url('/search.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}


.index-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;
    max-width: 30rem;
}


section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;
}
</style>
