
<script lang="ts" setup>
    const { buttons } = defineProps<{
        buttons: {
            action?: () => void,
            icon: string,
        }[],
    }>()
</script>

<template>
    <ul :class="$style['container']">
        <li v-for="button in buttons"><button @click="button.action">
            <span :class="$style.icon" class="material-symbols-outlined">
            {{ button.icon }}</span>
        </button></li>
    </ul>
</template>

<style lang="scss" module>
    .container {
        display: none;
        @media screen { display: flex; }
        list-style: none;
        padding: 0;
        margin: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        user-select: none;
        font-size: .7em;
        z-index: 2;
        position: absolute;
        top: 0;
        left: -6.5em;
        min-height: 100%;
        padding-right: 1.5em;
        @media screen and (max-width: 800px) {
            left: auto;
            right: -2.5em;
            padding: 0;
        }

        li {
            padding: 0 0 0 1.5em; 

            button {
                border: none;
                border-radius: 10em;
                width: 3.5em;
                height: 3.5em;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                font-family: inherit;
                cursor: pointer;
                background-color: #eee;
                border: 2pt solid white;
                font-size: 1em;

                .icon {
                    font-size: 1.7em;
                }

                &:hover {
                    background-color: #ccc;
                }
            }
        }
    }
</style>