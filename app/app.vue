
<script setup lang="ts">
    import { recipe } from "~/recipe"
    import Header from "./components/header/Header.vue"
    import CenterContent from "./components/CenterContent.vue"
    import Footer from "./components/Footer.vue"
    import Section from "./components/section/Section.vue"

    useHead({
        title: useRuntimeConfig().public.siteName,
    })
</script>

<template>
    <Header />
    <CenterContent>
        <Editable tag="h1" :obj="recipe" name="title" class="title" autofocus
        replace-empty="Recipe" />
        <template v-for="section in recipe.sections">
            <Section :section="section" />
        </template>
    </CenterContent>
    <Footer />
</template>

<style lang="scss" scoped>
    .title {
        width: 100%;
        text-align: center;
        font-size: 2em;
        margin: 0 0 .5em 0;
    }
</style>