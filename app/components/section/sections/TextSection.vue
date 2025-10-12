
<script lang="ts" setup>
    import { type TextSection } from '~/recipe';
import Editable from '../../Editable.vue';
    const { section } = defineProps<{
        section: TextSection,
    }>()
</script>

<template>
    <Editable tag="p" :obj="section" name="content" />
</template>

<style lang="scss" scoped>
    @use "~/assets/scss/common.scss";
</style>
