
<script lang="ts" setup>
    const { tag, obj, name } = defineProps<{
        tag: keyof HTMLElementTagNameMap,
        obj: {[key: string]: any},
        name: string,
    }>()
    onMounted(updateToElement)
    watch(() => obj[name], updateToElement)
    const contentRef = useTemplateRef<HTMLElement>("editable-element")
    function updateFromElement() {
        if (contentRef.value == null)
            return
        obj[name] = contentRef.value.innerText
    }
    function updateToElement() {
        if (contentRef.value == null)
            return
        if (contentRef.value.innerText == obj[name] || obj[name] == undefined)
            return
        contentRef.value.innerText = String(obj[name])
    }
</script>

<template>
    <component :is="tag" ref="editable-element" @input="updateFromElement"
    contenteditable />
</template>