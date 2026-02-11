<template>
    <button>
        <slot />
    </button>
</template>

<style scoped>
button {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 2rem;
    cursor: pointer;
}
</style>