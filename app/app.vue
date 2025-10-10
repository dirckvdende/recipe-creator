
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
        <input type="text" v-model="recipe.title" class="title" />
    </CenterContent>
    <Footer />
</template>

<style lang="scss" scoped>
    @use "~/assets/scss/common.scss";

    .title {
        @extend %editable-text;
        width: 100%;
        text-align: center;
        font-size: 2em;
    }
</style>