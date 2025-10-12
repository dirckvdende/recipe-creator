
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
        flex-wrap: wrap;
        user-select: none;
        font-size: .7em;
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        translate: -100% -5.5pt;
        padding-right: 1.5em;
        @media screen and (max-width: 800px) {
            left: auto;
            right: 0;
            translate: 2.5em -5.5pt;
            padding: 0;
        }

        li {
            padding: .1em 0;

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