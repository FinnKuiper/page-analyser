<script setup>
const route = useRoute();
const url = route.query.url;
const data = ref(null);
const loading = ref(true);
const error = ref(null);

async function getSiteData() {
    loading.value = true;
    error.value = null;
    try {
        data.value = await $fetch(`/api/inspect?url=${url}`);
    } catch (e) {
        error.value = e?.message ?? "Failed to analyse page";
    } finally {
        loading.value = false;
    }
}

onMounted(() => getSiteData());
</script>

<template>
    <div class="inspect">
        <template v-if="loading">Analysing heading order from Bright Data…</template>
        <template v-else-if="error">{{ error }}</template>
        <template v-else-if="data">
            <h1>Heading order analysis</h1>
            <p class="meta">
                Source: <strong>{{ data.url }}</strong>
                <span v-if="data.title"> · {{ data.title }}</span>
            </p>

            <section v-if="data.headingOrder" class="analysis">
                <h2>Summary</h2>
                <ul class="summary">
                    <li><strong>{{ data.headingOrder.summary.total }}</strong> headings</li>
                    <li>H1: {{ data.headingOrder.summary.h1Count }} ({{ data.headingOrder.summary.hasH1 ? "present" : "missing" }})</li>
                    <li v-for="(count, level) in data.headingOrder.summary.byLevel" :key="level">
                        H{{ level }}: {{ count }}
                    </li>
                </ul>

                <h2>Outline (document order)</h2>
                <pre class="outline">{{ data.headingOrder.outline }}</pre>

                <h2>Issues</h2>
                <ul v-if="data.headingOrder.issues.length" class="issues">
                    <li v-for="(issue, i) in data.headingOrder.issues" :key="i">{{ issue }}</li>
                </ul>
                <p v-else class="ok">No heading order issues detected.</p>
            </section>
        </template>
    </div>
</template>

<style scoped>
.inspect {
    max-width: 42rem;
    margin: 0 auto;
    padding: 1.5rem;
}
.meta {
    color: var(--text-color);
    opacity: 0.85;
    margin-bottom: 1.5rem;
}
.analysis {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.analysis h2 {
    font-size: 1.1rem;
    margin: 1rem 0 0.25rem;
}
.summary, .issues {
    list-style: disc;
    padding-left: 1.5rem;
}
.outline {
    background: var(--secondary);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    white-space: pre-wrap;
    font-size: 0.9rem;
}
.issues li {
    color: #c45;
}
.ok {
    color: #3a7;
}
</style>