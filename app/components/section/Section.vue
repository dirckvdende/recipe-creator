
<script lang="ts" setup>
    import { provide } from 'vue';
    import { recipe, type RecipeSection } from '~/recipe';
    import TextSection from './sections/TextSection.vue';
    import IngredientsSection from './sections/IngredientsSection.vue';
    import SideButtons from './SideButtons.vue';
    import ImageSection from './sections/ImageSection.vue';
    const { section } = defineProps<{
        section: RecipeSection,
    }>()

    const activeSection = ref(false)
    provide("activeSection", activeSection)

    function moveUp() {
        const index = recipe.sections.indexOf(section)
        if (index == 0)
            return
        const prev = recipe.sections[index - 1]
        if (prev == undefined)
            throw new Error("Unexpected error")
        recipe.sections[index - 1] = section
        recipe.sections[index] = prev
    }

    function moveDown() {
        const index = recipe.sections.indexOf(section)
        if (index + 1 >= recipe.sections.length)
            return
        const nxt = recipe.sections[index + 1]
        if (nxt == undefined)
            throw new Error("Unexpected error")
        recipe.sections[index + 1] = section
        recipe.sections[index] = nxt
    }

    function removeSection() {
        recipe.sections.splice(recipe.sections.indexOf(section), 1)
    }
</script>

<template>
    <div class="section" :class="[{ 'active-section': activeSection },
    $style.section ]">
        <TextSection :section="section" v-if="section.type == 'text'" />
        <IngredientsSection :section="section" v-if="section.type ==
        'ingredients'" />
        <ImageSection :section="section" v-if="section.type == 'image'" />
        <SideButtons :class="$style['side-buttons']" :buttons='[{
            icon: "keyboard_arrow_up",
            action: moveUp,
        }, {
            icon: "keyboard_arrow_down",
            action: moveDown,
        }, {
            icon: "delete",
            action: removeSection,
        }]' />
    </div>
</template>

<style lang="scss" module>
    .side-buttons:not(:global(.active-section) .side-buttons):not(.section:hover
    .side-buttons) {
        display: none;
    }
    .section {
        position: relative;
        
        :global(.section-title) {
            margin: .2em 0;
            font-size: 1.4em;
            width: 100%;
            display: block;
            width: 100%;
            font-weight: 500;
        }
    }
</style>
