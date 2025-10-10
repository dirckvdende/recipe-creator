
<script setup lang="ts">
    import { recipe } from "~/recipe"
    import Header from "./components/header/Header.vue"
    import CenterContent from "./components/CenterContent.vue"
    import Footer from "./components/Footer.vue"
    import Section from "./components/Section.vue"

    useHead({
        title: useRuntimeConfig().public.siteName,
    })

    function resetTitleIfEmpty() {
        if (recipe.title == "")
            recipe.title = "Recipe"
    }
</script>

<template>
    <Header />
    <CenterContent>
        <input type="text" v-model="recipe.title" class="title"
        @blur="resetTitleIfEmpty" />
        <template v-for="section in recipe.sections">
            <Section :section="section" />
        </template>
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
        margin: 0 0 .5em 0;
    }
</style>