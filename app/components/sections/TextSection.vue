
<script lang="ts" setup>
    import { type TextSection } from '~/recipe';
import Editable from '../Editable.vue';
    const { section } = defineProps<{
        section: TextSection,
    }>()
</script>

<template>
    <Editable tag="p" :obj="section" name="content" />
</template>

<style lang="scss" scoped>
    @use "~/assets/scss/common.scss";

    .section-container:not(:hover) textarea:not(:focus) {
        border-color: transparent;
    }

    textarea {
        @extend %editable-text;
        height: auto;
        min-height: 0;
        width: 100%;
        resize: none;
        overflow: hidden;
        field-sizing: content;
    }
</style>
