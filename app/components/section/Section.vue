
<script lang="ts" setup>
    import { provide } from 'vue';
    import { recipe, type RecipeSection } from '~/recipe';
    import TextSection from './sections/TextSection.vue';
    import IngredientsSection from './sections/IngredientsSection.vue';
    import SideButtons from './SideButtons.vue';
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
    <div class="section" :class="{ 'active-section':
    activeSection }">
        <Editable tag="h2" :obj="section" name="title" class="section-title"
        replace-empty="Section title" />
        <TextSection :section="section" v-if="section.type == 'text'" />
        <IngredientsSection :section="section" v-if="section.type ==
        'ingredients'" />
        <SideButtons class="side-buttons" :buttons='[{
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

<style lang="scss">
    .side-buttons:not(.active-section .side-buttons):not(.section:hover
    .side-buttons) {
        display: none;
    }
    .section {
        position: relative;
        
        .section-title {
            margin: .2em 0;
            font-size: 1.4em;
            width: 100%;
            display: block;
            width: 100%;
            font-weight: 500;
        }

        &:hover .bottom-buttons,
        &.active-section .bottom-buttons {
            @media screen { display: flex; }
        }
    }
</style>
