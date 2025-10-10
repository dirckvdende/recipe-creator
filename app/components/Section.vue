
<script lang="ts" setup>
    import { recipe, type RecipeSection } from '~/recipe';
    import TextSection from './sections/TextSection.vue';
    import IngredientsSection from './sections/IngredientsSection.vue';
    const { section } = defineProps<{
        section: RecipeSection,
    }>();

    function addTextSection() {
        recipe.sections.splice(recipe.sections.indexOf(section) + 1, 0, {
            type: "text",
            title: "Description",
            content: "A great recipe!",
        })
    }
</script>

<template>
    <div class="section-container">
        <input class="section-title" type="text" v-model="section.title" />
        <TextSection :section="section" v-if="section.type == 'text'" />
        <IngredientsSection :section="section" v-if="section.type ==
        'ingredients'" />
        <ul class="bottom-buttons">
            <li><button @click="addTextSection">
                <span class="icon material-symbols-outlined">text_fields</span>
                <span class="text">Add text</span>
            </button></li>
            <li><button>
                <span class="icon material-symbols-outlined">grocery</span>
                <span class="text">Add ingredients</span>
            </button></li>
            <li><button>
                <span class="icon material-symbols-outlined">format_list_numbered</span>
                <span class="text">Add steps</span>
            </button></li>
            <li><button>
                <span class="icon material-symbols-outlined">image</span>
                <span class="text">Add image</span>
            </button></li>
            <li><button>
                <span class="icon material-symbols-outlined">keyboard_arrow_up
                </span>
            </button></li>
            <li><button>
                <span class="icon material-symbols-outlined">keyboard_arrow_down
                </span>
            </button></li>
            <li><button>
                <span class="icon material-symbols-outlined">delete</span>
            </button></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    @use "~/assets/scss/common.scss";

    .section-container:not(:hover) .section-title:not(:focus) {
        border-color: transparent;
    }

    .section-container {
        position: relative;
        
        .section-title {
            @extend %editable-text;
            margin: .2em 0;
            font-size: 1.4em;
            width: 100%;
            display: block;
            width: 100%;
        }

        &:hover .bottom-buttons {
            @media screen { display: flex; }
        }

        .bottom-buttons {
            display: none;
            list-style: none;
            padding: 0;
            margin: 0;
            position: absolute;
            bottom: 0;
            left: 50%;
            translate: -50% calc(100% - .8em);
            flex-direction: row;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            user-select: none;
            pointer-events: none;
            font-size: .7em;
            z-index: 2;

            li {
                padding: .1em 0;
                pointer-events: all;

                button {
                    border: none;
                    border-radius: 10em;
                    padding: .3em 1em;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    font-family: inherit;
                    cursor: pointer;
                    background-color: #eee;
                    border: 2pt solid white;
                    font-size: 1em;

                    .icon {
                        font-size: 1.5em;
                    }

                    .icon + .text {
                        margin-left: .4em;
                    }

                    &:hover {
                        background-color: #ccc;
                    }
                }
            }
        }
    }
</style>
