
<script lang="ts" setup>
    const { tag, obj, name, replaceEmpty } = defineProps<{
        // Tag name of the component
        tag: keyof HTMLElementTagNameMap,
        // Parent object to track
        obj: {[key: string]: any},
        // Name of the property in the object
        name: string,
        // Replace any empty value on blur with the given value. Value only
        // consisting of whitespace are also replaced
        replaceEmpty?: string,
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
    function handleBlur() {
        replaceEmptyContent()
        setActiveSectionValue(false)
    }
    function handleFocus() {
        setActiveSectionValue(true)
    }
    const activeSection = inject<Ref<boolean>>("activeSection")
    function setActiveSectionValue(value: boolean) {
        if (activeSection == undefined)
            return
        activeSection.value = value
    }
    function replaceEmptyContent() {
        if (replaceEmpty == undefined || contentRef.value == null)
            return
        if (contentRef.value.innerText.trim() == "")
            obj[name] = replaceEmpty
    }
</script>

<template>
    <component :is="tag" ref="editable-element" @input="updateFromElement"
    contenteditable="plaintext-only" @blur="handleBlur" @focus="handleFocus"
    :class="$style.element" />
</template>

<style lang="scss" module>
    .element {
        position: relative;
        outline: none;
    }
    :global(.section:hover) .element::before,
    :global(.active-section) .element::before,
    .element:not(:global(.section) .element)::before {
        content: "";
        position: absolute;
        left: -8pt;
        right: -8pt;
        top: -4pt;
        bottom: -4pt;
        @media screen { border: 1.5pt dashed #ddd; }
        pointer-events: none;
        border-radius: 3pt;
    }
    .element:hover::before {
        border: 1.5pt dashed #aaa !important;
    }
    .element:focus::before {
        border: 1.5pt solid #aaa !important;
    }
</style>