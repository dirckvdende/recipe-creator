
<script lang="ts" setup>
    import { type TextSection } from '~/recipe';
    const { section } = defineProps<{
        section: TextSection,
    }>()
    const textAreaRef = useTemplateRef("textarea")
    function autoExtendTextArea() {
        let textArea = textAreaRef.value
        if (textArea == null)
            return
        textArea.style.height = "0"
        textArea.style.height = `calc(${textArea.scrollHeight}px + .4em)`
        console.log("extended")
    }
    // TODO: Improve this to proper size
    onMounted(() => setTimeout(autoExtendTextArea, 1))
</script>

<template>
    <textarea rows="1" v-model="section.content" @input="autoExtendTextArea"
    ref="textarea" @change="autoExtendTextArea" />
</template>

<style lang="scss" scoped>
    @use "~/assets/scss/common.scss";
    textarea {
        @extend %editable-text;
        height: auto;
        min-height: 0;
        width: 100%;
        resize: none;
        overflow: hidden;
    }
</style>
