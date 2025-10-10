
<script lang="ts" setup>
    import { type RecipeSection } from '~/recipe';
    import TextSection from './sections/TextSection.vue';
    import IngredientsSection from './sections/IngredientsSection.vue';
    const { section } = defineProps<{
        section: RecipeSection,
    }>();
</script>

<template>
    <input class="section-title" type="text" v-model="section.title" />
    <TextSection :section="section" v-if="section.type == 'text'" />
    <IngredientsSection :section="section" v-if="section.type == 'ingredients'"
    />
</template>

<style lang="scss" scoped>
    @use "~/assets/scss/common.scss";
    .section-title {
        @extend %editable-text;
        margin: .2em 0;
        font-size: 1.4em;
        width: 100%;
        display: block;
        width: 100%;
    }
</style>
