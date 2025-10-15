
<script lang="ts" setup>
    import { type StyleValue } from 'vue';
    import { type TagsSection } from '~/recipe';
    const { section } = defineProps<{
        section: TagsSection,
    }>()

    /**
     * Definition of a macro that can be used to display special tags
     */
    type Macro = {
        macro: string,
        icon: string,
        iconStyle?: StyleValue,
        suffix?: string,
    }

    // Macros used, in the order they should be displayed in the tags list. If
    // any tags are made without a macro they're displayed after the macros
    const macros: Macro[] = [{
        macro: "time",
        icon: "timer",
        suffix: " min.",
    }, {
        macro: "kcal",
        icon: "mode_heat",
        suffix: " kcal",
    }, {
        macro: "portions",
        icon: "person",
    }, {
        macro: "vegan",
        icon: "eco",
        iconStyle: { fontVariationSettings: "'FILL' 1" },
    }, {
        macro: "vegetarian",
        icon: "eco",
        iconStyle: { fontVariationSettings: "'FILL' 0" },
    }]

    /**
     * Re-order tags such that it first displays macros (in the correct order)
     * and then other tags. This function is should be called when duplicate
     * macros are already removed
     */
    function reorderTags() {
        const tags: (string | null)[] = []
        for (const _macro of macros)
            tags.push(null)
        for (const tag of section.tags) {
            const [index, macro] = getMacro(tag)
            if (macro == null) {
                tags.push(tag)
                continue
            }
            if (tags[index] != null)
                throw new Error(`Unexpected double macro ` +
                `${macro.macro}`)
            tags[index] = tag
        }
        section.tags = tags.filter((value) => value != null)
    }

    /**
     * Get a macro from a tag (if it uses one)
     * @param tag The tag to get the macro of
     * @return An array [index, macro] if the macro was found, and [-1, null]
     * if the tag doesn't use a macro
     */
    function getMacro(tag: string): [number, Macro | null] {
        for (const [index, macro] of macros.entries())
            if (tag.startsWith(`${macro.macro}:`))
                return [index, macro]
        return [-1, null]
    }

    /**
     * Remove any tag present that is the same or uses the same macro
     */
    function removeDuplicate(tag: string) {
        section.tags = section.tags.filter((value) => value != tag &&
        (getMacro(value)[0] != getMacro(tag)[0] || getMacro(value)[1] == null))
    }

    /**
     * Add a tag. If the exact tag is already present the list of tags remains
     * unchanged. If the same macro is already used it is replaced with the new
     * value
     * @param tag The tag to add
     */
    function addTag(tag: string) {
        if (section.tags.indexOf(tag) != -1)
            return
        removeDuplicate(tag)
        section.tags.push(tag)
        reorderTags()
    }

    // Input field to add new tags
    const addText = useTemplateRef("add-text")

    /**
     * Add a tag using the submit event from the input form
     * @param event The submit event
     */
    function addTagFromField(event: SubmitEvent) {
        event.preventDefault()
        if (addText.value == null)
            return
        const name = addText.value.value
        addText.value.value = ""
        if (name.trim() == "")
            return
        addTag(name)
    }

    /**
     * Object that contains information about how to render a tag
     */
    type TagRenderOptions = {
        tag: string,
        content: string,
        icon?: string,
        iconStyle?: StyleValue,
    }

    /**
     * Convert a tag with possibly macros to render options on how to display
     * the tag
     * @param tag The raw tag to process
     */
    function renderOptions(tag: string): TagRenderOptions {
        const [_index, macro] = getMacro(tag)
        if (macro == null)
            return { tag, content: tag }
        const suffix = macro.suffix ?? ""
        const content = tag.substring(macro.macro.length + 1) + suffix
        const { icon, iconStyle } = macro
        return {  tag, content, icon, iconStyle }
    }
</script>

<template>
    <ul :class="$style.container">
        <li :class="$style.tag" v-for="tag in section.tags.map(renderOptions)">
            <template v-if="tag.icon != undefined">
                <span :class="$style.icon" class="material-symbols-outlined"
                :style="tag.iconStyle">{{ tag.icon }}</span>
            </template>
            <span :class="$style.text">{{ tag.content }}</span>
            <button :class="$style['close-button']" @click="() =>
            removeDuplicate(tag.tag)"><span class="material-symbols-outlined">
            close</span></button>
        </li>
        <form @submit="addTagFromField">
            <input type="text" id="add-text" ref="add-text" />
        </form>
    </ul>
    <p :class="$style['macro-text']">
        Macros are available by adding a tag in the form [macro name]:[value].
        The following macros can be used: time:[minutes], kcal:[amount],
        portions:[amount], vegan:[text], vegetarian:[text].
    </p>
</template>

<style lang="scss" module>
    .container {
        list-style: none;
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        margin: .5em 0;
        justify-content: center;
        break-inside: avoid;

        .tag {
            margin: 0 3pt 5pt 0;
            display: block;
            background-color: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2em;
            border-radius: 1em;
            padding: 0 1.2em;
            position: relative;
            overflow: hidden;
            user-select: none;

            .icon {
                font-size: 1.2em;
                margin-right: .2em;
            }

            .text {
                color: #333;
                font-weight: 500;
            }

            .close-button {
                position: absolute;
                right: 0em;
                font-size: 1em;
                border: none;
                height: 100%;
                justify-content: center;
                align-items: center;
                background-color: #eee;
                color: #333;
                display: none;
                cursor: pointer;
                padding: 0 .4em 0 .3em;

                &:hover {
                    background-color: color-mix(in srgb, #eee, black 10%);
                }

                & > span {
                    font-size: 1em;
                }
            }

            &:hover .close-button {
                display: flex;
            }
        }

        input[type=text] {
            display: none;
            @media screen { display: block; }
            flex-grow: 0;
            flex-shrink: 1;
            border: 1.5pt dashed #ddd;
            border-radius: 2em;
            font-size: 1em;
            outline: none;
            font-family: inherit;
            padding: 0 1em;
            height: 2em;
            width: 10em;
            box-sizing: border-box;

            &:hover {
                border-color: #aaa;
            }

            &:focus {
                border-style: solid;
                border-color: #aaa;
            }
        }
    }

    .macro-text {
        color: #888;
        font-size: .7em;
        font-style: italic;
        display: none;
        line-height: 1.3;
        @media screen { display: block; }
    }
</style>
