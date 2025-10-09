<script setup>
import { ref } from "vue"

const count = ref(0);

function increment() {
    count.value++;;
}
</script>

<template>
    <button @click="increment">{{ count }}</button>
    <div>
        <h1>Hello World!</h1>
    </div>
</template>

<style>
h1 { color: green }
</style>