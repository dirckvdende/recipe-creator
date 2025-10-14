
<script lang="ts" setup>
    import { type StepsSection, type RecipeStep } from '~/recipe';
    import Editable from '../../Editable.vue';
    import ButtonRow from '~/components/ButtonRow.vue';
    const { section } = defineProps<{
        section: StepsSection,
    }>()

    function addStep() {
        section.steps.push({
            type: "normal",
            content: "Type step text here...",
        })
    }
</script>

<template>
    <Editable tag="h2" :obj="section" name="title" class="section-title"
    replace-empty="Section title" />
    <ol :class="$style.steps">
        <li :class="$style.step" v-for="step in section.steps">
            <span :class="$style.number"><span></span></span>
            <Editable tag="span" :class="$style['step-content']" :obj="step"
            name="content" />
        </li>
    </ol>
    <ButtonRow :class="$style['bottom-buttons']" :buttons='[{
        icon: "add",
        text: "Add step",
        action: addStep,
    }, {
        icon: "timer",
        text: "Add waiting time",
    }]' />
</template>

<style lang="scss" module>
    $step-border: #333;
    $step-background: #333;
    $step-color: #eee;
    .steps {
        padding: 0;
        list-style: none;
        counter-reset: item;
        margin-bottom: 0;
        position: relative;

        .step {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: 1em;
            counter-increment: item;
            position: relative;
            align-items: flex-start;
            break-inside: avoid;
            
            .number {
                flex-shrink: 0;
                flex-grow: 0;
                width: 2em;
                height: 2em;
                border-radius: 50%;
                box-sizing: border-box;
                border: .12em solid $step-border;
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
                margin-right: 1.1em;
                background-color: $step-background;

                & > span {
                    font-size: 1.2em;
                    color: $step-color;

                    &::before { content: counter(item, decimal); }
                }
            }

            .step-content {
                display: block;
                flex-shrink: 1;
                width: 100%;
                margin: 0;
                margin-top: .4em;
            }
        }
    }

    .bottom-buttons:not(:global(.active-section) .bottom-buttons):not(
    :global(.section:hover) .bottom-buttons) {
        opacity: 0;
    }

    .bottom-buttons {
        margin-top: 0;
    }
</style>
