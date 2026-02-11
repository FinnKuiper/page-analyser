<script setup>
import Button from './ui/button.vue';
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter();
const errorMessage = ref('');
const form = ref({
    url: ''
});

const handleSubmit = () => {
    console.log(form.value.url);
    if (!form.value.url) {
        errorMessage.value = 'Please enter a URL';
        return;
    }
    errorMessage.value = '';
    router.push(`/inspect?url=${form.value.url}`);
};
</script>

<template>
    <form class="upload-form" @submit.prevent="handleSubmit">
        <h1>Upload Form</h1>
        <input name="inspecting url" type="url" placeholder="https://example.com" v-model="form.url" />
        {{ errorMessage ? errorMessage : '' }}
        <Button>Check site</Button>
    </form>
</template>

<style scoped>
.upload-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 16rem;
    gap: 1rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--secondary);
    background-color: white;
    color: var(--text-color);
    font-size: 1rem;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    outline: none;
    transition: all 0.3s ease;
}

input::placeholder {
    color: #ecdff5;
    font-size: 1rem;
}
</style>