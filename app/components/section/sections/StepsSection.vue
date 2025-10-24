
<script lang="ts" setup>
    import { type StepsSection, type RecipeStep } from '~/recipe';
    import Editable from '../../Editable.vue';
    import ButtonRow from '~/components/ButtonRow.vue';
    import NormalStep from './steps/NormalStep.vue';
    import WaitStep from './steps/WaitStep.vue';
    const { section } = defineProps<{
        section: StepsSection,
    }>()

    /**
     * Place a default normal step in the list of steps
     * @param before The step before which to place the new step
     */
    function addNormalStep(before?: RecipeStep) {
        const step: RecipeStep = {
            type: "normal",
            content: "Start typing here...",
        }
        const index = before == undefined ? -1 : section.steps.indexOf(before)
        if (index == -1)
            section.steps.push(step)
        else
            section.steps.splice(index, 0, step)
    }

    /**
     * Place a default wait step in the list of steps
     * @param before The step before which to place the new step
     */
    function addWaitStep(before?: RecipeStep) {
        const step: RecipeStep = {
            type: "wait",
            content: "Wait [x] min.",
        }
        const index = before == undefined ? -1 : section.steps.indexOf(before)
        if (index == -1)
            section.steps.push(step)
        else
            section.steps.splice(index, 0, step)
    }

    /**
     * Remove a step from the list of steps
     * @param step The step to remove
     */
    function deleteStep(step: RecipeStep) {
        section.steps = section.steps.filter((value) => value != step)
    }

    // List of buttons to display before and after each step
    const addButtons = (before?: RecipeStep) => [{
        icon: "add",
        action: () => addNormalStep(before),
    }, {
        icon: "timer",
        action: () => addWaitStep(before),
    }]
</script>

<template>
    <Editable tag="h2" :obj="section" name="title" class="section-title"
    replace-empty="Section title" />
    <ol :class="$style.steps">
        <template v-for="(step, index) in section.steps">
            <!-- Row of buttons to add new steps -->
            <ButtonRow
                :class="$style['step-buttons']"
                :buttons="addButtons(step)"
                :notab="true" />
            <li :class='$style.step'>
                <NormalStep :step="step" v-if="step.type == 'normal'" />
                <WaitStep :step="step" v-if="step.type == 'wait'" />
                <!-- Delete button -->
                <ButtonRow :class="$style['delete-button']" :buttons='[{
                    icon: "delete",
                    action: () => deleteStep(step),
                }]' :notab="true" :style='{
                    "top": step.type == "normal" ? "2.3em" : "0",
                }' />
            </li>
            <!-- Display final row of  action buttons to add to the end -->
            <ButtonRow
                :class="$style['step-buttons']"
                :buttons="addButtons()"
                :notab="true"
                v-if="index == section.steps.length - 1" />
        </template>
    </ol>
</template>

<style lang="scss" module>
    .steps {
        padding: 0;
        list-style: none;
        counter-reset: item;
        margin: 0;
        position: relative;

        .step {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin: .5em 0;
            counter-increment: none;
            position: relative;
            align-items: flex-start;
            break-inside: avoid;

            .delete-button {
                position: absolute;
                left: -.5em;
                margin: 0;
                width: auto;
                z-index: 2;
            }
        }
        
    }
    
    .step-buttons {
        width: fit-content;
        box-sizing: border-box;
        left: 50%;
        justify-content: left;
        position: relative;
        margin: -.8em 0;
        z-index: 2;
        translate: -50% 0em;
    }
</style>
