
<script lang="ts" setup>
    import { type ImageSection } from '~/recipe';
    const { section } = defineProps<{
        section: ImageSection,
    }>()
</script>

<template>
    <img :src="section.url" :class="$style.image" />
</template>

<style lang="scss" module>
    .image {
        width: 100%;
        height: 6cm;
        object-fit: cover;
        border-radius: 6pt;
        margin: .5em 0;
    }
</style>