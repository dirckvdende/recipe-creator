
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

</style>