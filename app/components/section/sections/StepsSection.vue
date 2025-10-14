
<script lang="ts" setup>
    import { type StepsSection, type RecipeStep } from '~/recipe';
    import Editable from '../../Editable.vue';
    import ButtonRow from '~/components/ButtonRow.vue';
    const { section } = defineProps<{
        section: StepsSection,
    }>()

    function addNormalStep(before?: RecipeStep) {
        const step: RecipeStep = {
            type: "normal",
            content: "Type step text here...",
        }
        const index = before == undefined ? -1 : section.steps.indexOf(before)
        if (index == -1)
            section.steps.push(step)
        else
            section.steps.splice(index, 0, step)
    }

    function addWaitStep(before?: RecipeStep) {
        // TODO
    }

    function deleteStep(step: RecipeStep) {
        section.steps = section.steps.filter((value) => value != step)
    }
</script>

<template>
    <Editable tag="h2" :obj="section" name="title" class="section-title"
    replace-empty="Section title" />
    <ol :class="$style.steps">
        <template v-for="step in section.steps">
            <li :class="$style.step" v-if="step.type == 'normal'">
                <span :class="$style.number"><span></span></span>
                <Editable tag="span" :class="$style['step-content']" :obj="step"
                name="content" />
                <ButtonRow :class="$style['step-buttons']" :buttons='[{
                    icon: "add",
                    text: "Add step",
                    action: () => addNormalStep(step),
                }, {
                    icon: "timer",
                    text: "Add waiting time",
                    action: () => addWaitStep(step),
                }, {
                    icon: "delete",
                    action: () => deleteStep(step),
                }]' :notab="true" />
            </li>
        </template>
    </ol>
    <ButtonRow :class="$style['bottom-buttons']" :buttons='[{
        icon: "add",
        text: "Add step",
        action: addNormalStep,
    }, {
        icon: "timer",
        text: "Add waiting time",
        action: addWaitStep,
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

            .step-buttons {
                position: absolute;
                right: 0;
                top: -2em;
                width: auto;
                margin: 0;
                z-index: 2;

                li {
                    padding: 0;
                }
            }

            .step-buttons:not(.step:hover .step-buttons):not(.step-content:focus +
            .step-buttons) {
                opacity: 0;
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
