
<script lang="ts" setup>
    import { type Ingredient, type IngredientsSection } from '~/recipe';
    import Editable from '~/components/Editable.vue';
    const { section } = defineProps<{
        section: IngredientsSection,
    }>()

    /**
     * Filter empty ingredients out of the ingredients list
     */
    function filterEmptyIngredients() {
        const filtered = section.ingredients.filter((ingredient) =>
        ingredient.amount.trim() != "" || ingredient.name.trim() != "")
        if (filtered.length == section.ingredients.length)
            return
        section.ingredients = filtered
    }

    // Extra empty item at the end of the list to be able to add items
    let extraItem: Ingredient = reactive({amount: "", name: ""})

    /**
     * Generator for all ingredients plus the extra item at the end (which is
     * empty most of the time)
     * @yields The ingredients in the order they are in the section
     */
    function* ingredients(): Generator<Ingredient> {
        console.log("generator")
        for (const ingredient of section.ingredients)
            yield ingredient
        yield extraItem
    }

    /**
     * Check if the extra item should be added to the section (because it's no
     * longer empty). If this is the case the extraItem variable will be set
     * to a new empty item
     */
    function updateExtra() {
        if (extraItem.amount == "" && extraItem.name == "")
            return
        section.ingredients.push(extraItem)
        extraItem = reactive({amount: "", name: ""})
        console.log('watch extra')
    }

    // Watch changes to the extra item to add it if it is no longer empty
    watch(() => extraItem.amount, updateExtra)
    watch(() => extraItem.name, updateExtra)
</script>

<template>
    <Editable tag="h2" :obj="section" name="title" class="section-title"
    replace-empty="Section title" />
    <ul :class="$style.list">
        <li v-for="ingredient in ingredients()">
            <div :class="$style.checkbox" />
            <Editable tag="span" :obj="ingredient" name="amount"
            :class="$style.amount" style="--top-bottom: -2pt;
            --left-right: -4pt;" @blur="filterEmptyIngredients" />
            <Editable tag="span" :obj="ingredient" name="name"
            :class="$style.name" style="--top-bottom: -2pt;
            --left-right: -4pt;" @blur="filterEmptyIngredients" />
        </li>
    </ul>
</template>

<style lang="scss" module>
    .list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;

        li {
            padding: 0;
            margin: 0;
            width: 50%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            padding: 5pt 1em 0em 0;
            box-sizing: border-box;

            &:last-child {
                display: none;
                @media screen { display: flex; }
            }

            .checkbox {
                flex-shrink: 0;
                flex-grow: 0;
                width: 1em;
                height: 1em;
                border: 2pt solid #999;
                border-radius: 3pt;
                margin-right: 12pt;
            }

            .amount {
                width: 3.8em;
                flex-grow: 0;
                flex-shrink: 0;
                margin-right: 9pt;
                font-weight: 500;
            }

            .name {
                width: 100%;
                flex-shrink: 1;
            }
        }
    }
</style>