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
    if (!form.value.url.startsWith('http://') && !form.value.url.startsWith('https://')) {
        form.value.url = `https://${form.value.url}`;
    }
    errorMessage.value = '';
    router.push(`/inspect?url=${form.value.url}`);
};
</script>

<template>
    <form class="upload-form" @submit.prevent="handleSubmit">
        <input name="inspecting url"
            pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
            placeholder="https://example.com" v-model="form.url" />
        <Button>Search</Button>
    </form>
</template>

<style scoped>
.upload-form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: white;
    border-radius: 1rem;
    padding: 0.5rem;
}

input {
    width: 100%;
    padding: 0.2rem;
    border-radius: 1rem;
    border: none;
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