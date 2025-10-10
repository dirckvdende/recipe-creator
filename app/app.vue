<script setup lang="ts">

import { ref } from "vue"
import Text from "./Text.vue"
import Header from "./header/Header.vue"

const count = ref({
    test: 0,
    title: "Hello World!",
    second: "Hey!",
})

function increment() {
    count.value.test++
}

function updateTitle(event: FocusEvent) {
    count.value.title = (event.target as HTMLElement).innerText
    console.log(count.value)
}

function updateSecond(event: FocusEvent) {
    count.value.second = (event.target as HTMLElement).innerText
    console.log(count.value)
}

useHead({
    title: "Recipe Creator",
})

</script>

<template>
    <Header />
    <h1>hello <span>hey</span></h1>
    <button @click="increment">{{ count.test }}</button>
    <div>
        <input type="text" v-model="count.title" @input="console.log(count)"></input>
    </div>
    <Text>
        Hello World!
    </Text>
</template>

<style lang="scss" scoped>
h1 {
    color: green;
    span {
        color: red;
    }
}
</style>