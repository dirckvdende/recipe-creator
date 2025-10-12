
<script lang="ts" setup>
    import { type TextSection } from '~/recipe';
    import Editable from '../../Editable.vue';
    const { section } = defineProps<{
        section: TextSection,
    }>()
</script>

<template>
    <Editable tag="h2" :obj="section" name="title" class="section-title"
    replace-empty="Section title" />
    <Editable tag="p" :obj="section" name="content"
    replace-empty="Start writing here..." />
</template>

<style lang="scss">
</style>
