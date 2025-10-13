
<script lang="ts" setup>
    let { tag, obj, name, replaceEmpty } = defineProps<{
        // Tag name of the component
        tag: keyof HTMLElementTagNameMap,
        // Parent object to track
        obj?: {[key: string]: any},
        // Name of the property in the object
        name?: string,
        // Replace any empty value on blur with the given value. Value only
        // consisting of whitespace are also replaced
        replaceEmpty?: string,
    }>()
    onMounted(updateToElement)
    if (obj != undefined && name != undefined)
        watch(() => obj[name], updateToElement)
    const contentRef = useTemplateRef<HTMLElement>("editable-element")
    function updateFromElement() {
        if (contentRef.value == null || obj == undefined || name == undefined)
            return
        obj[name] = contentRef.value.innerText
    }
    function updateToElement() {
        if (contentRef.value == null || obj == undefined || name == undefined)
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
        setActiveSectionValue(true);
        if (contentRef.value == null)
            return
        const range = document.createRange()
        range.selectNodeContents(contentRef.value)
        range.collapse(false)
        const selection = getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
    }
    const activeSection = inject<Ref<boolean> | null>("activeSection", null)
    function setActiveSectionValue(value: boolean) {
        if (activeSection == null)
            return
        activeSection.value = value
    }
    function replaceEmptyContent() {
        if (replaceEmpty == undefined || contentRef.value == null ||
        obj == undefined || name == undefined)
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
        --left-right: -8pt;
        --top-bottom: -4pt;
    }
    .element::before {
        content: "";
        position: absolute;
        left: var(--left-right);
        right: var(--left-right);
        top: var(--top-bottom);
        bottom: var(--top-bottom);
        pointer-events: none;
        border-radius: 3pt;
    }
    :global(.section:hover) .element::before,
    :global(.active-section) .element::before {
        @media screen { border: 1.5pt dashed #ddd; }
    }
    .element:hover::before {
        border: 1.5pt dashed #aaa !important;
    }
    .element:focus::before {
        border: 1.5pt solid #aaa !important;
    }
</style>