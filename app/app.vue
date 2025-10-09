<script setup lang="ts">
import { ref } from "vue"

const count = ref({
    test: 0,
});

function increment() {
    count.value.test++;
}
</script>

<template>
    <button @click="increment">{{ count.test }}</button>
    <div>
        <h1>Hello World!</h1>
    </div>
</template>

<style>
h1 { color: green }
</style>