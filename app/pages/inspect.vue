<script setup>
import { ExternalLink } from 'lucide-vue-next';

const route = useRoute();
const url = route.query.url;
const data = ref(null);
const loading = ref(true);
const error = ref(null);

async function getSiteData() {
    loading.value = true;
    error.value = null;

    try {
        const res = await $fetch('/api/inspect', { query: { url } });
        data.value = res;
        console.log(data.value.headingOrder.checklist);
    } catch (e) {
        console.error(e);
        const anyErr = e;
        error.value =
            anyErr?.data?.message ??
            anyErr?.message ??
            'Failed to analyse page';
    } finally {
        loading.value = false;
    }
}

getSiteData();
</script>

<template>
    <div class="inspect">
        <template v-if="loading">Analysing heading order from Bright Data…</template>
        <template v-else-if="error">{{ error }}</template>
        <template v-else-if="data">
            <h1 style="color: var(--text-color); margin-bottom: 1rem;">Analysis report</h1>
            <main>
                <div class="site-info">
                    <img :src="`https://s2.googleusercontent.com/s2/favicons?domain=${data.url}`" alt="Site icon"
                        class="site-icon" />
                    <div class="site-details">
                        <h2>{{ data.title }}</h2>
                        <a :href="`${data.url}`" target="_blank"><span>{{ data.url }}</span>
                            <ExternalLink size="16" />
                        </a>
                    </div>
                </div>
                <div class="site-iframe-container">
                    <iframe :src="data.url" frameborder="0" class="site-iframe"></iframe>
                    <section class="site-score">
                        <header class="site-score-header">
                            <h2>Overall score</h2>
                        </header>
                        <div class="horizontal-rule"></div>
                        <div class="site-score-content">
                            <span style="font-size: 2rem; font-weight: 600;">{{ data.headingOrder.score }}%</span>
                            <span>total score</span>
                        </div>
                    </section>
                </div>
            </main>

        </template>
    </div>
</template>

<style scoped>
* {
    color: white;
}

.inspect {
    width: 100%;
    padding: 1rem;
}

.horizontal-rule {
    width: 100%;
    height: 2px;
    background-color: #713369;
    margin-block: 1rem;
}

main {
    background-color: #171717;
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
}

.site-iframe-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.site-iframe {
    width: 1080px;
    height: 540px;
    border: none;
    border-radius: 1rem;
}

.site-score {
    width: 16rem;
    border-radius: 1rem;
    padding-block: 1rem;
    background-color: #863c7c;
}

.site-score-header {
    padding-inline: 1rem;
}

.site-score-content {
    padding-inline: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.site-info {
    display: flex;

    h2 {
        margin-top: -0.2rem;
    }
}

.site-details {
    display: flex;
    flex-direction: column;
}

.site-icon {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    object-fit: cover;
}

a {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.2rem;
    transition: all 0.2s ease;
    width: fit-content;

    svg {
        stroke: none;
        transition: all 0.2s ease;
    }
}

a:hover {
    background-color: #272727;
    border-radius: 0.5rem;

    svg {
        stroke: white;
    }
}
</style>