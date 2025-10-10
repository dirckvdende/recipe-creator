
<script setup lang="ts">

import { recipe } from "./recipe"
import Header from "~/components/header/Header.vue"
import CenterContent from "./components/CenterContent.vue"
import Footer from "./components/Footer.vue"

useHead({
    title: useRuntimeConfig().public.siteName,
})

</script>

<template>
    <Header />
    <CenterContent>
        <input type="text" v-model="recipe.title" @input="console.log(recipe)" />
    </CenterContent>
    <Footer />
</template>

<style lang="scss" scoped>
h1 {
    color: green;
    span {
        color: red;
    }
}
</style>