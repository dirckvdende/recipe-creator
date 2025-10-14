
<script lang="ts" setup>
    import { type TagsSection } from '~/recipe';
    const { section } = defineProps<{
        section: TagsSection,
    }>()

    function removeTag(name: string) {
        section.tags = section.tags.filter((value) => value != name)
    }

    function addTag(name: string) {
        if (section.tags.indexOf(name) != -1)
            return
        section.tags.push(name)
    }

    const addText = useTemplateRef("add-text")
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
</script>

<template>
    <ul :class="$style.container">
        <li :class="$style.tag" v-for="tag in section.tags">
            <span :class="$style.text" replace-empty="click to edit">{{ tag }}
            </span>
            <button :class="$style['close-button']" @click="() =>
            removeTag(tag)"><span class="material-symbols-outlined">close</span>
            </button>
        </li>
        <form @submit="addTagFromField">
            <input type="text" id="add-text" ref="add-text" />
        </form>
    </ul>
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

        .tag {
            margin: 0 3pt 3pt 0;
            display: block;
            background-color: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2em;
            border-radius: 1em;
            padding: 0 1.4em;
            position: relative;
            overflow: hidden;
            user-select: none;

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
</style>
