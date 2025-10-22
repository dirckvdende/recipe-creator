
<script lang="ts" setup>
    import { type NormalRecipeStep } from '~/recipe';
    const { step } = defineProps<{
        step: NormalRecipeStep,
    }>()
</script>

<template>
    <div :class="$style['normal-step']">
        <span :class="$style.number"><span></span></span>
        <Editable tag="span" :class="$style['content']" :obj="step"
        name="content" />
    </div>
</template>

<style lang="scss" module>
    $step-border: #333;
    $step-background: #333;
    $step-color: #eee;

    .normal-step {
        width: 100%;
        display: flex;
        flex-direction: row;
        counter-increment: item;
        position: relative;
        align-items: flex-start;

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

        .content {
            display: block;
            flex-shrink: 1;
            width: 100%;
            margin: 0;
            margin-top: .4em;
        }
    }
</style>