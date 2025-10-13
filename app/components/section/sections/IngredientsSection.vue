
<script lang="ts" setup>
    import { type IngredientsSection } from '~/recipe';
    import Editable from '~/components/Editable.vue';
    const { section } = defineProps<{
        section: IngredientsSection,
    }>()
</script>

<template>
    <Editable tag="h2" :obj="section" name="title" class="section-title"
    replace-empty="Section title" />
    <ul :class="$style.list">
        <li v-for="ingredient in section.ingredients">
            <div :class="$style.checkbox" />
            <Editable tag="span" :obj="ingredient" name="amount"
            :class="$style.amount" style="--top-bottom: -2pt; --left-right: -4pt;" />
            <Editable tag="span" :obj="ingredient" name="name"
            :class="$style.name" style="--top-bottom: -2pt; --left-right: -4pt;" />
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