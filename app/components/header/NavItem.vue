
<script lang="ts" setup>
const { onClick, icon } = defineProps<{
    onClick?: () => void,
    icon?: string,
}>()
</script>

<template>
    <li>
        <button @click="onClick?.()">
            <span class="icon material-symbols-outlined">{{ icon ?? "menu" }}</span>
            <span class="text"><slot /></span>
        </button>
    </li>
</template>

<style lang="scss" scoped>
li {
    height: 100%;

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
            margin-right: .5em;
            font-size: 1.7em;
        }

        .text {
            font-size: 1.2em;
        }

        &:hover .text {
            text-decoration: underline;
        }
    }
}
</style>