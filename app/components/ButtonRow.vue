
<script lang="ts" setup>
    const { buttons } = defineProps<{
        buttons: {
            action?: () => void,
            icon: string,
            text?: string,
        }[],
    }>()
</script>

<template>
    <ul :class="$style['button-row']">
        <li v-for="button in buttons"><button @click="button.action">
            <span :class="$style.icon" class="material-symbols-outlined">
            {{ button.icon }}</span>
            <span :class="$style.text" v-if="button.text != undefined">
            {{ button.text }}</span>
        </button></li>
    </ul>
</template>

<style lang="scss" module>
    .button-row {
        display: none;
        @media screen { display: flex; }
        list-style: none;
        padding: 0;
        margin: 1em 0;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
        user-select: none;
        font-size: .75em;

        li {
            padding: .1em 0;

            button {
                border: none;
                border-radius: 10em;
                padding: .3em 1em;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-family: inherit;
                cursor: pointer;
                background-color: #eee;
                border: 2pt solid white;
                font-size: 1em;

                .icon {
                    font-size: 1.5em;
                }

                .icon + .text {
                    margin-left: .4em;
                }

                &:hover {
                    background-color: #ccc;
                }
            }
        }
    }
</style>