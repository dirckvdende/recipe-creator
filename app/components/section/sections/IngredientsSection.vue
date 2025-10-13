
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
    let extraItem: {ingredient: Ingredient} = reactive({
        ingredient: {
            amount: "",
            name: "",
            checked: false,
        }
    })

    /**
     * Generator for all ingredients plus the extra item at the end (which is
     * empty most of the time)
     * @yields The ingredients in the order they are in the section
     */
    function* ingredients(): Generator<Ingredient> {
        for (const ingredient of section.ingredients)
            yield ingredient
        yield extraItem.ingredient
    }

    /**
     * Check if the extra item should be added to the section (because it's no
     * longer empty). If this is the case the extraItem variable will be set
     * to a new empty item
     */
    function updateExtra() {
        if (extraItem.ingredient.amount == "" &&
        extraItem.ingredient.name == "")
            return
        section.ingredients.push(extraItem.ingredient)
        extraItem.ingredient = {
            amount: "",
            name: "",
            checked: false,
        }
    }

    // Watch changes to the extra item to add it if it is no longer empty
    watch(() => extraItem.ingredient.amount, updateExtra)
    watch(() => extraItem.ingredient.name, updateExtra)
</script>

<template>
    <Editable tag="h2" :obj="section" name="title" class="section-title"
    replace-empty="Section title" />
    <ul :class="$style.list">
        <li v-for="ingredient in ingredients()">
            <div :class="[{[$style.checked]: ingredient.checked},
            $style.checkbox]" @click="ingredient.checked = !ingredient.checked">
                <span class="material-symbols-outlined">check</span>
            </div>
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
    @use "~/assets/scss/constants";
    .list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        align-items: flex-start;

        li {
            padding: 0;
            margin: 0;
            width: 50%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            padding: 5pt 1em 0 0;
            box-sizing: border-box;
            align-items: flex-start;

            &:nth-of-type(2n) {
                padding-right: 0;
            }

            @media screen and (max-width: constants.$mobile-width) {
                width: 100%;
                padding: 5pt 0 0 0;
            }

            &:last-child {
                display: none;
                @media screen { display: flex; }

                .checkbox {
                    opacity: 0;
                }
            }

            .checkbox {
                flex-shrink: 0;
                flex-grow: 0;
                width: 1em;
                height: 1em;
                border: 2pt solid #bbb;
                border-radius: 3pt;
                margin-right: 12pt;
                cursor: pointer;
                user-select: none;

                & > span {
                    display: none;
                    color: white;
                    font-size: 1em;
                }

                &.checked {
                    background-color: #51c26f;
                    border-color: #3c9453;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    & > span { display: block; }
                }
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