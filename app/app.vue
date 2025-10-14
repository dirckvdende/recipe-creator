
<script setup lang="ts">
    import { recipe } from "~/recipe"
    import Header from "./components/header/Header.vue"
    import CenterContent from "./components/CenterContent.vue"
    import Footer from "./components/Footer.vue"
    import Section from "./components/section/Section.vue"
    import ActionButtons from "./components/ActionButtons.vue"
    import ErrorToasts from "./components/ErrorToasts.vue"

    useHead({
        title: useRuntimeConfig().public.siteName,
    })

    // Warning on page exit, when not in dev mode
    if (!import.meta.dev)
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault()
        })
</script>

<template>
    <Header />
    <CenterContent>
        <Editable tag="h1" :obj="recipe" name="title" :class="$style.title"
        replace-empty="Recipe" />
        <template v-for="section in recipe.sections">
            <Section :section="section" />
        </template>
        <ActionButtons />
    </CenterContent>
    <Footer />
    <ErrorToasts />
</template>

<style lang="scss" module>
    .title {
        width: 100%;
        text-align: center;
        font-size: 2.5em;
        margin: 0 0 .5em 0;
        font-weight: 400;
    }
</style>