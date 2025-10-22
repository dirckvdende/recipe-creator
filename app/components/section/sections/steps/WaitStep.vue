
<script lang="ts" setup>
    import { type WaitRecipeStep } from '~/recipe';
    const { step } = defineProps<{
        step: WaitRecipeStep,
    }>()
</script>

<template>
    <div :class="$style['wait-step']">
        <div :class="$style.icon">
            <span class="material-symbols-outlined">timer</span>
        </div>
        <Editable tag="span" :class="$style['content']" :obj="step"
        name="content" />
    </div>
</template>

<style lang="scss" module>
    .wait-step {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        counter-increment: none;

        .icon {
            flex-shrink: 0;
            flex-grow: 0;
            margin-left: 2.5em;
            width: 2em;
            height: 2em;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1em;
            background-color: #eee;
            user-select: none;

            & > span {
                font-size: 1.3em;
                color: #555;
            }
        }

        .content {
            flex-shrink: 1;
            width: 100%;
            margin: 0;
            margin-left: 1em;
            color: #555;
        }
    }
</style>