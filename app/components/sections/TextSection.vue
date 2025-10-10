
<script lang="ts" setup>
    import { type TextSection } from '~/recipe';
    const { section } = defineProps<{
        section: TextSection,
    }>()
    const textAreaRef = useTemplateRef("textarea")
    // This code is only here because firefox and safari don't support the CSS
    // property field-sizing yet :(
    function autoExtendTextArea() {
        let textArea = textAreaRef.value
        if (textArea == null)
            return
        textArea.style.height = "0"
        textArea.style.height = `calc(${textArea.scrollHeight}px + 3pt)`
        console.log("extended")
    }
    onMounted(() => setTimeout(autoExtendTextArea, 100))
    onUpdated(autoExtendTextArea)
</script>

<template>
    <textarea rows="1" v-model="section.content" @input="autoExtendTextArea"
    ref="textarea" />
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
