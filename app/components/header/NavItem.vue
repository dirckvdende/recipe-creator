
<script lang="ts" setup>
    const { onClick, icon } = defineProps<{
        onClick?: () => void,
        icon?: string,
    }>()
</script>

<template>
    <li :class="$style.item">
        <button @click="onClick?.()">
            <span :class="$style.icon" class="material-symbols-outlined">{{ icon ?? "menu" }}</span>
            <span :class="$style.text"><slot /></span>
        </button>
    </li>
</template>

<style lang="scss" module>
    @use "~/assets/scss/constants";
    .item {
        height: 100%;

        @media screen and (max-width: constants.$mobile-width) {
            height: 2em;
            button { border-radius: 3pt; }
        }

        button {
            height: 100%;
            border: none;
            padding: 0 1.5em;
            margin: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
            background-color: transparent;
            font-family: inherit;

            .icon {
                font-size: 1.7em;
                @media screen and (max-width: 800px) { font-size: 2em; }
            }
            
            .text {
                font-size: 1.2em;
                margin-left: .5em;
                @media screen and (max-width: 800px) { display: none; }
            }

            &:hover .text {
                text-decoration: underline;
            }

            @media screen and (max-width: 800px) {
                &:hover {
                    background-color: #8882;
                }
            }
        }
    }
</style>